import { WORDS_PER_MINUTE } from "../constants/app";

/**
 * Estimates the read time in minutes for an article based on its
 * summary text and key takeaways.
 *
 * @returns Read time in whole minutes (minimum 1)
 */
export function calculateReadTime(
  summary: string,
  takeaways: string[]
): number {
  const allText = [summary, ...takeaways].join(" ");
  const wordCount = allText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  return Math.max(1, minutes);
}
