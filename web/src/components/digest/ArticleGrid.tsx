import { useMemo } from "react";
import { ArticleCard } from "./ArticleCard";
import type { DigestItem } from "../../types/digest";

interface ArticleGridProps {
  items: DigestItem[];
  onSelectArticle: (item: DigestItem) => void;
}

/**
 * Responsive grid of ArticleCards, sorted by qualityScore descending.
 * Adapts from 1 → 2 → 3 columns across breakpoints.
 */
export function ArticleGrid({ items, onSelectArticle }: ArticleGridProps) {
  const sortedItems = useMemo(
    () => [...items].sort((a, b) => b.qualityScore - a.qualityScore),
    [items]
  );

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sortedItems.map((item) => (
        <ArticleCard
          key={item.id}
          item={item}
          onClick={() => onSelectArticle(item)}
        />
      ))}
    </section>
  );
}
