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
    const { documentText, language = 'English' } = await req.json();
    
    if (!documentText || documentText.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'Document text is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const systemPrompt = `You are an expert legal document analyzer. Your job is to analyze legal documents and provide clear, actionable insights in ${language}. 

IMPORTANT: Do NOT dump the entire document content back. Focus only on what matters to the reader.

When analyzing a document, provide your response in the following EXACT format with these sections:

● Summary
Write 2-3 sentences in plain, everyday language explaining what this document is about and its main purpose.

● Key Points
• List the most important terms and conditions (4-6 bullet points)
• Include payment terms, duration, parties involved
• Highlight key obligations of each party

● Risks / Red Flags
• List any concerning clauses or terms (mark as HIGH, MEDIUM, or LOW risk)
• Identify unfair terms or one-sided clauses
• Note any missing important protections
• Highlight ambiguous or vague language

● Suggestions
• What to be careful about before signing
• What to clarify with the other party
• Which clauses may significantly impact the reader
• Recommended next steps

Keep your language simple - avoid legal jargon. A non-lawyer should easily understand your analysis. Be concise but thorough.`;

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
          { role: "user", content: `Please analyze the following legal document:\n\n${documentText}` }
        ],
        max_tokens: 1200,
        stream: false,
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

      throw new Error("Failed to analyze document");
    }

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content || "Unable to analyze document";

    console.log("Document analyzed successfully");

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error analyzing document:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Failed to analyze document" }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
