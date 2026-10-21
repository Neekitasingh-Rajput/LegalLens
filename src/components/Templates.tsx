import { Button } from "@/components/ui/button";
import { FileSignature, Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const templates = [
  {
    name: "Rental Agreement",
    description: "Standard residential rental agreement template with all essential clauses.",
    downloads: "12.5K",
    category: "Property",
    file: "/templates/rental-agreement.docx",
  },
  {
    name: "Non-Disclosure Agreement",
    description: "Protect your confidential information with this customizable NDA template.",
    downloads: "8.2K",
    category: "Business",
    file: "/templates/nda-agreement.docx",
  },
  {
    name: "Freelance Contract",
    description: "Professional service agreement for freelancers and independent contractors.",
    downloads: "6.8K",
    category: "Employment",
    file: "/templates/freelance-contract.docx",
  },
  {
    name: "Sale Agreement",
    description: "Comprehensive property sale agreement template for buyers and sellers.",
    downloads: "5.4K",
    category: "Property",
    file: "/templates/sale-agreement.docx",
  },
  {
    name: "Partnership Deed",
    description: "Legal framework for business partnerships with profit-sharing terms.",
    downloads: "4.1K",
    category: "Business",
    file: "/templates/partnership-deed.docx",
  },
  {
    name: "Employment Contract",
    description: "Standard employment agreement covering all essential terms and conditions.",
    downloads: "9.3K",
    category: "Employment",
    file: "/templates/employment-contract.docx",
  },
];

const Templates = () => {
  const { toast } = useToast();

  const handleDownload = (template: typeof templates[0]) => {
    // Create a download link
    const link = document.createElement("a");
    link.href = template.file;
    link.download = `${template.name.toLowerCase().replace(/\s+/g, "-")}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download Started",
      description: `${template.name} template is being downloaded.`,
    });
  };

  const handlePreview = (template: typeof templates[0]) => {
    // Open in new tab for preview
    window.open(template.file, "_blank");
  };

  return (
    <section id="templates" className="py-24 bg-background relative">
      {/* Background */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Legal <span className="text-gradient-gold">Templates</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Start with professionally drafted templates. Customize them to your needs 
            with our simple question-and-answer process.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {templates.map((template) => (
            <div
              key={template.name}
              className="p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-300 group"
            >
              {/* Icon and Category */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <FileSignature className="w-6 h-6 text-primary" />
                </div>
                <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                  {template.category}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-lg font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {template.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {template.description}
              </p>

              {/* Stats and Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <button
                  onClick={() => handleDownload(template)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Download className="w-4 h-4" />
                  {template.downloads} downloads
                </button>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handlePreview(template)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => handleDownload(template)}
                  >
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Templates;
