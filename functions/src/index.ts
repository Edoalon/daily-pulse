import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";
import { runOmniDigest } from "./agent";

if (!admin.apps.length) {
  admin.initializeApp();
}

const COLLECTION_NAME = "daily-pulse";

export const getAiNews = functions.https.onCall(
  {
    cors: true,
    timeoutSeconds: 300,
    memory: "1GiB",
  },
  async (request) => {
    try {
      console.log("[getAiNews] Triggered onCall OmniDigest execution...");
      const data = await runOmniDigest();

      const db = admin.firestore();
      await db.collection(COLLECTION_NAME).doc(data.date).set(data);
      console.log(`[getAiNews] Saved OmniDigest for date: ${data.date} (${data.items?.length || 0} items)`);

      return { data };
    } catch (error: any) {
      console.error("[getAiNews] Error executing OmniDigest:", error);
      throw new functions.https.HttpsError("internal", error.message || "Failed to execute OmniDigest agent");
    }
  }
);

export const getAiNewsCron = functions.scheduler.onSchedule(
  {
    schedule: "0 9 * * *",
    timeZone: "UTC",
    timeoutSeconds: 300,
    memory: "1GiB",
  },
  async (event) => {
    try {
      console.log("[getAiNewsCron] Running scheduled OmniDigest task...");
      const data = await runOmniDigest();

      const db = admin.firestore();
      await db.collection(COLLECTION_NAME).doc(data.date).set(data);
      console.log(`[getAiNewsCron] Saved OmniDigest for date: ${data.date} (${data.items?.length || 0} items)`);
    } catch (error) {
      console.error("[getAiNewsCron] Cron execution error:", error);
    }
  }
);

