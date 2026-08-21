import { useState, useCallback } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../config/firebase";
import { GENERATE_DIGEST_FUNCTION } from "../constants/app";

interface UseGenerateDigestResult {
  generate: () => Promise<void>;
  generating: boolean;
  error: string | null;
}

/**
 * Triggers the `getAiNews` Firebase callable function to generate a new digest.
 * The actual data arrival is handled by the real-time `useDigest` listener,
 * so this hook only manages the request lifecycle (loading + error).
 */
export function useGenerateDigest(): UseGenerateDigestResult {
  const [generating, setGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async () => {
    setGenerating(true);
    setError(null);

    try {
      const callable = httpsCallable(functions, GENERATE_DIGEST_FUNCTION, {
        timeout: 300000, // 5 minutes to allow for Gemini retries and generation
      });
      await callable();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to generate digest";
      console.error("[useGenerateDigest] Error:", message);
      setError(message);
    } finally {
      setGenerating(false);
    }
  }, []);

  return { generate, generating, error };
}
