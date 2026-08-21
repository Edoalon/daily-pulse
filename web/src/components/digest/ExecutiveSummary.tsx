interface ExecutiveSummaryProps {
  summary: string;
}

/**
 * Hero section displaying the day's executive summary.
 * Uses refined editorial typography with balanced font sizing and max-width
 * so the headline and article cards are immediately visible without excessive vertical space.
 */
export function ExecutiveSummary({ summary }: ExecutiveSummaryProps) {
  const { headline, body } = splitSummary(summary);

  return (
    <section className="border-l-4 border-indigo-600 pl-5 md:pl-7">
      <div className="mb-2.5 flex items-center gap-2.5">
        <span className="h-px w-5 bg-indigo-600" />
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
          Executive Summary
        </span>
      </div>

      <h1 className="mb-3 max-w-4xl font-serif text-xl font-bold leading-snug tracking-tight text-gray-900 sm:text-2xl md:text-3xl">
        {headline}
      </h1>

      {body && (
        <p className="max-w-4xl text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg">
          {body}
        </p>
      )}
    </section>
  );
}

/**
 * Splits the executive summary into a concise headline and body text.
 * If the first sentence is long, it breaks cleanly at natural pauses so the headline
 * remains punchy and the rest flows seamlessly into the body paragraph.
 */
function splitSummary(text: string): { headline: string; body: string } {
  const trimmed = (text || "").trim();
  if (!trimmed) return { headline: "", body: "" };

  // Match the first sentence ending with ., !, or ?
  const sentenceMatch = trimmed.match(/^([^.!?]+[.!?])\s*(.*)$/s);

  if (!sentenceMatch) {
    // Single block with no terminal punctuation
    if (trimmed.length > 140) {
      const breakIdx = findNaturalBreak(trimmed, 110);
      if (breakIdx > 0) {
        return {
          headline: cleanHeadline(trimmed.slice(0, breakIdx)),
          body: cleanBody(trimmed.slice(breakIdx)),
        };
      }
    }
    return { headline: trimmed, body: "" };
  }

  const firstSentence = sentenceMatch[1].trim();
  const remainingText = sentenceMatch[2].trim();

  // If first sentence is reasonably sized (<= 140 chars), use as headline
  if (firstSentence.length <= 140) {
    return {
      headline: firstSentence,
      body: remainingText,
    };
  }

  // If first sentence has an explicit colon or dash clause
  const clauseMatch = firstSentence.match(/^([^:;—]+[:;—])\s*(.+)$/);
  if (clauseMatch && clauseMatch[1].trim().length >= 25 && clauseMatch[1].trim().length <= 130) {
    const headline = clauseMatch[1].trim();
    const restOfSentence = clauseMatch[2].trim();
    return {
      headline,
      body: remainingText ? `${restOfSentence} ${remainingText}` : restOfSentence,
    };
  }

  // For very long first sentences, break at a natural comma/phrase boundary near ~110 chars
  const breakIdx = findNaturalBreak(firstSentence, 110);
  if (breakIdx > 0) {
    const rawHeadline = firstSentence.slice(0, breakIdx);
    const rawRest = firstSentence.slice(breakIdx);
    const headline = cleanHeadline(rawHeadline);
    const restOfSentence = cleanBody(rawRest);

    return {
      headline,
      body: remainingText ? `${restOfSentence} ${remainingText}` : restOfSentence,
    };
  }

  return {
    headline: firstSentence,
    body: remainingText,
  };
}

function findNaturalBreak(text: string, targetLength: number): number {
  const windowStart = Math.max(30, targetLength - 40);
  const windowEnd = Math.min(text.length, targetLength + 40);
  const segment = text.slice(windowStart, windowEnd);

  // Prefer comma breaks
  const commaIndex = segment.lastIndexOf(",");
  if (commaIndex !== -1 && windowStart + commaIndex >= 30) {
    return windowStart + commaIndex + 1;
  }

  // Fallback to word break
  const spaceIndex = segment.lastIndexOf(" ");
  if (spaceIndex !== -1 && windowStart + spaceIndex >= 30) {
    return windowStart + spaceIndex;
  }

  return -1;
}

function cleanHeadline(text: string): string {
  let cleaned = text.trim().replace(/[,;:\s]+$/, "");
  if (!/[.!?]$/.test(cleaned)) {
    cleaned += ".";
  }
  return cleaned;
}

function cleanBody(text: string): string {
  let cleaned = text.trim().replace(/^[,;:\s]+/, "");
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }
  return cleaned;
}

