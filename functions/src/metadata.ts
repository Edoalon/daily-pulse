import { DigestItem } from './types';

/**
 * Common regexes to match open graph and social card preview images in HTML head.
 */
const OG_IMAGE_PATTERNS = [
  /<meta\s+[^>]*property=["']og:image(?::secure_url)?["'][^>]*content=["']([^"']+)["']/i,
  /<meta\s+[^>]*content=["']([^"']+)["'][^>]*property=["']og:image(?::secure_url)?["']/i,
  /<meta\s+[^>]*name=["']twitter:image(?::src)?["'][^>]*content=["']([^"']+)["']/i,
  /<meta\s+[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image(?::src)?["']/i,
  /<meta\s+[^>]*property=["']twitter:image(?::src)?["'][^>]*content=["']([^"']+)["']/i,
  /<meta\s+[^>]*content=["']([^"']+)["'][^>]*property=["']twitter:image(?::src)?["']/i,
  /<link\s+[^>]*rel=["']image_src["'][^>]*href=["']([^"']+)["']/i,
];

/**
 * Decodes basic HTML entities commonly found in meta tags.
 */
function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/gi, '/');
}

/**
 * Extracts the Open Graph / Twitter image URL from a web page.
 *
 * @param pageUrl The target web page URL to inspect
 * @param timeoutMs Max time to wait for the HTTP response (default 4000ms)
 * @returns Fully qualified image URL string or undefined if not found/failed
 */
export async function extractOpenGraphImage(
  pageUrl: string,
  timeoutMs = 4000
): Promise<string | undefined> {
  if (!pageUrl || !pageUrl.startsWith('http')) {
    return undefined;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(pageUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      return undefined;
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html') && !contentType.includes('application/xhtml+xml')) {
      return undefined;
    }

    // Read only the first ~120KB of the HTML document (meta tags are almost always in <head>)
    const reader = response.body?.getReader();
    let html = '';
    const maxBytes = 120 * 1024;
    let receivedBytes = 0;

    if (reader) {
      const decoder = new TextDecoder('utf-8');
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          receivedBytes += value.byteLength;
          html += decoder.decode(value, { stream: true });
          if (html.includes('</head>') || receivedBytes >= maxBytes) {
            reader.cancel();
            break;
          }
        }
      }
    } else {
      html = await response.text();
    }

    for (const pattern of OG_IMAGE_PATTERNS) {
      const match = html.match(pattern);
      if (match && match[1]) {
        const rawUrl = decodeHtmlEntities(match[1].trim());
        if (rawUrl && !rawUrl.startsWith('data:')) {
          try {
            // Resolve relative URLs to absolute
            const absoluteUrl = new URL(rawUrl, pageUrl).href;
            if (absoluteUrl.startsWith('http://') || absoluteUrl.startsWith('https://')) {
              return absoluteUrl;
            }
          } catch {
            // Invalid URL format
          }
        }
      }
    }
  } catch (err) {
    // Network timeouts or aborted requests are expected for some anti-bot sites
    console.debug(`[OG Image Extractor] Could not extract image from ${pageUrl}:`, err);
  } finally {
    clearTimeout(timeoutId);
  }

  return undefined;
}

/**
 * Enriches an array of DigestItems with Open Graph images extracted concurrently.
 */
export async function enrichItemsWithImages(items: DigestItem[]): Promise<DigestItem[]> {
  console.log(`[OmniDigest Enrichment] Extracting open graph preview images for ${items.length} items...`);

  const results = await Promise.allSettled(
    items.map(async (item) => {
      if (item.imageUrl) {
        return item;
      }
      const imageUrl = await extractOpenGraphImage(item.sourceUrl);
      if (imageUrl) {
        return { ...item, imageUrl };
      }
      return item;
    })
  );

  const enrichedItems = results.map((res, index) => {
    if (res.status === 'fulfilled') {
      return res.value;
    }
    return items[index];
  });

  const imageCount = enrichedItems.filter((i) => !!i.imageUrl).length;
  console.log(`[OmniDigest Enrichment] Extracted preview images for ${imageCount}/${items.length} items.`);

  return enrichedItems;
}
