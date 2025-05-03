import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AddPropertyStep1 from "@/components/property/add/AddPropertyStep1";
import AddPropertyStep2 from "@/components/property/add/AddPropertyStep2";
import AddPropertyStep3 from "@/components/property/add/AddPropertyStep3";
import AddPropertyStep4 from "@/components/property/add/AddPropertyStep4";
import StepsIndicator from "@/components/property/add/StepsIndicator";
import { CreatePropertyInput, createProperty } from "@/lib/api/properties";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/api/supabaseClient";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github } from "lucide-react";

const Sell = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<CreatePropertyInput>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  useEffect(() => {
    // Check auth state
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin + '/account',
        scopes: 'user:email'
      }
    });

    if (error) {
      toast.error("GitHub login failed: " + error.message);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast.error("Login failed: " + error.message);
    } else {
      setIsAuthDialogOpen(false);
      toast.success("Logged in successfully");
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup initiated with:', { email, password });
  
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      console.log('Using API base URL:', API_BASE_URL);
  
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      console.log('Response status:', response.status);
      
      // Vérifiez d'abord le content-type avant de parser
      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType);
  
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error(text || 'Invalid server response');
      }
  
      const data = await response.json();
      console.log('Response data:', data);
  
      if (!response.ok) {
        console.error('Signup failed:', data);
        throw new Error(data.message || 'Sign up failed');
      }
  
      toast.success("Sign up successful! Please check your email to confirm your account.");
      setAuthMode("login");
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error instanceof Error ? error.message : "Sign up failed");
    }
  };

  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true);
      await createProperty(formData as CreatePropertyInput);
      setFormData({});
      setStep(user ? 1 : 2); // Reset to appropriate step based on auth
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderAuthStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Get Started</h2>
      <p className="text-center text-gray-600">
        {user 
          ? "You're ready to list your property!"
          : "Please sign in or create an account to list your property"}
      </p>
      
      {user ? (
        <div className="space-y-4">
          <p className="text-center">Welcome, {user.email || "User"}!</p>
          <Button 
            className="w-full bg-teal-500 hover:bg-teal-600"
            onClick={() => setStep(2)}
          >
            Continue to Property Details
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full flex gap-2"
            onClick={handleGitHubLogin}
          >
            <Github size={18} />
            Continue with GitHub
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              setAuthMode("login");
              setIsAuthDialogOpen(true);
            }}
          >
            Sign In
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full text-teal-600 hover:text-teal-700"
            onClick={() => {
              setAuthMode("signup");
              setIsAuthDialogOpen(true);
            }}
          >
            Create Account
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-background">
        <section className="relative py-16 bg-estate-800">
          <div className="container text-center text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4">
              Post Your Property Listing
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-slate-200">
              Fill out the information below to create your property listing
            </p>
          </div>
        </section>

        <section className="py-8 bg-white border-b">
          <div className="container">
            <StepsIndicator currentStep={step} />
          </div>
        </section>

        <section className="py-12 bg-slate-50">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <Card className="shadow-md">
                <CardContent className="p-6 md:p-8">
                  {step === 1 && renderAuthStep()}
                  
                  {step === 2 && (
                    <AddPropertyStep1 
                      onBack={user ? () => setStep(1) : undefined}
                      onNext={(data) => {
                        setFormData({ ...formData, ...data });
                        setStep(3);
                      }}
                    />
                  )}
                  
                  {step === 3 && (
                    <AddPropertyStep2
                      onBack={() => setStep(2)}
                      onNext={(data) => {
                        setFormData({ ...formData, ...data });
                        setStep(4);
                      }}
                    />
                  )}
                  
                  {step === 4 && (
                    <AddPropertyStep3
                      onBack={() => setStep(3)}
                      onNext={(data) => {
                        setFormData({ ...formData, ...data });
                        setStep(5);
                      }}
                    />
                  )}
                  
                  {step === 5 && (
                    <AddPropertyStep4
                      onBack={() => setStep(4)}
                      formData={formData}
                      isSubmitting={isSubmitting}
                      onSubmit={handleFinalSubmit}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
      <Footer />

      {/* Auth Dialog */}
      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-estate-800">
              {authMode === "login" ? "Sign In" : "Create an Account"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full flex gap-2"
              onClick={handleGitHubLogin}
            >
              <Github size={18} />
              Continue with GitHub
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or {authMode === "login" ? "sign in" : "sign up"} with email
                </span>
              </div>
            </div>

            <form onSubmit={authMode === "login" ? handleEmailLogin : handleEmailSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600">
                {authMode === "login" ? "Sign In" : "Sign Up"}
              </Button>
            </form>

            <div className="text-center text-sm">
              {authMode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button 
                    type="button" 
                    className="text-teal-600 hover:underline"
                    onClick={() => setAuthMode("signup")}
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button 
                    type="button" 
                    className="text-teal-600 hover:underline"
                    onClick={() => setAuthMode("login")}
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sell;