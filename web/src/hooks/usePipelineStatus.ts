import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

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

export function usePipelineStatus(date: string) {
  const [status, setStatus] = useState<PipelineStatusData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!date) return;

    setStatus(null);
    setError(null);

    const statusRef = doc(db, "pipeline-status", date);
    
    const unsubscribe = onSnapshot(
      statusRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setStatus(docSnap.data() as PipelineStatusData);
        } else {
          setStatus(null);
        }
      },
      (err) => {
        console.error("[usePipelineStatus] Error fetching status:", err);
        setError(err.message);
      }
    );

    return () => unsubscribe();
  }, [date]);

  return { status, error };
}
