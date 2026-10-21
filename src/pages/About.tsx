import { ArrowLeft, Scale, Eye, Users, Globe, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const About = () => {
  const values = [
    {
      icon: Eye,
      title: "Clarity",
      description: "Transforming complex legal jargon into simple, understandable language.",
    },
    {
      icon: Users,
      title: "Accessibility",
      description: "Making legal knowledge available to everyone, regardless of background.",
    },
    {
      icon: Globe,
      title: "Inclusivity",
      description: "Supporting multiple languages to reach diverse communities across India.",
    },
    {
      icon: Shield,
      title: "Trust",
      description: "Connecting users with verified legal professionals when needed.",
    },
    {
      icon: Zap,
      title: "Speed",
      description: "Providing instant AI-powered analysis to save time and reduce anxiety.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <img src={logo} alt="LegalLens" className="h-8 w-auto invert brightness-200" />
              <span className="font-serif font-semibold text-foreground">LegalLens</span>
            </div>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border mb-6">
            <Scale className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">About Us</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
            Making Law <span className="text-gradient-gold">Accessible</span> to Everyone
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            LegalLens is an AI-powered legal assistance platform built to make the law 
            understandable, accessible, and actionable for everyone.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* The Problem */}
          <div className="p-8 rounded-2xl bg-gradient-card border border-border">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">The Problem We Solve</h2>
            <p className="text-muted-foreground leading-relaxed">
              Legal documents are everywhere — rental agreements, employment contracts, policies, 
              notices — but the language they use often creates confusion instead of clarity. 
              People struggle to understand what they're signing, miss important clauses, and 
              feel intimidated by legal jargon.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              LegalLens exists to change that. We transform complex legal documents into clear, 
              plain-English explanations, highlight important clauses and risks, and guide users 
              toward the right next steps — whether that means understanding their rights or 
              connecting with a verified legal professional.
            </p>
          </div>

          {/* Our Vision */}
          <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Our Vision</h2>
            <p className="text-xl text-primary font-medium mb-4">
              We believe legal clarity should not be a privilege.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              LegalLens aims to democratize legal understanding by removing jargon, delays, and 
              barriers to legal knowledge. Our vision is a future where every individual can 
              confidently read, understand, and act on legal documents without fear or uncertainty.
            </p>
            <p className="text-lg font-serif text-foreground mt-6">
              Simple. Fast. Accessible law for all.
            </p>
          </div>

          {/* Our Values */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-6">
              Ready to experience accessible legal assistance?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/analyze"
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Try Document Analyzer
              </Link>
              <Link
                to="/chat"
                className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
              >
                Chat with AI
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
