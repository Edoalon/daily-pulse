import { useEffect, useCallback } from "react";
import { X, ExternalLink, ShieldCheck, Zap } from "lucide-react";
import { calculateReadTime } from "../../utils/readTime";
import { QUALITY_SCORE_MAX } from "../../constants/app";
import type { DigestItem } from "../../types/digest";

interface ArticleDrawerProps {
  article: DigestItem | null;
  onClose: () => void;
}

/**
 * Sliding side panel showing full article details.
 * Slides in from the right with a semi-transparent overlay.
 * Closes on overlay click, × button, or Escape key.
 */
export function ArticleDrawer({ article, onClose }: ArticleDrawerProps) {
  const isOpen = article !== null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  const readTime = article
    ? calculateReadTime(article.summary, article.keyTakeaways)
    : 0;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={article?.title ?? "Article details"}
        className={`fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-out sm:w-[480px] md:w-[540px] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {article && (
          <>
            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto px-8 pb-28 pt-8">
              {/* Header row: source badge + close */}
              <div className="mb-6 flex items-start justify-between">
                <span className="inline-block rounded-sm bg-indigo-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  {article.sourceName}
                </span>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                  aria-label="Close drawer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Title */}
              <h2 className="mb-4 font-serif text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
                {article.title}
              </h2>

              {/* Meta row */}
              <div className="mb-8 flex items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-indigo-500" />
                  Quality Score:{" "}
                  <span className="font-semibold text-gray-700">
                    {article.qualityScore.toFixed(1)}/{QUALITY_SCORE_MAX}
                  </span>
                </span>
                <span className="text-gray-300">|</span>
                <span>
                  Read time:{" "}
                  <span className="font-semibold text-gray-700">
                    {readTime} min
                  </span>
                </span>
              </div>

              {/* Executive summary */}
              <div className="mb-8">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                  Executive Summary
                </h3>
                <p className="leading-relaxed text-gray-700">
                  {article.summary}
                </p>
              </div>

              {/* Key takeaways */}
              {article.keyTakeaways.length > 0 && (
                <div className="rounded-xl bg-indigo-50 p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-indigo-600" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                      Key Takeaways
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {article.keyTakeaways.map((takeaway, index) => (
                      <li
                        key={index}
                        className="flex gap-2 text-sm leading-relaxed text-gray-700"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400" />
                        {takeaway}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sticky CTA button */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white p-6">
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-black"
              >
                Read Original Article
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
