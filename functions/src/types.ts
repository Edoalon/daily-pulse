export interface DigestItem {
  id: string;
  title: string;
  summary: string;
  keyTakeaways: string[];
  sourceUrl: string;
  sourceName: string;
  sourceType: string;
  qualityScore: number;
  tags: string[];
  imageUrl?: string;
}

export interface DigestResponse {
  date: string;
  executiveSummary: string;
  items: DigestItem[];
}

export interface TemporalContext {
  isoDate: string;
  year: number;
  monthYear: string;
  formattedDate: string;
}

export interface DiscoveredSource {
  title: string;
  url: string;
}

export interface ResearchDossier {
  queries: string[];
  sources: DiscoveredSource[];
  findings: string[];
}

export interface ResearchCheckResult {
  isSufficient: boolean;
  reason: string;
  suggestedQuery?: string;
}

export type PipelineStage = 
  | 'multi_domain_search'
  | 'verification_loop'
  | 'grounded_synthesis'
  | 'schema_normalization'
  | 'media_enrichment'
  | 'completed'
  | 'failed';

export interface PipelineStatusData {
  runId: string;
  activeStage: PipelineStage;
  progressDetails: string;
  status: 'in_progress' | 'completed' | 'failed';
  updatedAt: string;
}

export const APP_TIMEZONE = 'Asia/Jerusalem';

export function getTemporalContext(referenceDate: Date = new Date()): TemporalContext {
  // Format YYYY-MM-DD in Israel timezone (en-CA standard produces YYYY-MM-DD)
  const isoDate = new Intl.DateTimeFormat('en-CA', {
    timeZone: APP_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(referenceDate);

  const yearParts = new Intl.DateTimeFormat('en-US', {
    timeZone: APP_TIMEZONE,
    year: 'numeric',
  }).format(referenceDate);
  const year = parseInt(yearParts, 10);

  const monthYear = referenceDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: APP_TIMEZONE,
  });

  const formattedDate = referenceDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: APP_TIMEZONE,
  });

  return { isoDate, year, monthYear, formattedDate };
}
