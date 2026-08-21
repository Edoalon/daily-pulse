import { GoogleGenAI } from '@google/genai';
import { DigestResponse, ResearchDossier, getTemporalContext, PipelineStage, PipelineStatusData } from './types';
import {
  RESEARCH_TOPICS,
  responseSchema,
  buildSystemPrompt,
  buildSynthesisPrompt,
} from './prompts';
import { evaluateResearchSufficiency, isValidUrl, validateAndNormalizeDigest } from './validator';
import { enrichItemsWithImages } from './metadata';

export * from './types';

const MAX_CHECK_ROUNDS = 2;
const MODEL_NAME = 'gemini-3.7-flash';

export async function runOmniDigest(
  referenceDate?: Date,
  onStatusUpdate?: (status: Partial<PipelineStatusData>) => Promise<void>
): Promise<DigestResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing.');
  }

  const ai = new GoogleGenAI({ apiKey });
  const temporal = getTemporalContext(referenceDate);

  const updateStatus = async (stage: PipelineStage, details: string) => {
    if (onStatusUpdate) {
      await onStatusUpdate({
        activeStage: stage,
        progressDetails: details,
        status: 'in_progress',
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const dossier: ResearchDossier = {
    queries: [],
    sources: [],
    findings: [],
  };

  const seenUrls = new Set<string>();

  const extractGrounding = (response: any, text: string) => {
    const candidate = response.candidates?.[0];
    const metadata = candidate?.groundingMetadata;

    if (metadata?.webSearchQueries) {
      for (const q of metadata.webSearchQueries) {
        if (!dossier.queries.includes(q)) {
          dossier.queries.push(q);
        }
      }
    }

    if (metadata?.groundingChunks) {
      for (const chunk of metadata.groundingChunks) {
        const uri = chunk.web?.uri;
        const title = chunk.web?.title || 'Web Source';
        if (uri && isValidUrl(uri) && !seenUrls.has(uri)) {
          seenUrls.add(uri);
          dossier.sources.push({ title, url: uri });
        }
      }
    }

    // Extract any explicit URLs from the response text
    const urlRegex = /https?:\/\/[^\s\)\],>"']+/g;
    const matches = text.match(urlRegex) || [];
    for (const url of matches) {
      const cleanUrl = url.replace(/[.,;:]$/, '');
      if (isValidUrl(cleanUrl) && !seenUrls.has(cleanUrl)) {
        seenUrls.add(cleanUrl);
        dossier.sources.push({ title: 'Discovered Source', url: cleanUrl });
      }
    }
  };

  // -------------------------------------------------------------
  // PIPELINE STAGE 1: Multi-Topic Grounded Fetch
  // -------------------------------------------------------------
  console.log(`[OmniDigest Pipeline] Stage 1: Multi-Search Fetch (${temporal.isoDate})...`);
  await updateStatus('multi_domain_search', 'Fetching data across multiple domains...');

  const fetchTopic = async (topic: (typeof RESEARCH_TOPICS)[number]) => {
    console.log(`[OmniDigest Fetch] Querying domain: ${topic.topic}...`);
    try {
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: topic.buildPrompt(temporal),
        config: {
          systemInstruction: buildSystemPrompt(temporal),
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || '';
      if (text.trim()) {
        dossier.findings.push(`### Domain: ${topic.topic}\n${text}`);
        extractGrounding(response, text);
        console.log(`[OmniDigest Fetch] Captured ${topic.topic} (${text.length} chars, ${dossier.sources.length} sources).`);
      }
    } catch (err) {
      console.warn(`[OmniDigest Fetch] Warning during ${topic.topic}:`, err);
    }
  };

  await Promise.all(RESEARCH_TOPICS.map((topic) => fetchTopic(topic)));

  // -------------------------------------------------------------
  // PIPELINE STAGE 2: Verification & Gap-Filling Check Loop
  // -------------------------------------------------------------
  console.log(`[OmniDigest Pipeline] Stage 2: Audit & Verification Loop...`);
  await updateStatus('verification_loop', 'Verifying sources and checking for information gaps...');
  let round = 0;

  while (round < MAX_CHECK_ROUNDS) {
    const check = evaluateResearchSufficiency(dossier, temporal);
    console.log(
      `[OmniDigest Check Round ${round + 1}] Status: ${check.isSufficient ? 'PASS ✅' : 'REFINE ⚠️'} - ${check.reason}`
    );

    if (check.isSufficient) {
      break;
    }

    round++;
    if (check.suggestedQuery) {
      console.log(`[OmniDigest Check] Executing gap-filling search: "${check.suggestedQuery.substring(0, 80)}..."`);
      try {
        const gapResponse = await ai.models.generateContent({
          model: MODEL_NAME,
          contents: check.suggestedQuery,
          config: {
            systemInstruction: buildSystemPrompt(temporal),
            tools: [{ googleSearch: {} }],
          },
        });

        const text = gapResponse.text || '';
        if (text.trim()) {
          dossier.findings.push(`### Refinement Search (Round ${round})\n${text}`);
          extractGrounding(gapResponse, text);
        }
      } catch (err) {
        console.warn(`[OmniDigest Check] Error during gap-filling round ${round}:`, err);
      }
    }
  }

  console.log(
    `[OmniDigest] Research finalized: ${dossier.queries.length} search queries executed, ${dossier.sources.length} verified web sources captured.`
  );

  // -------------------------------------------------------------
  // PIPELINE STAGE 3: Grounded Synthesis
  // -------------------------------------------------------------
  console.log(`[OmniDigest Pipeline] Stage 3: Anchored Synthesis...`);
  await updateStatus('grounded_synthesis', 'Synthesizing findings from collected sources...');

  const synthesisResponse = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: buildSynthesisPrompt(temporal, dossier),
    config: {
      systemInstruction: `You are a strict data extraction and synthesis assistant. Output only factual JSON strictly anchored to the provided research dossier. Never extrapolate or invent items.`,
      responseMimeType: 'application/json',
      responseSchema,
    },
  });

  // -------------------------------------------------------------
  // PIPELINE STAGE 4: Strict Output Validation & Normalization
  // -------------------------------------------------------------
  console.log(`[OmniDigest Pipeline] Stage 4: Output Validation & Schema Enforcement...`);
  await updateStatus('schema_normalization', 'Validating syntax and normalizing data...');
  const parsed = JSON.parse(synthesisResponse.text || '{}');
  const normalized = validateAndNormalizeDigest(parsed, temporal, dossier.sources);

  // -------------------------------------------------------------
  // PIPELINE STAGE 5: Open Graph & Media Enrichment
  // -------------------------------------------------------------
  console.log(`[OmniDigest Pipeline] Stage 5: Open Graph Media Enrichment...`);
  await updateStatus('media_enrichment', 'Enriching items with article metadata and images...');
  const enrichedItems = await enrichItemsWithImages(normalized.items);

  return {
    ...normalized,
    items: enrichedItems,
  };
}
