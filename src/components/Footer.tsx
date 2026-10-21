import { Scale, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const footerLinks = {
    Product: ["Features", "Pricing", "Document Analyzer", "AI Chatbot", "Templates"],
    Resources: ["Blog", "Legal Guides", "FAQs", "Tutorials", "Case Studies"],
    Company: ["About Us", "Careers", "Press", "Partners", "Contact"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"],
  };

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="LegalLens" className="h-10 w-auto invert brightness-200" />
              <span className="text-xl font-serif font-semibold text-foreground">LegalLens</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Making legal documents accessible, understandable, and actionable for everyone. 
              Your rights, your clarity.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@legallens.in</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Bangalore, India</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 LegalLens. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Scale className="w-4 h-4 text-primary" />
            <span>Made with care for accessible justice</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
