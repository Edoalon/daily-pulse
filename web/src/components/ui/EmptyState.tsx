import { FileSearch, Sparkles } from "lucide-react";
import { formatDisplayDate, isToday } from "../../utils/date";

interface EmptyStateProps {
  date: string;
  onGenerate: () => void;
  generating: boolean;
}

/**
 * Displayed when no digest exists for the selected date.
 * Clarifies whether no digest exists for today or if there's no historical archive for a past date.
 */
export function EmptyState({ date, onGenerate, generating }: EmptyStateProps) {
  const currentIsToday = isToday(date);

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
            ) yet. Run the agent now to produce today's briefing.
          </>
        ) : (
          <>
            No digest was recorded for{" "}
            <span className="font-medium text-gray-700">
              {formatDisplayDate(date)}
            </span>
            . You can select another past date from the calendar or generate today's briefing.
          </>
        )}
      </p>

      <button
        onClick={onGenerate}
        disabled={generating}
        className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Sparkles className="h-4 w-4" />
        {generating
          ? "Generating Today's Digest…"
          : currentIsToday
          ? "Generate Today's Digest"
          : "Go to Today & Generate"}
      </button>
    </div>
  );
}

