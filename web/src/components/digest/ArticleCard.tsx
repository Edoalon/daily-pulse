import { Star } from "lucide-react";
import { resolveIcon } from "../../constants/iconMap";
import type { DigestItem } from "../../types/digest";

interface ArticleCardProps {
  item: DigestItem;
  onClick: () => void;
}

/**
 * Individual news card in the digest grid.
 * Displays an icon header, source badge, quality score, title, summary, and tags.
 */
export function ArticleCard({ item, onClick }: ArticleCardProps) {
  const Icon = resolveIcon(item.tags, item.sourceType);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full cursor-pointer flex-col overflow-hidden rounded-lg border border-gray-200 bg-white text-left transition-all duration-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50"
    >
      {/* Icon header */}
      <div className="flex h-28 items-center justify-center bg-gray-50 transition-colors group-hover:bg-indigo-50/50">
        <Icon className="h-10 w-10 text-gray-400 transition-colors group-hover:text-indigo-400" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Source badge + quality score */}
        <div className="mb-3 flex items-center justify-between">
          <span className="inline-block max-w-[160px] truncate rounded-sm bg-gray-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            {item.sourceName}
          </span>
          <span className="flex items-center gap-1 text-sm font-semibold text-indigo-600">
            <Star className="h-3.5 w-3.5 fill-indigo-600" />
            {item.qualityScore.toFixed(1)}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 font-serif text-lg font-bold leading-snug text-gray-900">
          {item.title}
        </h3>

        {/* Summary */}
        <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-500">
          {item.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
