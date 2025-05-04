
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
import { signInWithEmail, signUpWithEmail } from "@/lib/api/auth";

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

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signInWithEmail(email, password);
    
    if (success) {
      setIsAuthDialogOpen(false);
      toast.success("Connecté avec succès");
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signUpWithEmail(email, password);
    
    if (success) {
      setIsAuthDialogOpen(false);
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
      <h2 className="text-2xl font-bold text-center">Commencer</h2>
      <p className="text-center text-gray-600">
        {user 
          ? "Vous êtes prêt à publier votre propriété!"
          : "Veuillez vous connecter ou créer un compte pour publier votre propriété"}
      </p>
      
      {user ? (
        <div className="space-y-4">
          <p className="text-center">Bienvenue, {user.email || "Utilisateur"}!</p>
          <Button 
            className="w-full bg-teal-500 hover:bg-teal-600"
            onClick={() => setStep(2)}
          >
            Continuer vers les détails de la propriété
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Connectez-vous avec votre email
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
            Se connecter
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full text-teal-600 hover:text-teal-700"
            onClick={() => {
              setAuthMode("signup");
              setIsAuthDialogOpen(true);
            }}
          >
            Créer un compte
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
              Publiez votre annonce immobilière
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-slate-200">
              Remplissez les informations ci-dessous pour créer votre annonce immobilière
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
              {authMode === "login" ? "Connexion" : "Créer un compte"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <form onSubmit={authMode === "login" ? handleEmailLogin : handleEmailSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600">
                {authMode === "login" ? "Se connecter" : "S'inscrire"}
              </Button>
            </form>

            <div className="text-center text-sm">
              {authMode === "login" ? (
                <>
                  Vous n'avez pas de compte ?{" "}
                  <button 
                    type="button" 
                    className="text-teal-600 hover:underline"
                    onClick={() => setAuthMode("signup")}
                  >
                    Inscrivez-vous
                  </button>
                </>
              ) : (
                <>
                  Vous avez déjà un compte ?{" "}
                  <button 
                    type="button" 
                    className="text-teal-600 hover:underline"
                    onClick={() => setAuthMode("login")}
                  >
                    Connectez-vous
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
