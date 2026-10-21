import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Loader2, AlertTriangle, CheckCircle, ArrowLeft, File, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const DocumentAnalyzer = () => {
  const [documentText, setDocumentText] = useState("");
  const [language, setLanguage] = useState("English");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Only support text files for now
    if (file.type !== "text/plain") {
      toast({
        title: "Text files supported",
        description: "Please upload a .txt file, or copy and paste your document text directly.",
      });
      return;
    }

    setUploadedFile(file);

    try {
      const extractedText = await file.text();
      setDocumentText(extractedText);
      toast({
        title: "Text extracted",
        description: `Successfully loaded ${file.name}`,
      });
    } catch (error) {
      console.error("Error reading file:", error);
      toast({
        title: "Error reading file",
        description: "Please try pasting the text manually.",
        variant: "destructive",
      });
    }
  };

  const clearFile = () => {
    setUploadedFile(null);
    setDocumentText("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyze = async () => {
    if (!documentText.trim()) {
      toast({
        title: "No content",
        description: "Please paste your document text to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysis("");

    try {
      const { data, error } = await supabase.functions.invoke("analyze-document", {
        body: { documentText, language },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setAnalysis(data.analysis);
      toast({
        title: "Analysis complete",
        description: "Your document has been analyzed successfully.",
      });
    } catch (error) {
      console.error("Error analyzing document:", error);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Failed to analyze document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatAnalysis = (text: string) => {
    return text.split('\n').map((line, index) => {
      // Section headers with bullet symbol
      if (line.startsWith('●')) {
        return (
          <h3 key={index} className="text-lg font-semibold text-primary mt-6 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            {line.replace('●', '').trim()}
          </h3>
        );
      }
      // Bold markdown headers
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h3 key={index} className="text-lg font-semibold text-primary mt-6 mb-3">{line.replace(/\*\*/g, '')}</h3>;
      }
      // Bullet points
      if (line.startsWith('- ') || line.startsWith('• ')) {
        return <li key={index} className="ml-4 text-muted-foreground mb-1">{line.substring(2)}</li>;
      }
      // Numbered lists
      if (line.match(/^\d+\./)) {
        return <li key={index} className="ml-4 text-muted-foreground mb-1 list-decimal">{line.replace(/^\d+\.\s*/, '')}</li>;
      }
      // HIGH risk items
      if (line.includes('HIGH')) {
        return (
          <p key={index} className="flex items-start gap-2 text-destructive mb-2">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{line}</span>
          </p>
        );
      }
      // MEDIUM risk items
      if (line.includes('MEDIUM')) {
        return (
          <p key={index} className="flex items-start gap-2 text-amber-500 mb-2">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{line}</span>
          </p>
        );
      }
      // LOW risk or positive items
      if (line.includes('LOW') || line.includes('✓')) {
        return (
          <p key={index} className="flex items-start gap-2 text-emerald-500 mb-2">
            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{line}</span>
          </p>
        );
      }
      // Regular paragraphs
      if (line.trim()) {
        return <p key={index} className="text-muted-foreground mb-2">{line}</p>;
      }
      return null;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-xl font-serif font-semibold text-foreground">Document Analyzer</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border mb-4">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">AI-Powered Analysis</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Analyze Your <span className="text-gradient-gold">Legal Document</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Paste your document text below. Get a clear summary with 
              key points, risks, and actionable suggestions in plain language.
            </p>
          </div>

          {/* Input Section */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {/* File Upload Area */}
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".txt"
                  className="hidden"
                  id="file-upload"
                />
                
                {uploadedFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <File className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">{uploadedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={clearFile} className="ml-2">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-foreground font-medium mb-1">
                      Upload Text File or Paste Below
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports .txt files • For PDFs, copy and paste the text
                    </p>
                  </label>
                )}
              </div>

              {/* Language & Text Area */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Document Text</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Kannada">Kannada</SelectItem>
                    <SelectItem value="Tamil">Tamil</SelectItem>
                    <SelectItem value="Bengali">Bengali</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Textarea
                placeholder="Paste your legal document text here (rental agreement, contract, notice, etc.)..."
                value={documentText}
                onChange={(e) => setDocumentText(e.target.value)}
                className="min-h-[300px] bg-muted/20 border-border resize-none"
              />

              <Button 
                variant="hero" 
                className="w-full" 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !documentText.trim()}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Document...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Analyze Document
                  </>
                )}
              </Button>
            </div>

            {/* Analysis Result */}
            <div className="p-6 rounded-2xl bg-gradient-card border border-border min-h-[500px] overflow-auto">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2 sticky top-0 bg-card pb-2">
                <FileText className="w-5 h-5 text-primary" />
                Analysis Result
              </h3>
              
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                  <p>Analyzing your document...</p>
                  <p className="text-sm">This may take a moment</p>
                </div>
              ) : analysis ? (
                <div className="prose prose-invert max-w-none text-sm space-y-1">
                  {formatAnalysis(analysis)}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <FileText className="w-10 h-10 mb-4 opacity-50" />
                  <p>Paste your document text</p>
                  <p className="text-sm">to see the AI-powered analysis here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentAnalyzer;
