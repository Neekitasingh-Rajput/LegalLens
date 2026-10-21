import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scale, Mail, Lock, User, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              name,
            },
          },
        });
        if (error) throw error;
        toast({
          title: "Account created!",
          description: "Welcome to LegalLens. You are now logged in.",
        });
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      let message = "An error occurred. Please try again.";
      if (error.message.includes("Invalid login credentials")) {
        message = "Invalid email or password.";
      } else if (error.message.includes("User already registered")) {
        message = "This email is already registered. Please login instead.";
      } else if (error.message.includes("Password should be")) {
        message = "Password should be at least 6 characters.";
      }
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>

        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <img src={logo} alt="LegalLens" className="h-12 w-12 object-contain" />
            <span className="text-2xl font-serif font-bold text-foreground">LegalLens</span>
          </div>

          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isLogin
              ? "Enter your credentials to access your account"
              : "Start your journey to understanding your legal rights"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {isLogin ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                <>{isLogin ? "Sign In" : "Create Account"}</>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-hero items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 border border-primary/20 rounded-full" />
          <div className="absolute bottom-20 right-10 w-64 h-64 border border-primary/20 rounded-full" />
        </div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-primary/10 blur-[100px] rounded-full" />
        
        <div className="text-center relative z-10 px-12">
          <Scale className="w-24 h-24 text-primary mx-auto mb-8" />
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            Your Rights, <span className="text-gradient-gold">Your Clarity</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md">
            Transform complex legal documents into plain English with AI-powered analysis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
