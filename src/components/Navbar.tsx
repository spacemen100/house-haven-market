
import { Link } from "react-router-dom";
import { Menu, X, User, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { signInWithEmail, signUpWithEmail, signOut } from "@/lib/api/auth";
import { supabase } from "@/lib/api/supabaseClient";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Check auth state
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
      setUserEmail(user?.email || "");
    };
    
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session?.user);
      setUserEmail(session?.user?.email || "");
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

  const handleLogout = async () => {
    const success = await signOut();
    if (success) {
      toast.success("Déconnecté avec succès");
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-estate-800 text-2xl font-serif font-bold">House<span className="text-teal-500">Haven</span></div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-8">
            <Link to="/properties?type=sale" className="text-estate-neutral-700 hover:text-estate-800 font-medium">
              Acheter
            </Link>
            <Link to="/properties?type=rent" className="text-estate-neutral-700 hover:text-estate-800 font-medium">
              Louer
            </Link>
            <Link to="/sell" className="text-estate-neutral-700 hover:text-estate-800 font-medium">
              Vendre
            </Link>
            <Link to="/agents" className="text-estate-neutral-700 hover:text-estate-800 font-medium">
              Agents
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Button asChild variant="outline" className="flex gap-2">
                <Link to="/account">
                  <User size={18} />
                  <span>{userEmail || "Mon compte"}</span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="text-red-500 border-red-500 hover:bg-red-50"
                onClick={handleLogout}
              >
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="flex gap-2"
                    onClick={() => setAuthMode("login")}
                  >
                    <User size={18} />
                    <span>Connexion</span>
                  </Button>
                </DialogTrigger>
                <Button 
                  variant="ghost" 
                  className="text-teal-600 hover:text-teal-700"
                  onClick={() => {
                    setIsAuthDialogOpen(true);
                    setAuthMode("signup");
                  }}
                >
                  Inscription
                </Button>
              </Dialog>
              <Button asChild className="bg-teal-500 hover:bg-teal-600">
                <Link to="/sell">Commencer</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-estate-800"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 shadow-lg animate-fade-in">
          <div className="flex flex-col gap-4">
            <Link
              to="/properties?type=sale"
              className="py-2 text-estate-neutral-700 hover:text-estate-800 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Acheter
            </Link>
            <Link
              to="/properties?type=rent"
              className="py-2 text-estate-neutral-700 hover:text-estate-800 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Louer
            </Link>
            <Link
              to="/sell"
              className="py-2 text-estate-neutral-700 hover:text-estate-800 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Vendre
            </Link>
            <Link
              to="/agents"
              className="py-2 text-estate-neutral-700 hover:text-estate-800 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Agents
            </Link>
            <hr className="my-2" />
            <div className="flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Button asChild variant="outline" className="flex gap-2 justify-center">
                    <Link to="/account" onClick={() => setIsMenuOpen(false)}>
                      <User size={18} />
                      <span>{userEmail || "Mon compte"}</span>
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-red-500 border-red-500 hover:bg-red-50"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="flex gap-2 justify-center" 
                    onClick={() => {
                      setIsAuthDialogOpen(true);
                      setAuthMode("login");
                      setIsMenuOpen(false);
                    }}
                  >
                    <User size={18} />
                    <span>Connexion</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="text-teal-600 hover:text-teal-700"
                    onClick={() => {
                      setIsAuthDialogOpen(true);
                      setAuthMode("signup");
                      setIsMenuOpen(false);
                    }}
                  >
                    Inscription
                  </Button>
                  <Button asChild className="bg-teal-500 hover:bg-teal-600">
                    <Link to="/sell" onClick={() => setIsMenuOpen(false)}>Commencer</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

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
    </nav>
  );
};

export default Navbar;
