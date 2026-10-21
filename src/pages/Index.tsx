import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import DocumentUpload from "@/components/DocumentUpload";
import LawyerConnect from "@/components/LawyerConnect";
import Templates from "@/components/Templates";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <DocumentUpload />
      <LawyerConnect />
      <Templates />
      <Footer />
    </div>
  );
};

export default Index;
