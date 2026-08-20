import { GoogleGenAI } from '@google/genai';
import { DigestResponse, ResearchDossier, getTemporalContext } from './types';
import {
  RESEARCH_TOPICS,
  responseSchema,
  buildSystemPrompt,
  buildSynthesisPrompt,
} from './prompts';
import { evaluateResearchSufficiency, isValidUrl, validateAndNormalizeDigest } from './validator';

export * from './types';

const MAX_CHECK_ROUNDS = 2;

export async function runOmniDigest(referenceDate?: Date): Promise<DigestResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing.');
  }

  const ai = new GoogleGenAI({ apiKey });
  const temporal = getTemporalContext(referenceDate);

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

  const fetchTopic = async (topic: (typeof RESEARCH_TOPICS)[number]) => {
    console.log(`[OmniDigest Fetch] Querying domain: ${topic.topic}...`);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
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
          model: 'gemini-2.5-flash',
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

  const synthesisResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
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
  const parsed = JSON.parse(synthesisResponse.text || '{}');
  return validateAndNormalizeDigest(parsed, temporal, dossier.sources);
}
