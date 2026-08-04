# OmniDigest

An autonomous, serverless intelligence platform that discovers, filters, evaluates, and summarizes high-signal web updates, research, and social media discussions every day. Powered by Google Gemini, Firebase, and React.

## Key Features
- **Autonomous Web & Social Discovery:** Scours tech blogs and social media platforms (X / Twitter, LinkedIn) within a 24–48h window.
- **AI Quality Scoring:** Rates content 1–10 and filters out marketing noise using Gemini API.
- **Cross-Day Deduplication:** Prevents repeat coverage using historical Firestore records.
- **Automated Pipeline:** Scheduled Cloud Functions run every morning at 06:00 AM.
- **React Dashboard:** Modern web UI with daily summaries, categorized news cards, and archive browsing.

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Firebase Cloud Functions (TypeScript), Cloud Scheduler
- **Database:** Cloud Firestore
- **AI Engine:** Google Gemini API