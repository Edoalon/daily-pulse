# Agent Directives & Security Rules

## Security Standard (STRICT)
- **Zero Secrets in Code:** NEVER hardcode API keys, Firebase service accounts, or tokens in source files.
- **Environment Variables Only:** Use `process.env` (Functions) or `import.meta.env` (React).
- **Backend Isolation:** Gemini API & Search API keys MUST execute strictly inside Firebase Cloud Functions. Never expose them to the React client bundle.
- **Git Safety:** Ensure `.env`, `serviceAccountKey.json`, and credentials are in `.gitignore`.

## Architecture Rules
- **Stack:** React (Vite/TypeScript) for Frontend, Firebase Cloud Functions (TypeScript) for Backend, Cloud Firestore for Storage.
- **Agent Output:** The discovery agent must return validated JSON matching the defined schema.