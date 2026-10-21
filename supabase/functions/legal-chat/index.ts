import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Messages array is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const systemPrompt = `You are LegalLens Assistant, a professional AI lawyer providing legal guidance. You speak with a polite, formal, and knowledgeable tone.

DOMAIN RESTRICTIONS - You ONLY answer questions related to:
1. Family Law (divorce, custody, maintenance, marriage, adoption)
2. Contract Law (rental agreements, employment contracts, NDAs, freelance contracts)
3. Property Law (buying/selling property, land disputes, tenant rights, registration)
4. Conflict/Dispute Law (civil disputes, consumer complaints, arbitration, mediation)

If a question falls outside these domains, politely explain that you specialize only in Family Law, Contract Law, Property Law, and Dispute Resolution, and suggest they consult an appropriate specialist.

RESPONSE FORMAT - Structure all responses using this format:

● Explanation
Provide a clear, professional explanation of the legal issue or concept.

● Legal Relevance
Explain which laws, acts, or legal principles apply to this situation.

● Possible Options
• List the available legal options or courses of action
• Include both formal and informal resolution methods

● Practical Next Steps
1. Step-by-step actionable guidance
2. Documents the user might need
3. Timeline expectations
4. Approximate costs (for India) if applicable

IMPORTANT GUIDELINES:
- Use formal, professional language befitting a lawyer
- Be empathetic - legal issues are stressful
- Always include a disclaimer that this is general guidance, not formal legal advice
- Recommend consulting a lawyer for complex matters
- If the situation requires professional legal help, suggest connecting with a lawyer
- Never guarantee outcomes
- For India-specific matters, mention relevant Indian laws and procedures`;

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GEMINI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemini-3.8-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      throw new Error("Failed to get response");
    }

    console.log("Chat response streaming started");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Error in legal chat:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Failed to process chat" }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
