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
}

export interface DigestResponse {
  date: string;
  executiveSummary: string;
  items: DigestItem[];
}
