import * as functions from "firebase-functions/v2";
import { runOmniDigest } from "./agent";

export const getAiNews = functions.https.onCall(async (request) => {
  try {
    const data = await runOmniDigest();
    return { data };
  } catch (error: any) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});

export const getAiNewsCron = functions.scheduler.onSchedule("0 9 * * *", async (event) => {
  try {
    const data = await runOmniDigest();
    
    // Save to Firestore
    const admin = await import("firebase-admin");
    if (!admin.apps.length) {
      admin.initializeApp();
    }
    const db = admin.firestore();
    
    const dateStr = new Date().toISOString().split('T')[0];
    await db.collection("daily-pulse").doc(dateStr).set(data);
    
    console.log(`Saved OmniDigest for ${dateStr}`);
  } catch (error) {
    console.error("Cron Error:", error);
  }
});
