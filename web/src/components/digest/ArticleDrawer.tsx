import { useEffect, useCallback } from "react";
import { X, ExternalLink, ShieldCheck, Zap } from "lucide-react";
import { calculateReadTime } from "../../utils/readTime";
import { QUALITY_SCORE_MAX } from "../../constants/app";
import { getFaviconUrl } from "../../constants/iconMap";
import { ArticleVisualHeader } from "./ArticleVisualHeader";
import type { DigestItem } from "../../types/digest";

interface ArticleDrawerProps {
  article: DigestItem | null;
  onClose: () => void;
}

/**
 * Sliding side panel showing full article details.
 * Features an Open Graph hero image, tailored brand artwork, metadata, executive summary,
 * key takeaways, and a direct source link.
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

  const faviconUrl = article ? getFaviconUrl(article.sourceUrl) : null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
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
        className={`fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-out sm:w-[500px] md:w-[580px] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {article && (
          <>
            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto pb-28">
              {/* Top Hero Banner / Image */}
              <div className="relative w-full">
                <ArticleVisualHeader item={article} heightClass="h-56" />

                {/* Close Button floating over hero */}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black/80 hover:scale-105"
                  aria-label="Close drawer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Main Content Body */}
              <div className="px-8 pt-6">
                {/* Source badge row */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {faviconUrl && (
                      <img
                        src={faviconUrl}
                        alt=""
                        className="h-4 w-4 rounded-sm"
                        loading="lazy"
                      />
                    )}
                    <span className="rounded bg-gray-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-800">
                      {article.sourceName}
                    </span>
                  </div>

                  <span className="rounded bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-700 ring-1 ring-inset ring-indigo-600/10">
                    {article.sourceType}
                  </span>
                </div>

                {/* Title */}
                <h2 className="mb-4 font-serif text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
                  {article.title}
                </h2>

                {/* Meta row */}
                <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-indigo-500" />
                    Quality Score:{" "}
                    <span className="font-semibold text-gray-800">
                      {article.qualityScore.toFixed(1)}/{QUALITY_SCORE_MAX}
                    </span>
                  </span>
                  <span className="text-gray-300">|</span>
                  <span>
                    Read time:{" "}
                    <span className="font-semibold text-gray-800">
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
                  <div className="mb-8 rounded-xl bg-indigo-50/70 p-6 border border-indigo-100/60">
                    <div className="mb-4 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-indigo-600" />
                      <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-900">
                        Key Takeaways
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {article.keyTakeaways.map((takeaway, index) => (
                        <li
                          key={index}
                          className="flex gap-2 text-sm leading-relaxed text-gray-700"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500" />
                          {takeaway}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags list */}
                {article.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-2.5 text-xs font-bold uppercase tracking-widest text-gray-400">
                      Topics & Categorization
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sticky CTA button */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white/95 p-6 backdrop-blur">
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-black hover:shadow-lg"
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
