import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";
import { runOmniDigest, getTemporalContext } from "./agent";

if (!admin.apps.length) {
  admin.initializeApp();
}

const COLLECTION_NAME = "daily-pulse";

// HTTP onCall function kept for reference (disabled to restrict user triggering)
/*
export const getAiNews = functions.https.onCall(
  {
    cors: true,
    timeoutSeconds: 300,
    memory: "1GiB",
  },
  async (request) => {
    const db = admin.firestore();
    let runDate = "";

    try {
      console.log("[getAiNews] Triggered onCall OmniDigest execution...");

      const data = await runOmniDigest(undefined, async (statusUpdate) => {
        if (!runDate && statusUpdate.updatedAt) {
           // A rough hack since we don't have isoDate available initially in this scope.
           runDate = statusUpdate.updatedAt.split("T")[0]; 
        }
        if (runDate) {
          try {
            await db.collection("pipeline-status").doc(runDate).set(
              statusUpdate,
              { merge: true }
            );
          } catch(err) {
            console.error("[getAiNews] Failed to write status update:", err);
          }
        }
      });

      runDate = data.date;
      await db.collection(COLLECTION_NAME).doc(data.date).set(data);
      console.log(`[getAiNews] Saved OmniDigest for date: ${data.date} (${data.items?.length || 0} items)`);

      // Mark status as completed
      db.collection("pipeline-status").doc(data.date).set({
        status: "completed",
        updatedAt: new Date().toISOString(),
      }, { merge: true }).catch(console.error);

      return { data };
    } catch (error: any) {
      console.error("[getAiNews] Error executing OmniDigest:", error);

      if (runDate) {
         db.collection("pipeline-status").doc(runDate).set({
            status: "failed",
            updatedAt: new Date().toISOString(),
          }, { merge: true }).catch(console.error);
      }

      throw new functions.https.HttpsError("internal", error.message || "Failed to execute OmniDigest agent");
    }
  }
);
*/

/**
 * Scheduled Cron Job: Executes OmniDigest generation daily at 00:01 AM Israel Time (Asia/Jerusalem).
 */
export const getAiNewsCron = functions.scheduler.onSchedule(
  {
    schedule: "1 0 * * *",
    timeZone: "Asia/Jerusalem",
    timeoutSeconds: 300,
    memory: "1GiB",
  },
  async (event) => {
    const db = admin.firestore();
    const temporal = getTemporalContext();
    let runDate = temporal.isoDate;

    try {
      console.log(`[getAiNewsCron] Running scheduled OmniDigest task for ${runDate} (Israel Time)...`);

      const data = await runOmniDigest(undefined, async (statusUpdate) => {
        if (runDate) {
          try {
            await db.collection("pipeline-status").doc(runDate).set(
              statusUpdate,
              { merge: true }
            );
          } catch (err) {
            console.error("[getAiNewsCron] Failed to write status update:", err);
          }
        }
      });

      runDate = data.date;
      await db.collection(COLLECTION_NAME).doc(data.date).set(data);
      console.log(`[getAiNewsCron] Saved OmniDigest for date: ${data.date} (${data.items?.length || 0} items)`);

      // Mark status as completed
      await db.collection("pipeline-status").doc(data.date).set({
        status: "completed",
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    } catch (error: any) {
      console.error("[getAiNewsCron] Cron execution error:", error);

      if (runDate) {
        await db.collection("pipeline-status").doc(runDate).set({
          status: "failed",
          updatedAt: new Date().toISOString(),
        }, { merge: true }).catch(console.error);
      }
    }
  }
);

