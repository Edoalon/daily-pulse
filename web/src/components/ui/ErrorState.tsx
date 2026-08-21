import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

/**
 * Displayed when a Firestore fetch or function call fails.
 * Offers an optional retry action.
 */
export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50">
        <AlertTriangle className="h-10 w-10 text-red-400" />
      </div>

      <h2 className="mb-2 font-serif text-2xl font-bold text-gray-900">
        Something Went Wrong
      </h2>

      <p className="mb-8 max-w-md text-gray-500">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
