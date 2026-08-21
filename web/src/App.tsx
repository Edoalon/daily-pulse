import { useState } from "react";
import { Header } from "./components/layout/Header";
import { ExecutiveSummary } from "./components/digest/ExecutiveSummary";
import { ArticleGrid } from "./components/digest/ArticleGrid";
import { ArticleDrawer } from "./components/digest/ArticleDrawer";
import { LoadingState } from "./components/ui/LoadingState";
import { EmptyState } from "./components/ui/EmptyState";
import { ErrorState } from "./components/ui/ErrorState";
import { useDigest } from "./hooks/useDigest";
import { useGenerateDigest } from "./hooks/useGenerateDigest";
import { getTodayISO } from "./utils/date";
import type { DigestItem } from "./types/digest";

/**
 * Root application component.
 * Manages selected date, selected article (for drawer), and orchestrates
 * all child components with data from Firebase.
 */
export default function App() {
  const [selectedDate, setSelectedDate] = useState<string>(getTodayISO);
  const [selectedArticle, setSelectedArticle] = useState<DigestItem | null>(
    null
  );

  const { digest, loading, error } = useDigest(selectedDate);
  const { generate, generating, error: generateError } = useGenerateDigest();

  const handleDateChange = (date: string) => {
    const today = getTodayISO();
    if (date > today) {
      setSelectedDate(today);
    } else {
      setSelectedDate(date);
    }
  };

  const handleGenerateToday = async () => {
    const today = getTodayISO();
    if (selectedDate !== today) {
      setSelectedDate(today);
    }
    await generate();
  };

  const handleRetry = () => {
    // Force re-subscribe by resetting the date to trigger a new effect
    setSelectedDate((prev) => prev);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        onGenerate={handleGenerateToday}
        generating={generating}
      />

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Generation error toast */}
        {generateError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <strong>Generation failed:</strong> {generateError}
          </div>
        )}

        {/* Content states */}
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={handleRetry} />
        ) : !digest ? (
          <EmptyState
            date={selectedDate}
            onGenerate={handleGenerateToday}
            generating={generating}
          />
        ) : (
          <div className="space-y-10">
            <ExecutiveSummary summary={digest.executiveSummary} />
            <ArticleGrid
              items={digest.items}
              onSelectArticle={setSelectedArticle}
            />
          </div>
        )}
      </main>

      {/* Article detail drawer */}
      <ArticleDrawer
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
}
