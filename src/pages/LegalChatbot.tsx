import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Loader2, ArrowLeft, User, Bot, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const LegalChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Good day! I am your LegalLens Assistant, here to provide professional legal guidance.\n\nI specialize in the following areas of law:\n• Family Law (divorce, custody, marriage)\n• Contract Law (agreements, employment contracts)\n• Property Law (buying/selling, tenant rights)\n• Dispute Resolution (civil disputes, mediation)\n\nHow may I assist you today? Please describe your legal concern, and I shall provide you with structured guidance.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/legal-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [...messages.filter(m => m.role !== "assistant" || messages.indexOf(m) !== 0), userMessage].map(m => ({
              role: m.role,
              content: m.content,
            })),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      // Add empty assistant message to update
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: assistantContent };
                return updated;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response. Please try again.",
        variant: "destructive",
      });
      // Remove the empty assistant message if error
      if (!assistantContent) {
        setMessages((prev) => prev.slice(0, -1));
      }
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, index) => {
      // Section headers with bullet symbol
      if (line.startsWith('●')) {
        return (
          <p key={index} className="font-semibold text-primary mt-4 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {line.replace('●', '').trim()}
          </p>
        );
      }
      // Bold markdown headers
      if (line.startsWith('**') && line.includes(':**')) {
        const [title, ...rest] = line.split(':**');
        return (
          <p key={index} className="mt-3">
            <strong className="text-primary">{title.replace(/\*\*/g, '')}:</strong>
            {rest.join(':**')}
          </p>
        );
      }
      // Bullet points
      if (line.startsWith('- ') || line.startsWith('• ')) {
        return <li key={index} className="ml-4 mb-1">{line.substring(2)}</li>;
      }
      // Numbered lists
      if (line.match(/^\d+\./)) {
        return <li key={index} className="ml-4 list-decimal mb-1">{line.replace(/^\d+\.\s*/, '')}</li>;
      }
      // Regular text
      if (line.trim()) {
        return <p key={index} className="mb-1">{line}</p>;
      }
      return <br key={index} />;
    });
  };

  const suggestedQuestions = [
    "My landlord won't return my security deposit. What can I do?",
    "How do I file for mutual divorce in India?",
    "What documents do I need to verify a property before buying?",
    "My employer terminated me without notice. What are my rights?",
  ];

  const shouldShowLawyerConnect = (content: string) => {
    const keywords = [
      "consult a lawyer",
      "legal professional",
      "seek legal advice",
      "professional legal",
      "legal expert",
      "attorney",
      "advocate",
    ];
    return keywords.some(keyword => content.toLowerCase().includes(keyword));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h1 className="text-lg font-serif font-semibold text-foreground">LegalLens Assistant</h1>
            </div>
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4 pb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div className="flex flex-col max-w-[80%]">
                  <div
                    className={`p-4 rounded-2xl ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 border border-border text-foreground"
                    }`}
                  >
                    <div className="text-sm space-y-1">{formatMessage(message.content)}</div>
                  </div>
                  
                  {/* Connect to Lawyer Button */}
                  {message.role === "assistant" && shouldShowLawyerConnect(message.content) && (
                    <Link 
                      to="/#lawyers"
                      className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary text-sm font-medium hover:bg-primary/20 transition-colors w-fit"
                    >
                      <Users className="w-4 h-4" />
                      Connect to a Lawyer
                    </Link>
                  )}
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-muted/50 border border-border p-4 rounded-2xl">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                </div>
              </div>
            )}
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="mt-6 space-y-3">
              <p className="text-sm text-muted-foreground">Common legal questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(question)}
                    className="px-3 py-2 text-sm bg-muted/50 border border-border rounded-lg hover:border-primary/50 hover:bg-muted transition-colors text-left"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border p-4 bg-background">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              ref={inputRef}
              placeholder="Describe your legal situation or ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-muted/20"
            />
            <Button type="submit" variant="hero" disabled={isLoading || !input.trim()}>
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            This is general legal guidance, not formal legal advice. For complex matters, please consult a qualified lawyer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalChatbot;
