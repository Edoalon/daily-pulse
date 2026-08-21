import { useState } from "react";
import { resolveTheme } from "../../constants/iconMap";
import { resolveBrandVisual } from "../../constants/brandMap";
import type { DigestItem } from "../../types/digest";

interface ArticleVisualHeaderProps {
  item: DigestItem;
  heightClass?: string;
}

export function ArticleVisualHeader({
  item,
  heightClass = "h-44",
}: ArticleVisualHeaderProps) {
  const [imageError, setImageError] = useState(false);

  const hasLiveImage = Boolean(item.imageUrl && !imageError);
  // Strict brand lookup: only matches if the entity is explicitly in the title or source
  const brand = resolveBrandVisual(item.title, item.summary, item.tags, item.sourceName);
  // Domain/topic resolution: matches by technical domain keywords across title, tags, and sourceType
  const theme = resolveTheme(item.tags, item.sourceType, item.title);
  const Icon = theme.icon;

  // 1. Live Open Graph / Publisher Image
  if (hasLiveImage) {
    return (
      <div className={`relative ${heightClass} w-full overflow-hidden bg-gray-900`}>
        <img
          src={item.imageUrl}
          alt={item.title}
          onError={() => setImageError(true)}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-50" />

        {/* Tag pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-black/60 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur-md">
            <Icon className="h-3 w-3 text-indigo-300" />
            {theme.categoryName || item.tags[0] || item.sourceType}
          </span>
        </div>
      </div>
    );
  }

  // 2. Verified Corporate Brand Artwork (Strictly only when the title/source explicitly names the brand)
  if (brand) {
    return (
      <div
        className={`relative ${heightClass} w-full overflow-hidden bg-gradient-to-br ${brand.bgGradient} transition-all duration-300 group-hover:scale-[1.01]`}
      >
        {/* Ambient Glows & Grid Pattern */}
        <div
          className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-125"
          style={{ background: brand.glowColor }}
        />
        <div
          className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full blur-3xl"
          style={{ background: brand.glowColor }}
        />

        {/* Subtle Tech Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Centered Brand Emblem */}
        <div className="relative flex h-full flex-col items-center justify-center gap-2.5 px-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 p-3 shadow-lg ring-1 ring-white/20 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white/15">
            {brand.renderLogo("h-10 w-10 drop-shadow-md")}
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest ${brand.badgeBg} ring-1 ring-inset ring-white/10`}
            >
              {brand.name}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-white/60">
              • {theme.categoryName}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 3. Editorial Topic Domain & Publisher Header (Hardware/GPU, Research/AlphaXiv, Systems, LLMs, etc.)
  return (
    <div
      className={`relative ${heightClass} w-full overflow-hidden bg-gradient-to-br ${theme.gradient} transition-all duration-300 group-hover:scale-[1.01]`}
    >
      {/* Category ambient glow */}
      <div className="absolute -right-6 -top-6 h-36 w-36 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />
      <div className="absolute -bottom-6 -left-6 h-36 w-36 rounded-full bg-black/20 blur-2xl" />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Center content: Topic Icon + Publisher Badge */}
      <div className="relative flex h-full flex-col items-center justify-center gap-2.5 px-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 p-2.5 shadow-md ring-1 ring-white/20 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white/15">
          <Icon className={`h-7 w-7 ${theme.iconColor} drop-shadow`} />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white ring-1 ring-white/15">
            {theme.categoryName}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/60">
            • {item.sourceName}
          </span>
        </div>
      </div>
    </div>
  );
}
