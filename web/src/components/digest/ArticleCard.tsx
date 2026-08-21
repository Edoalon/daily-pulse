import { useState } from "react";
import { Star } from "lucide-react";
import { getFaviconUrl } from "../../constants/iconMap";
import { ArticleVisualHeader } from "./ArticleVisualHeader";
import type { DigestItem } from "../../types/digest";

interface ArticleCardProps {
  item: DigestItem;
  onClick: () => void;
}

/**
 * Individual news card in the digest grid.
 * Displays tailored brand artwork, Open Graph cover images,
 * publisher favicon badge, quality score, title, summary, and tags.
 */
export function ArticleCard({ item, onClick }: ArticleCardProps) {
  const [faviconError, setFaviconError] = useState(false);
  const faviconUrl = getFaviconUrl(item.sourceUrl);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-xl hover:shadow-indigo-500/10"
    >
      {/* Visual Header: Open Graph image, Tailored Brand Artwork, or Editorial Publisher Header */}
      <ArticleVisualHeader item={item} heightClass="h-44" />

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Source badge + quality score */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            {faviconUrl && !faviconError ? (
              <img
                src={faviconUrl}
                alt=""
                onError={() => setFaviconError(true)}
                className="h-4 w-4 shrink-0 rounded-sm"
                loading="lazy"
              />
            ) : (
              <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
            )}
            <span className="truncate rounded bg-gray-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-gray-800">
              {item.sourceName}
            </span>
          </div>

          <span className="flex shrink-0 items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 ring-1 ring-inset ring-indigo-600/10">
            <Star className="h-3.5 w-3.5 fill-indigo-600 text-indigo-600" />
            {item.qualityScore.toFixed(1)}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 font-serif text-lg font-bold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-indigo-950">
          {item.title}
        </h3>

        {/* Summary */}
        <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-600">
          {item.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-gray-50 px-2 py-0.5 text-[11px] font-medium text-gray-500 ring-1 ring-inset ring-gray-200/60"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
