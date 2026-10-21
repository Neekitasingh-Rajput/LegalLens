import { Button } from "@/components/ui/button";
import { Star, MapPin, Briefcase, MessageSquare, Calendar } from "lucide-react";

const lawyers = [
  {
    name: "Adv. Priya Sharma",
    specialty: "Family Law",
    location: "Mumbai",
    rating: 4.9,
    reviews: 128,
    experience: "12 years",
    languages: ["English", "Hindi", "Marathi"],
  },
  {
    name: "Adv. Rajesh Kumar",
    specialty: "Property Law",
    location: "Delhi",
    rating: 4.8,
    reviews: 95,
    experience: "15 years",
    languages: ["English", "Hindi", "Punjabi"],
  },
  {
    name: "Adv. Sneha Reddy",
    specialty: "Contract Law",
    location: "Bangalore",
    rating: 4.9,
    reviews: 156,
    experience: "10 years",
    languages: ["English", "Kannada", "Telugu"],
  },
];

const LawyerConnect = () => {
  return (
    <section id="lawyers" className="py-24 bg-secondary/30 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Connect with <span className="text-gradient-gold">Verified Lawyers</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            When you need professional legal advice, connect with our network of 
            verified and rated lawyers across India.
          </p>
        </div>

        {/* Lawyers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {lawyers.map((lawyer) => (
            <div
              key={lawyer.name}
              className="p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-300 group"
            >
              {/* Avatar and Info */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground font-serif font-bold text-xl">
                  {lawyer.name.split(" ")[1][0]}
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-foreground group-hover:text-primary transition-colors">
                    {lawyer.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Briefcase className="w-3 h-3" />
                    <span>{lawyer.specialty}</span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{lawyer.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{lawyer.experience} experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <span className="text-foreground font-medium">{lawyer.rating}</span>
                  <span className="text-muted-foreground">({lawyer.reviews} reviews)</span>
                </div>
              </div>

              {/* Languages */}
              <div className="flex flex-wrap gap-2 mb-5">
                {lawyer.languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground"
                  >
                    {lang}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="hero" size="sm" className="flex-1">
                  <Calendar className="w-4 h-4" />
                  Book
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="heroOutline" size="lg">
            View All Lawyers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LawyerConnect;
