import { FileSearch, Sparkles, Loader2 } from "lucide-react";
import { formatDisplayDate, isToday } from "../../utils/date";
import type { PipelineStatusData } from "../../hooks/usePipelineStatus";

interface EmptyStateProps {
  date: string;
  onGenerate: () => void;
  generating: boolean;
  pipelineStatus?: PipelineStatusData | null;
}

const STAGES = [
  "multi_domain_search",
  "verification_loop",
  "grounded_synthesis",
  "schema_normalization",
  "media_enrichment",
];

function getProgressPercent(status?: PipelineStatusData | null) {
  if (!status || status.status !== "in_progress") return 0;
  const index = STAGES.indexOf(status.activeStage);
  if (index === -1) return 0;
  return Math.round(((index + 1) / STAGES.length) * 100);
}

function getStageLabel(status?: PipelineStatusData | null, currentIsToday?: boolean) {
  if (!status || status.status !== "in_progress") {
    return currentIsToday ? "Generate Today's Digest" : "Go to Today & Generate";
  }
  
  switch (status.activeStage) {
    case "multi_domain_search": return "Multi-Domain Search…";
    case "verification_loop": return "Verification Loop…";
    case "grounded_synthesis": return "Grounded Synthesis…";
    case "schema_normalization": return "Schema Normalization…";
    case "media_enrichment": return "Media Enrichment…";
    default: return "Generating…";
  }
}

/**
 * Displayed when no digest exists for the selected date.
 * Clarifies whether no digest exists for today or if there's no historical archive for a past date.
 */
export function EmptyState({ date, onGenerate, generating, pipelineStatus }: EmptyStateProps) {
  const currentIsToday = isToday(date);
  const percent = getProgressPercent(pipelineStatus);
  const buttonLabel = generating ? getStageLabel(pipelineStatus, currentIsToday) : (currentIsToday ? "Generate Today's Digest" : "Go to Today & Generate");

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50">
        <FileSearch className="h-10 w-10 text-indigo-400" />
      </div>

      <h2 className="mb-2 font-serif text-2xl font-bold text-gray-900">
        {currentIsToday ? "No Digest for Today Yet" : "No Archived Digest Found"}
      </h2>

      <p className="mb-8 max-w-md text-gray-500">
        {currentIsToday ? (
          <>
            There is no intelligence digest generated for today (
            <span className="font-medium text-gray-700">
              {formatDisplayDate(date)}
            </span>
            ) yet. The briefing updates automatically every night at 00:01 AM (Israel Time).
          </>
        ) : (
          <>
            No digest was recorded for{" "}
            <span className="font-medium text-gray-700">
              {formatDisplayDate(date)}
            </span>
            . You can select another past date from the calendar.
          </>
        )}
      </p>

      {/* Manual generation button - hidden from public view (set to true to restore) */}
      {false as boolean && (
        <button
          onClick={onGenerate}
          disabled={generating}
          className="relative overflow-hidden flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-80"
        >
          {generating && percent > 0 && (
            <div 
              className="absolute left-0 top-0 bottom-0 bg-indigo-400 opacity-30 transition-all duration-500 ease-in-out" 
              style={{ width: `${percent}%` }}
            />
          )}
          
          <div className="relative z-10 flex items-center gap-2">
            {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {buttonLabel}
          </div>
        </button>
      )}
    </div>
  );
}
