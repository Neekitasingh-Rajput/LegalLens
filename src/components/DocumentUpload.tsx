import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const DocumentUpload = () => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Upload Area */}
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Analyze Any Legal Document <span className="text-gradient-gold">Instantly</span>
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Upload your contract, agreement, or legal notice and get a comprehensive 
              analysis in seconds. No legal expertise required.
            </p>

            {/* Upload Zone */}
            <div
              className={`relative p-8 rounded-2xl border-2 border-dashed transition-all duration-300 ${
                isDragging 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50 bg-muted/20"
              }`}
              onDragEnter={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => setIsDragging(false)}
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Drop your document here
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  or click to browse from your device
                </p>
                <Link to="/analyze">
                  <Button variant="hero">
                    Analyze Document
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground mt-4">
                  Supports PDF, DOCX, TXT • Max 10MB
                </p>
              </div>
            </div>

            {/* Supported Documents */}
            <div className="mt-8 flex flex-wrap gap-3">
              {["Contracts", "Property Deeds", "Agreements", "Notices", "Wills"].map((type) => (
                <span
                  key={type}
                  className="px-3 py-1 rounded-full bg-muted/50 text-muted-foreground text-sm border border-border"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Preview Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full" />
            <div className="relative p-6 rounded-2xl bg-gradient-card border border-border shadow-card">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">rental_agreement_2024.pdf</h4>
                  <p className="text-xs text-muted-foreground">Analyzed 2 minutes ago</p>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-medium text-foreground mb-2">Summary</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This is a 12-month residential rental agreement between landlord 
                    and tenant with a monthly rent of ₹25,000 and a security deposit 
                    of ₹50,000.
                  </p>
                </div>

                {/* Risk Flags */}
                <div>
                  <h5 className="text-sm font-medium text-foreground mb-2">Risk Analysis</h5>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 p-2 rounded-lg bg-destructive/10 border border-destructive/20">
                      <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
                      <span className="text-sm text-destructive">No clause for security deposit refund timeline</span>
                    </div>
                    <div className="flex items-start gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <Clock className="w-4 h-4 text-amber-500 mt-0.5" />
                      <span className="text-sm text-amber-500">Lock-in period of 11 months is standard</span>
                    </div>
                    <div className="flex items-start gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                      <span className="text-sm text-emerald-500">Maintenance responsibilities clearly defined</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentUpload;
