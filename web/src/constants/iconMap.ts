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
  type LucideIcon,
} from "lucide-react";

/**
 * Maps tag/source keywords to Lucide icon components.
 * Lookup is case-insensitive and checks for partial matches.
 */
const ICON_ENTRIES: readonly { keywords: string[]; icon: LucideIcon }[] = [
  { keywords: ["llm", "llms", "ai", "model", "gpt", "gemini", "foundation"], icon: Brain },
  { keywords: ["open source", "open-source", "github"], icon: Code },
  { keywords: ["research", "paper", "arxiv", "benchmark"], icon: BookOpen },
  { keywords: ["hardware", "quantum", "chip", "semiconductor"], icon: Cpu },
  { keywords: ["robotics", "robot", "autonomous", "transportation"], icon: Bot },
  { keywords: ["ar/vr", "spatial", "headset", "vision"], icon: Eye },
  { keywords: ["regulation", "policy", "governance", "europe"], icon: Shield },
  { keywords: ["infrastructure", "cloud", "server", "deploy"], icon: Server },
  { keywords: ["launch", "release", "announcement"], icon: Rocket },
  { keywords: ["web", "browser", "internet"], icon: Globe },
  { keywords: ["architecture", "performance", "optimization"], icon: Zap },
] as const;

/** Default icon when no tag matches */
export const DEFAULT_ICON: LucideIcon = Newspaper;

/**
 * Resolves a Lucide icon component from an array of tags or a sourceType string.
 * Checks tags first, then sourceType. Returns the default icon if no match.
 */
export function resolveIcon(tags: string[], sourceType?: string): LucideIcon {
  const searchTerms = [...tags, sourceType ?? ""].map((t) => t.toLowerCase());

  for (const entry of ICON_ENTRIES) {
    for (const term of searchTerms) {
      if (entry.keywords.some((kw) => term.includes(kw))) {
        return entry.icon;
      }
    }
  }

  return DEFAULT_ICON;
}
