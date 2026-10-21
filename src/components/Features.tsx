import { 
  FileText, 
  MessageSquare, 
  Users, 
  ListChecks, 
  AlertTriangle, 
  Globe, 
  FileSignature,
  History,
  BookOpen
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "AI Document Summarizer",
    description: "Upload contracts, deeds, or agreements. Get plain-language summaries with key risks, important clauses, and obligations highlighted.",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: MessageSquare,
    title: "AI Legal Chatbot",
    description: "Describe your legal issue in simple words. Get actionable solutions, step-by-step guides, and know when to consult a lawyer.",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    icon: Users,
    title: "Lawyer Connect",
    description: "Connect with verified lawyers filtered by specialty, language, and ratings. Book consultations directly through the platform.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: ListChecks,
    title: "Smart Legal Workflows",
    description: "Automated step-by-step guides for rental issues, divorce filing, property verification, and more with timelines and costs.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: AlertTriangle,
    title: "Clause Risk Detector",
    description: "Scan contracts to flag unfair clauses, missing sections, high-risk terms, and ambiguous wording before you sign.",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Access summaries and explanations in English, Hindi, Kannada, Tamil, Bengali, and more regional languages.",
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    icon: FileSignature,
    title: "Document Templates",
    description: "Safe, customizable templates for rental agreements, NDAs, freelance contracts, sale agreements, and partnership deeds.",
    gradient: "from-orange-500 to-red-600",
  },
  {
    icon: History,
    title: "Upload History",
    description: "Access all your previously analyzed documents anytime. Track your legal document history and revisit past analyses.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: BookOpen,
    title: "Legal Knowledge Base",
    description: "Browse our comprehensive library of legal guides, FAQs, and educational content to understand your rights better.",
    gradient: "from-pink-500 to-rose-600",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-background relative">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/3 blur-[150px] rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Everything You Need to{" "}
            <span className="text-gradient-gold">Understand Law</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful AI tools designed to make legal documents accessible, understandable, 
            and actionable for everyone.
          </p>
        </div>

        {/* Features Grid - 3x3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-glow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-5`}>
                <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
