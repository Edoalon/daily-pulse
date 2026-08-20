import { Schema, Type } from '@google/genai';
import { ResearchDossier, TemporalContext } from './types';

export const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    date: { type: Type.STRING, description: "ISO 8601 formatted date (YYYY-MM-DD) of the digest" },
    executiveSummary: { type: Type.STRING, description: "High-level factual summary of the day's tech & AI landscape" },
    items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "Unique identifier for the item (e.g. AI_ITEM_001)" },
          title: { type: Type.STRING, description: "Headline of the discovery" },
          summary: { type: Type.STRING, description: "Detailed factual summary based strictly on search findings" },
          keyTakeaways: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Bullet points detailing verified architectural, performance, or ecosystem facts"
          },
          sourceUrl: { type: Type.STRING, description: "Valid, live HTTP/HTTPS URL from search grounding results" },
          sourceName: { type: Type.STRING, description: "Publication, company, or platform name" },
          sourceType: { type: Type.STRING, description: "Type of source (e.g. Official Announcement, Research Paper, Blog Post, GitHub Repository)" },
          qualityScore: { type: Type.INTEGER, description: "Rating from 1 to 10 on technical depth and significance" },
          tags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Categorical tags (e.g. LLM, Infrastructure, Open Source, Agents)"
          }
        },
        required: ["id", "title", "summary", "keyTakeaways", "sourceUrl", "sourceName", "sourceType", "qualityScore", "tags"]
      }
    }
  },
  required: ["date", "executiveSummary", "items"]
};

export function buildSystemPrompt(temporal: TemporalContext): string {
  return `You are OmniDigest, an autonomous tech and AI intelligence agent.
Current Date: ${temporal.isoDate} (${temporal.formattedDate})
Current Year: ${temporal.year}

Your core mission is to discover, investigate, filter, and summarize the most significant, high-signal tech, AI, and developer developments that occurred within the past 24 to 48 hours relative to ${temporal.isoDate}.

Strict Grounding & Anti-Hallucination Directives:
1. STRICT WEB GROUNDING: You MUST ground all answers using Google Search. Do NOT rely on parametric memory or invent future models, releases, or benchmarks.
2. TEMPORAL BOUNDARY: Focus strictly on fresh events occurring within the past 24 to 48 hours relative to ${temporal.isoDate}. Discard stale documentation or historic archives.
3. REAL SOURCE CITATIONS: Every fact must be attributed to real web pages discovered via search. Never hallucinate URLs or fabricate DOIs/slugs.
4. SIGNAL OVER NOISE: Prioritize major foundation model updates, open-source infrastructure releases, breakthrough research papers, and developer tooling.`;
}

export const RESEARCH_TOPICS = [
  {
    topic: "Major AI Labs & Foundation Models",
    buildPrompt: (temporal: TemporalContext) =>
      `Execute targeted Google Searches right now for major foundation model releases, API updates, and AI lab announcements (Google DeepMind, OpenAI, Anthropic, Meta, Mistral, xAI, DeepSeek) published in the last 24 to 48 hours relative to ${temporal.isoDate}.
Provide factual summaries of what was announced, key technical capabilities, and cite the exact live source URLs discovered.`
  },
  {
    topic: "Open Source AI & Developer Infrastructure",
    buildPrompt: (temporal: TemporalContext) =>
      `Execute targeted Google Searches right now for open-source AI developer tooling, framework updates (vLLM, Hugging Face, PyTorch, Ollama, LangChain), model weights, and inference breakthroughs published in the last 24 to 48 hours relative to ${temporal.isoDate}.
Provide factual summaries of the releases with exact live source URLs discovered.`
  },
  {
    topic: "Trending AI Research & Technical Discussions",
    buildPrompt: (temporal: TemporalContext) =>
      `Execute targeted Google Searches right now for trending AI research papers, benchmarks, GitHub trending AI repositories, and major technical discussions from the last 24 to 48 hours relative to ${temporal.isoDate}.
Provide factual summaries with exact live source URLs discovered.`
  }
];

export function buildSynthesisPrompt(temporal: TemporalContext, dossier: ResearchDossier): string {
  const sourcesList = dossier.sources.length > 0
    ? dossier.sources.map(s => `- [${s.title}] ${s.url}`).join('\n')
    : "No explicit URL chunks extracted. Extract verified URLs from the research text below.";

  const findingsText = dossier.findings.join('\n\n---\n\n');

  return `You are synthesizing the final OmniDigest intelligence report for ${temporal.isoDate}.

=== GROUNDED RESEARCH DOSSIER ===
${findingsText}

=== VERIFIED LIVE SEARCH SOURCES ===
${sourcesList}
================================

STRICT ANTI-HALLUCINATION & SYNTHESIS DIRECTIVES:
1. ABSOLUTE FACTUALITY: Every item MUST be directly derived from the Grounded Research Dossier above. DO NOT invent, extrapolate, or fabricate any model, company, metric, or release.
2. SOURCE URL ANCHORING: Every item's "sourceUrl" MUST be a real, verified HTTP/HTTPS URL from the search findings and source list above. DO NOT hallucinate URLs, invent DOIs, or use placeholder tokens (such as "XXXXX" or "example.com").
3. DATE ANCHORING: The output "date" MUST be exactly "${temporal.isoDate}".
4. QUALITY SCORING: Score each item from 1 to 10 based on technical depth and industry significance (8-10 for breakthrough tier).
5. FORMAT: Output strictly valid JSON matching the provided schema.`;
}
