# System Product Roadmap

## Stack Overview
- **Frontend:** React (TypeScript)
- **Cloud & Backend:** Firebase (Functions, Firestore, Hosting)
- **AI Engine:** Google Gemini API (1.5 / 2.0 Flash)
- **Discovery Layer:** Web & Social Media APIs (X/Twitter, LinkedIn, News)

---

## Phase 1: Agent Intelligence Core & Social Discovery (PoC)
**Goal:** Build and validate the autonomous agent logic, social media & web discovery pipeline, deduplication, and structured JSON output locally.
- Build 24-48h window fetchers for web blogs and social platforms (X, LinkedIn).
- Design Gemini System Instructions forcing strict JSON outputs (Summary, Article Array, Source Type, Quality Score 1-10).
- Extract high-signal announcements from social media; filter out marketing noise.
- Deliver local CLI script returning clean daily digests.

## Phase 2: Cloud Automation & Firestore Infrastructure
**Goal:** Transition agent logic to a serverless daily cloud task with persistent storage.
- Design `daily_digests` collection schema in Firestore (`YYYY-MM-DD`).
- Deploy Cloud Function triggered daily at 06:00 AM via Cloud Scheduler.
- Implement cross-day semantic deduplication querying past 3 days of Firestore logs.

## Phase 3: React Web Interface (MVP Release)
**Goal:** Build a clean React application to present the daily output.
- Connect React UI to Firestore via Firebase Web SDK.
- Create Executive Summary banner, categorised Feed Cards (Blog vs Social), and source badges.
- Implement historical date picker for archive browsing.

## Phase 4: User Personalization & Daily Notifications
**Goal:** Make the product interactive with user profiles and alerts.
- Add Firebase Authentication (Google / Email).
- Build personal "Bookmarks / Saved Items" tab in React.
- Set up 08:00 AM push/email notifications.

## Phase 5: Multi-Topic Engine Expansion
**Goal:** Scale the agent to support customizable, non-AI topics (Fintech, Space, Sports, etc.).
- Add topic preferences interface in React.
- Refactor Cloud Function to accept dynamic, parameterized topics instead of hardcoded queries.
- Structure Firestore to segment digests by topic category (`digests/{topic}/daily/{date}`).