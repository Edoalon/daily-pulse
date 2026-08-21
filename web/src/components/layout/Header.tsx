import { Loader2, Sparkles } from "lucide-react";
import { APP_NAME } from "../../constants/app";
import { formatDisplayDate, getTodayISO } from "../../utils/date";
import type { PipelineStatusData } from "../../hooks/usePipelineStatus";

interface HeaderProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
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
  // +1 because if we are in stage 0 (1/5), we want to show 20%
  return Math.round(((index + 1) / STAGES.length) * 100);
}

function getStageLabel(status?: PipelineStatusData | null) {
  if (!status || status.status !== "in_progress") return "Generating Today's Digest…";
  
  switch (status.activeStage) {
    case "multi_domain_search": return "Multi-Domain Search…";
    case "verification_loop": return "Verification Loop…";
    case "grounded_synthesis": return "Grounded Synthesis…";
    case "schema_normalization": return "Schema Normalization…";
    case "media_enrichment": return "Media Enrichment…";
    default: return "Generating Today's Digest…";
  }
}

/**
 * Top navigation bar with app branding, date picker (restricted to today & past dates),
 * and today's digest generation trigger.
 * Shows an "Agent is Running..." indicator when the generation is in progress.
 */
export function Header({
  selectedDate,
  onDateChange,
  onGenerate,
  generating,
  pipelineStatus,
}: HeaderProps) {
  const todayISO = getTodayISO();
  const percent = getProgressPercent(pipelineStatus);
  const buttonLabel = generating ? getStageLabel(pipelineStatus) : "Generate Today's Digest";

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Branding */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900">
              {APP_NAME}
            </h1>
            <p className="hidden text-xs text-gray-400 sm:block">
              {formatDisplayDate(selectedDate)}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Date picker (max date restricted to today) */}
          <input
            type="date"
            value={selectedDate}
            max={todayISO}
            onChange={(e) => {
              const val = e.target.value;
              if (!val) return;
              onDateChange(val > todayISO ? todayISO : val);
            }}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 transition-colors hover:border-indigo-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            title="Select date (up to today)"
          />

          {/* Generate Today's Digest button */}
          <button
            onClick={onGenerate}
            disabled={generating}
            title="Generate real-time AI intelligence digest for today"
            className="relative overflow-hidden flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
          >
            {generating && percent > 0 && (
              <div 
                className="absolute left-0 top-0 bottom-0 bg-indigo-600 opacity-40 transition-all duration-500 ease-in-out" 
                style={{ width: `${percent}%` }}
              />
            )}
            
            <div className="relative z-10 flex items-center gap-2">
              {generating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="hidden sm:inline">{buttonLabel}</span>
                  <span className="sm:hidden">{percent > 0 ? `${percent}%` : "Running…"}</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span className="hidden sm:inline">{buttonLabel}</span>
                  <span className="sm:hidden">Today's Digest</span>
                </>
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
