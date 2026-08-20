import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { runOmniDigest } from './agent';

async function test() {
  console.log("🚀 Starting OmniDigest test run...");
  console.log("Checking GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "Present ✅" : "Missing ❌");

  const startTime = Date.now();
  try {
    const result = await runOmniDigest();
    console.log("\n==========================================");
    console.log("🎉 SUCCESS! OMNIDIGEST AGENT OUTPUT:");
    console.log("==========================================");
    console.log(JSON.stringify(result, null, 2));
    console.log("==========================================");
    console.log(`⏱️ Duration: ${((Date.now() - startTime) / 1000).toFixed(2)}s`);
  } catch (error) {
    console.error("❌ Agent execution failed:", error);
  }
}

test();
