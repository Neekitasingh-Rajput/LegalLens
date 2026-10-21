import { Upload, Sparkles, CheckCircle, Users } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Document",
    description: "Simply drag and drop your legal document - contracts, agreements, notices, or any legal paperwork.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI Analysis",
    description: "Our advanced AI processes your document, identifying key clauses, risks, obligations, and important terms.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Get Plain English Summary",
    description: "Receive a clear, jargon-free summary with actionable insights and highlighted areas of concern.",
  },
  {
    number: "04",
    icon: Users,
    title: "Connect with Experts",
    description: "If needed, connect with verified lawyers who specialize in your specific legal matter.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            How <span className="text-gradient-gold">LegalLens</span> Works
          </h2>
          <p className="text-lg text-muted-foreground">
            From confusion to clarity in four simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative group">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
                )}

                {/* Step Card */}
                <div className="relative">
                  {/* Number Badge */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center font-bold text-primary-foreground text-sm shadow-gold z-10">
                    {step.number}
                  </div>

                  {/* Card */}
                  <div className="pt-8 pb-6 px-6 rounded-2xl bg-gradient-card border border-border group-hover:border-primary/30 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
