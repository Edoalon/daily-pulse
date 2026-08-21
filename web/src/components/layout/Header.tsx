import { Loader2, Sparkles } from "lucide-react";
import { APP_NAME } from "../../constants/app";
import { formatDisplayDate, getTodayISO } from "../../utils/date";

interface HeaderProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  onGenerate: () => void;
  generating: boolean;
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
}: HeaderProps) {
  const todayISO = getTodayISO();

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
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="hidden sm:inline">Generating Today's Digest…</span>
                <span className="sm:hidden">Running…</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Generate Today's Digest</span>
                <span className="sm:hidden">Today's Digest</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
