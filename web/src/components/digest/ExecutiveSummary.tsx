interface ExecutiveSummaryProps {
  summary: string;
}

/**
 * Hero section displaying the day's executive summary.
 * Splits the first sentence as a bold headline, with the remainder as body text.
 * Matches the mockup's editorial typography with serif headings and indigo accent.
 */
export function ExecutiveSummary({ summary }: ExecutiveSummaryProps) {
  const { headline, body } = splitSummary(summary);

  return (
    <section className="border-l-4 border-indigo-600 pl-6 md:pl-8">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-6 bg-indigo-600" />
        <span className="text-xs font-bold tracking-widest text-indigo-600">
          EXECUTIVE SUMMARY
        </span>
      </div>

      <h1 className="mb-5 max-w-2xl font-serif text-3xl font-black leading-tight text-gray-900 md:text-4xl lg:text-5xl">
        {headline}
      </h1>

      {body && (
        <p className="max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
          {body}
        </p>
      )}
    </section>
  );
}

/**
 * Splits the executive summary into a headline (first sentence)
 * and a body (remaining text). If there's only one sentence, the
 * body is empty and the full text becomes the headline.
 */
function splitSummary(text: string): { headline: string; body: string } {
  // Match the first sentence ending with ., !, or ?
  const match = text.match(/^(.+?[.!?])\s+(.+)$/s);

  if (match) {
    return { headline: match[1].trim(), body: match[2].trim() };
  }

  return { headline: text.trim(), body: "" };
}
