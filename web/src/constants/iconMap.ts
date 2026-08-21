import {
  Brain,
  Code,
  BookOpen,
  Cpu,
  Bot,
  Eye,
  Shield,
  Server,
  Newspaper,
  Rocket,
  Globe,
  Zap,
  Database,
  Terminal,
  Lock,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface CategoryTheme {
  categoryName: string;
  keywords: string[];
  icon: LucideIcon;
  gradient: string;
  iconColor: string;
  badgeBg: string;
  accentBorder: string;
}

/**
 * Rich theme mapping for article technical domains, tags, and source types.
 * Provides harmonious color palettes, gradient backdrops, and icons.
 */
export const THEME_ENTRIES: readonly CategoryTheme[] = [
  {
    categoryName: "Hardware & GPU",
    keywords: ["hardware", "gpu", "kernel", "cuda", "chip", "semiconductor", "quantum", "tpu", "accelerator", "compiler"],
    icon: Cpu,
    gradient: "from-emerald-600/20 via-teal-900/30 to-slate-950",
    iconColor: "text-emerald-400",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    accentBorder: "group-hover:border-emerald-400",
  },
  {
    categoryName: "Research & Papers",
    keywords: ["research", "paper", "arxiv", "alphaxiv", "benchmark", "evaluation", "study", "analysis", "preprint"],
    icon: BookOpen,
    gradient: "from-amber-600/20 via-orange-900/30 to-slate-950",
    iconColor: "text-amber-400",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
    accentBorder: "group-hover:border-amber-400",
  },
  {
    categoryName: "Foundation Models",
    keywords: ["llm", "llms", "foundation model", "language model", "gpt", "gemini", "claude", "genai", "prompt", "transformer"],
    icon: Brain,
    gradient: "from-indigo-600/20 via-purple-900/30 to-slate-950",
    iconColor: "text-indigo-400",
    badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    accentBorder: "group-hover:border-indigo-400",
  },
  {
    categoryName: "Autonomous Agents",
    keywords: ["agent", "agents", "multi-agent", "autonomous", "workflow", "reasoning", "tool use", "function calling"],
    icon: Sparkles,
    gradient: "from-violet-600/20 via-indigo-900/30 to-slate-950",
    iconColor: "text-violet-400",
    badgeBg: "bg-violet-50 text-violet-700 border-violet-200",
    accentBorder: "group-hover:border-violet-400",
  },
  {
    categoryName: "Open Source",
    keywords: ["open source", "open-source", "github", "sdk", "library", "framework", "repo"],
    icon: Code,
    gradient: "from-cyan-600/20 via-teal-900/30 to-slate-950",
    iconColor: "text-cyan-400",
    badgeBg: "bg-cyan-50 text-cyan-700 border-cyan-200",
    accentBorder: "group-hover:border-cyan-400",
  },
  {
    categoryName: "Robotics & Embodied AI",
    keywords: ["robotics", "robot", "humanoid", "drone", "transportation", "vla", "embodied"],
    icon: Bot,
    gradient: "from-teal-600/20 via-emerald-900/30 to-slate-950",
    iconColor: "text-teal-400",
    badgeBg: "bg-teal-50 text-teal-700 border-teal-200",
    accentBorder: "group-hover:border-teal-400",
  },
  {
    categoryName: "Vision & Multimodal",
    keywords: ["vision", "multimodal", "image", "video", "audio", "spatial", "ar/vr", "diffusion"],
    icon: Eye,
    gradient: "from-fuchsia-600/20 via-pink-900/30 to-slate-950",
    iconColor: "text-fuchsia-400",
    badgeBg: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
    accentBorder: "group-hover:border-fuchsia-400",
  },
  {
    categoryName: "Safety & Policy",
    keywords: ["regulation", "policy", "governance", "safety", "alignment", "copyright", "law", "ethics"],
    icon: Shield,
    gradient: "from-blue-600/20 via-slate-900/30 to-slate-950",
    iconColor: "text-blue-400",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
    accentBorder: "group-hover:border-blue-400",
  },
  {
    categoryName: "Security",
    keywords: ["security", "vulnerability", "auth", "exploit", "cve", "injection"],
    icon: Lock,
    gradient: "from-rose-600/20 via-red-900/30 to-slate-950",
    iconColor: "text-rose-400",
    badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
    accentBorder: "group-hover:border-rose-400",
  },
  {
    categoryName: "Infrastructure & Systems",
    keywords: ["infrastructure", "cloud", "server", "deploy", "kubernetes", "vllm", "cluster", "distributed"],
    icon: Server,
    gradient: "from-sky-600/20 via-blue-900/30 to-slate-950",
    iconColor: "text-sky-400",
    badgeBg: "bg-sky-50 text-sky-700 border-sky-200",
    accentBorder: "group-hover:border-sky-400",
  },
  {
    categoryName: "Databases & RAG",
    keywords: ["database", "vector", "embedding", "rag", "storage", "sql", "nosql", "retrieval"],
    icon: Database,
    gradient: "from-cyan-600/20 via-blue-900/30 to-slate-950",
    iconColor: "text-cyan-400",
    badgeBg: "bg-cyan-50 text-cyan-700 border-cyan-200",
    accentBorder: "group-hover:border-cyan-400",
  },
  {
    categoryName: "Product Launches",
    keywords: ["launch", "release", "announcement", "preview", "beta"],
    icon: Rocket,
    gradient: "from-orange-600/20 via-amber-900/30 to-slate-950",
    iconColor: "text-orange-400",
    badgeBg: "bg-orange-50 text-orange-700 border-orange-200",
    accentBorder: "group-hover:border-orange-400",
  },
  {
    categoryName: "Web & API",
    keywords: ["web", "browser", "internet", "frontend", "api", "rest", "http"],
    icon: Globe,
    gradient: "from-slate-600/20 via-gray-900/30 to-slate-950",
    iconColor: "text-slate-400",
    badgeBg: "bg-slate-50 text-slate-700 border-slate-200",
    accentBorder: "group-hover:border-slate-400",
  },
  {
    categoryName: "Performance & Optimization",
    keywords: ["architecture", "performance", "optimization", "speed", "latency", "throughput", "benchmark"],
    icon: Zap,
    gradient: "from-yellow-600/20 via-amber-900/30 to-slate-950",
    iconColor: "text-yellow-400",
    badgeBg: "bg-yellow-50 text-yellow-700 border-yellow-200",
    accentBorder: "group-hover:border-yellow-400",
  },
  {
    categoryName: "Developer Tooling",
    keywords: ["developer", "cli", "terminal", "ide", "vscode", "tooling"],
    icon: Terminal,
    gradient: "from-emerald-600/20 via-zinc-900/30 to-slate-950",
    iconColor: "text-emerald-400",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    accentBorder: "group-hover:border-emerald-400",
  },
] as const;

/** Default theme when no specific category matches */
export const DEFAULT_THEME: CategoryTheme = {
  categoryName: "Tech News",
  keywords: [],
  icon: Newspaper,
  gradient: "from-gray-700/20 via-slate-900/30 to-zinc-950",
  iconColor: "text-gray-400",
  badgeBg: "bg-gray-100 text-gray-700 border-gray-200",
  accentBorder: "group-hover:border-gray-400",
};

/** Default icon */
export const DEFAULT_ICON: LucideIcon = DEFAULT_THEME.icon;

/**
 * Resolves full category theme (icon, colors, gradients) from tags, sourceType, or title.
 */
export function resolveTheme(
  tags: string[] = [],
  sourceType?: string,
  title?: string
): CategoryTheme {
  const searchTerms = [
    ...(title ? title.toLowerCase().split(/[\s,.:;_\-]+/) : []),
    ...tags.map((t) => t.toLowerCase()),
    (sourceType ?? "").toLowerCase(),
  ].filter(Boolean);

  for (const entry of THEME_ENTRIES) {
    for (const term of searchTerms) {
      if (entry.keywords.some((kw) => term.includes(kw) || kw.includes(term))) {
        return entry;
      }
    }
  }

  return DEFAULT_THEME;
}

/**
 * Resolves a Lucide icon component from an array of tags, sourceType, or title.
 */
export function resolveIcon(
  tags: string[],
  sourceType?: string,
  title?: string
): LucideIcon {
  return resolveTheme(tags, sourceType, title).icon;
}

/**
 * Resolves Google Favicon service URL for a given domain/URL.
 */
export function getFaviconUrl(urlStr: string, size = 32): string | null {
  try {
    const url = new URL(urlStr);
    return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=${size}`;
  } catch {
    return null;
  }
}
