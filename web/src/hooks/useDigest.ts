import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { FIRESTORE_COLLECTION } from "../constants/app";
import type { DigestResponse } from "../types/digest";

interface UseDigestResult {
  digest: DigestResponse | null;
  loading: boolean;
  error: string | null;
}

/**
 * Real-time Firestore listener for a daily digest document.
 * Subscribes to `daily-pulse/{date}` and auto-updates when data changes
 * (e.g., after the agent writes a new digest).
 *
 * @param date - ISO date string (YYYY-MM-DD) to fetch
 */
export function useDigest(date: string): UseDigestResult {
  const [digest, setDigest] = useState<DigestResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setDigest(null);

    const docRef = doc(db, FIRESTORE_COLLECTION, date);

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setDigest(snapshot.data() as DigestResponse);
        } else {
          setDigest(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error("[useDigest] Firestore error:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [date]);

  return { digest, loading, error };
}
