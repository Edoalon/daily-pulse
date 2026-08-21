/** Firestore collection name where daily digests are stored */
export const FIRESTORE_COLLECTION = "daily-pulse";

/** Average reading speed for read-time estimation */
export const WORDS_PER_MINUTE = 200;

/** Application display name */
export const APP_NAME = "OmniDigest";

/** Maximum quality score value */
export const QUALITY_SCORE_MAX = 10;

/** Name of the Firebase callable function that triggers digest generation */
export const GENERATE_DIGEST_FUNCTION = "getAiNews";
