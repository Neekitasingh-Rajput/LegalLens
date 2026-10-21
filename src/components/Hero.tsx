import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, Scale } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 border border-primary/20 rounded-full" />
        <div className="absolute bottom-20 right-10 w-64 h-64 border border-primary/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/10 rounded-full" />
      </div>

      {/* Glowing Orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <Scale className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Legal Assistance</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Your Rights,{" "}
            <span className="text-gradient-gold">Your Clarity</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            Transform complex legal documents into plain English. Get AI-powered guidance, 
            understand your rights, and connect with verified lawyers when you need them.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Link to="/analyze">
              <Button variant="hero" size="xl">
                <FileText className="w-5 h-5" />
                Analyze Document
              </Button>
            </Link>
            <Link to="/chat">
              <Button variant="heroOutline" size="xl">
                <MessageSquare className="w-5 h-5" />
                Chat with AI
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-bold text-gradient-gold">50K+</div>
              <div className="text-sm text-muted-foreground mt-1">Documents Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-bold text-gradient-gold">1000+</div>
              <div className="text-sm text-muted-foreground mt-1">Verified Lawyers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-bold text-gradient-gold">10+</div>
              <div className="text-sm text-muted-foreground mt-1">Languages Supported</div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute left-4 md:left-20 top-1/3 hidden lg:block animate-float">
          <div className="w-16 h-16 rounded-xl bg-gradient-card border border-border flex items-center justify-center shadow-card">
            <FileText className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="absolute right-4 md:right-20 top-1/2 hidden lg:block animate-float" style={{ animationDelay: "1s" }}>
          <div className="w-16 h-16 rounded-xl bg-gradient-card border border-border flex items-center justify-center shadow-card">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
