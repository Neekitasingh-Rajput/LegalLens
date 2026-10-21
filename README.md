# ⚖️ LegalLens

**Making legal documents easier to understand, one clause at a time.**

LegalLens is an AI-powered legal assistance web application that helps users understand complex legal documents and explore common legal questions through accessible, structured guidance.

The platform combines a document analyzer that highlights key terms and potential red flags with an AI legal chatbot focused on family law, contract law, property law, and dispute resolution.

🌐 **Live Demo:** [LegalLens on Render](https://legallens-ca7d.onrender.com)  
💻 **GitHub Repository:** [Neekitasingh-Rajput/LegalLens](https://github.com/Neekitasingh-Rajput/LegalLens)

---

## ✨ Features

### 📄 AI-Powered Document Analysis
- Summarizes legal documents in plain, understandable language.
- Extracts important terms, obligations, payment conditions, and duration.
- Highlights potential risks, ambiguous clauses, and missing protections.
- Provides practical suggestions and questions to clarify before signing.
- Supports analysis in a selected language.

### 💬 Legal Assistant Chatbot
- Provides structured responses to legal questions.
- Focuses on family, contract, property, and civil dispute-related matters.
- Organizes guidance into explanations, legal relevance, possible options, and practical next steps.
- Uses a conversational interface powered by Google's Gemini API.

### 📚 Legal Document Templates
- Provides access to sample legal document templates.
- Includes rental agreements, employment contracts, freelance contracts, NDA agreements, partnership deeds, and sale agreements.

### 🎨 Modern Web Interface
- Responsive interface built with React and TypeScript.
- Reusable UI components and client-side routing.
- Dedicated pages for document analysis, legal chat, and project information.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui |
| Routing | React Router |
| Data Fetching | TanStack Query |
| Backend | Supabase Edge Functions |
| AI Integration | Google Gemini API |
| Language Runtime | Deno for Edge Functions |
| Deployment | Render (frontend), Supabase (backend functions) |

---

## 🏗️ Architecture

LegalLens separates its frontend from its AI processing layer.

1. **User interface:** The React application collects user questions or document text.
2. **Supabase Edge Functions:** Requests are sent to the appropriate server-side function.
3. **Gemini API:** The functions send prompts and input content to Google's Gemini API.
4. **Response processing:** The chatbot returns a streamed response, while document analysis returns a structured analysis.
5. **Frontend display:** The result is presented through the LegalLens interface.

```text
                 ┌─────────────────────┐
                 │   React + Vite UI   │
                 └──────────┬──────────┘
                            │
               ┌────────────┴────────────┐
               │                         │
       ┌───────▼────────┐       ┌────────▼────────┐
       │   Legal Chat   │       │ Document Analyzer│
       └───────┬────────┘       └────────┬────────┘
               │                         │
               └────────────┬────────────┘
                            │
                 ┌──────────▼──────────┐
                 │ Supabase Edge       │
                 │ Functions           │
                 └──────────┬──────────┘
                            │
                 ┌──────────▼──────────┐
                 │   Google Gemini API │
                 └─────────────────────┘
```

---

## 📁 Project Structure

```text
LegalLens/
├── public/
│   └── templates/             # Sample legal document templates
├── src/
│   ├── components/            # Shared UI components
│   ├── hooks/                 # Custom React hooks
│   ├── integrations/
│   │   └── supabase/          # Supabase client and types
│   ├── lib/                   # Utility functions
│   ├── pages/                 # Application pages
│   ├── App.tsx                # Application routes and layout
│   └── main.tsx               # Frontend entry point
├── supabase/
│   ├── functions/
│   │   ├── analyze-document/
│   │   │   └── index.ts       # Document analysis function
│   │   └── legal-chat/
│   │       └── index.ts       # Chatbot function
│   └── config.toml
├── .gitignore
├── package.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm
- A [Supabase](https://supabase.com/) account
- A [Google Gemini API key](https://aistudio.google.com/apikey)
- [Supabase CLI](https://supabase.com/docs/guides/cli) for deploying backend functions

### 1. Clone the repository

```bash
git clone https://github.com/Neekitasingh-Rajput/LegalLens.git
cd LegalLens
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Configure frontend environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
VITE_SUPABASE_PROJECT_ID=your-supabase-project-id
```

Replace the placeholders with the corresponding values from your Supabase project.

**Security note:** Frontend variables prefixed with `VITE_` are exposed to the browser. Never store private API keys, database passwords, or Supabase service-role keys in these variables.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### 5. Build for production

```bash
npm run build
```

To run the project locally, the frontend must be configured with the correct Supabase project details. AI functionality additionally requires the Edge Functions to be deployed and the Gemini secret to be configured.

---

## 🔐 Supabase Backend Setup

LegalLens uses two Supabase Edge Functions:

| Function | Purpose |
|---|---|
| `legal-chat` | Sends legal questions to Gemini and streams the response |
| `analyze-document` | Sends document text to Gemini and returns a structured analysis |

### Configure the Gemini API key

In your Supabase dashboard, open **Edge Functions → Secrets** and create the following secret:

```text
Name: GEMINI_API_KEY
Value: your-actual-gemini-api-key
```

Alternatively, configure the secret using the Supabase CLI:

```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_ID
npx supabase secrets set GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Replace the placeholders locally. Never commit the actual key to GitHub.

### Deploy the Edge Functions

```bash
npx supabase functions deploy legal-chat
npx supabase functions deploy analyze-document
```

Both functions must be deployed to the same Supabase project configured in the frontend.

---

## 🌍 Deployment

### Frontend: Render

LegalLens is deployed as a static Vite application.

- **Live URL:** [https://legallens-ca7d.onrender.com](https://legallens-ca7d.onrender.com)
- **Build command:** `npm ci && npm run build`
- **Publish directory:** `dist`

Configure the frontend environment variables in the Render dashboard. If client-side routes return 404 errors on refresh, configure a rewrite from `/*` to `/index.html` with status `200`.

### Backend: Supabase

The AI backend is hosted separately through Supabase Edge Functions. Configure `GEMINI_API_KEY` in Supabase Secrets and redeploy functions whenever their source code changes.

---

## 🔒 Security Considerations

- Keep private API keys and credentials out of source control.
- Store the Gemini API key as a Supabase Edge Function secret.
- Use appropriate Supabase authentication and Row Level Security policies for any protected database resources.
- Validate inputs and consider request size limits and API usage quotas.
- Do not treat AI-generated legal analysis as verified legal advice.

---

## ⚠️ Legal Disclaimer

LegalLens is an informational tool intended to help users understand legal documents and explore general legal concepts. Its AI-generated responses may be incomplete, inaccurate, or unsuitable for a particular situation.

The application does not replace a qualified lawyer, establish an attorney-client relationship, or guarantee legal outcomes. Users should verify applicable laws and consult a qualified legal professional before making important legal decisions.

---

## 🛣️ Future Improvements

Potential areas for further development include:

- Document export and downloadable analysis reports.
- Improved handling of large documents.
- More comprehensive language support.
- Document version comparison and clause-level explanations.
- Enhanced validation, error handling, and automated testing.

---

## 👩‍💻 Author

**Neekitasingh Rajput** 

And Teammates- Kaustav Banerjee, Tanvi Khatri, Shibangi Chowdhury, Aryaveer Singh Dabbas


[GitHub](https://github.com/Neekitasingh-Rajput)

---

*Built to make legal information more accessible and easier to navigate.*
