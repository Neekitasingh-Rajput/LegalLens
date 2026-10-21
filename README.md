# LegalLens

LegalLens is a web app that turns complex legal documents into plain-English guidance. It analyzes uploaded documents for key terms and red flags, and offers an AI legal assistant chatbot scoped to family, contract, property, and dispute law.

## Tech stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) components
- [React Router](https://reactrouter.com/) for routing, [TanStack Query](https://tanstack.com/query) for data fetching
- [Supabase](https://supabase.com/) for auth, database, and edge functions
- [Google Gemini API](https://ai.google.dev/) for document analysis and chat, called from two Supabase edge functions

## Project structure

```
src/
  components/       Shared UI components (Navbar, Hero, Features, etc.) and shadcn/ui primitives
  pages/            Route-level pages (Index, Auth, DocumentAnalyzer, LegalChatbot, About)
  integrations/     Supabase client and generated types
supabase/
  functions/
    analyze-document/  Edge function that sends a document to Gemini and returns a structured analysis
    legal-chat/         Edge function that streams a chat response from Gemini
```

## Getting started

**Requirements:** Node.js & npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm i

# Start the dev server
npm run dev
```

### Environment variables

Create a `.env` file in the project root (see `.env` for the Supabase values already used by this project):

```
VITE_SUPABASE_URL="your-supabase-project-url"
VITE_SUPABASE_PUBLISHABLE_KEY="your-supabase-anon-key"
VITE_SUPABASE_PROJECT_ID="your-supabase-project-id"
```

### Supabase edge functions

The document analyzer and chatbot are powered by two Supabase edge functions (`supabase/functions/analyze-document` and `supabase/functions/legal-chat`), which call the Gemini API directly. Each needs a `GEMINI_API_KEY` set as a secret in your Supabase project (Project Settings → Edge Functions → Secrets, or via the CLI):

```sh
supabase secrets set GEMINI_API_KEY=your-gemini-api-key
```

You can get a free Gemini API key with no credit card required at [Google AI Studio](https://aistudio.google.com/apikey).

Deploy the functions with the Supabase CLI:

```sh
supabase functions deploy analyze-document
supabase functions deploy legal-chat
```

## Building for production

```sh
npm run build
```

## Deployment

This is a standard Vite + React app — it can be deployed to any static host (Vercel, Netlify, Cloudflare Pages, etc.) as long as the Supabase edge functions are deployed separately via the Supabase CLI and the `GEMINI_API_KEY` secret is configured.
