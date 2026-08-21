import { DigestItem, DigestResponse, DiscoveredSource, ResearchCheckResult, ResearchDossier, TemporalContext } from './types';

export function isValidUrl(urlStr: string): boolean {
  if (!urlStr || typeof urlStr !== 'string') return false;
  if (/XXXXX|example\.com|placeholder|TODO|foo\.bar/i.test(urlStr)) return false;
  try {
    const parsed = new URL(urlStr);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function evaluateResearchSufficiency(
  dossier: ResearchDossier,
  temporal: TemporalContext
): ResearchCheckResult {
  const totalLength = dossier.findings.reduce((acc, f) => acc + f.length, 0);
  const sourceCount = dossier.sources.length;

  if (dossier.findings.length === 0 || totalLength < 200) {
    return {
      isSufficient: false,
      reason: 'Insufficient research text extracted.',
      suggestedQuery: `Search Google right now for top breaking tech & AI news from the last 24-48 hours relative to ${temporal.isoDate}. Focus on verified product launches and cite exact source URLs.`,
    };
  }

  if (sourceCount < 3) {
    return {
      isSufficient: false,
      reason: `Only ${sourceCount} verified source URLs discovered (minimum 3 required).`,
      suggestedQuery: `Search Google for official tech and AI announcements from today (${temporal.isoDate}) or yesterday. Retrieve direct blog/press release URLs.`,
    };
  }

  return {
    isSufficient: true,
    reason: `Sufficient coverage with ${sourceCount} verified source URLs across ${dossier.findings.length} domains.`,
  };
}

export function validateAndNormalizeDigest(
  data: any,
  temporal: TemporalContext,
  discoveredSources?: DiscoveredSource[]
): DigestResponse {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid agent output: Expected a JSON object.');
  }

  const executiveSummary =
    typeof data.executiveSummary === 'string' && data.executiveSummary.trim().length > 0
      ? data.executiveSummary.trim()
      : 'Daily intelligence digest covering key AI and technology breakthroughs.';

  const rawItems = Array.isArray(data.items) ? data.items : [];
  const validItems: DigestItem[] = [];

  for (let i = 0; i < rawItems.length; i++) {
    const item = rawItems[i];
    if (!item || typeof item !== 'object') continue;

    const title = typeof item.title === 'string' ? item.title.trim() : '';
    const summary = typeof item.summary === 'string' ? item.summary.trim() : '';
    let sourceUrl = typeof item.sourceUrl === 'string' ? item.sourceUrl.trim() : '';

    // If sourceUrl is invalid, attempt to match with a discovered source by title
    if (!isValidUrl(sourceUrl) && discoveredSources && discoveredSources.length > 0) {
      const match = discoveredSources.find(
        (s) => s.title.toLowerCase().includes(title.toLowerCase()) || title.toLowerCase().includes(s.title.toLowerCase())
      );
      if (match) {
        sourceUrl = match.url;
      }
    }

    if (!title || !summary || !isValidUrl(sourceUrl)) {
      console.warn(`[OmniDigest Validation] Skipping item ${i + 1} ("${title}") due to invalid or ungrounded URL: "${sourceUrl}"`);
      continue;
    }

    const keyTakeaways = Array.isArray(item.keyTakeaways)
      ? item.keyTakeaways.filter((t: any) => typeof t === 'string' && t.trim().length > 0)
      : [];

    const tags = Array.isArray(item.tags)
      ? item.tags.filter((t: any) => typeof t === 'string' && t.trim().length > 0)
      : ['AI', 'Tech'];

    const qualityScore =
      typeof item.qualityScore === 'number'
        ? Math.max(1, Math.min(10, Math.round(item.qualityScore)))
        : 7;

    validItems.push({
      id:
        typeof item.id === 'string' && item.id.trim()
          ? item.id.trim()
          : `ITEM_${temporal.isoDate.replace(/-/g, '')}_${(validItems.length + 1).toString().padStart(3, '0')}`,
      title,
      summary,
      keyTakeaways: keyTakeaways.length > 0 ? keyTakeaways : [summary],
      sourceUrl,
      sourceName: typeof item.sourceName === 'string' && item.sourceName.trim() ? item.sourceName.trim() : 'Web Source',
      sourceType: typeof item.sourceType === 'string' && item.sourceType.trim() ? item.sourceType.trim() : 'Article',
      qualityScore,
      tags,
      ...(typeof item.imageUrl === 'string' && isValidUrl(item.imageUrl) ? { imageUrl: item.imageUrl } : {}),
    });
  }

  return {
    date: temporal.isoDate,
    executiveSummary,
    items: validItems,
  };
}
