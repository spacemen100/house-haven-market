import { Link } from "react-router-dom";
import { Menu, X, User, Search, Github } from "lucide-react";
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
import { initiateGitHubLogin, checkGitHubAuth, githubLogout } from "@/lib/auth/githubAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const githubAuth = checkGitHubAuth();
      const email = localStorage.getItem('userEmail') || '';
      
      setIsLoggedIn(!!token || githubAuth);
      setUserEmail(email);
    };
    
    checkAuth();
    
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleGitHubLogin = async () => {
    try {
      await initiateGitHubLogin();
    } catch (error) {
      toast.error("GitHub login failed");
      console.error(error);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userEmail', data.email);
      setIsLoggedIn(true);
      setUserEmail(data.email);
      setIsAuthDialogOpen(false);
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error("Login failed");
      console.error(error);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup initiated with:', { email, password });
  
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://house-haven-market.vercel.app';
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

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    githubLogout();
    setIsLoggedIn(false);
    setUserEmail("");
    toast.success("Logged out successfully");
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
              Buy
            </Link>
            <Link to="/properties?type=rent" className="text-estate-neutral-700 hover:text-estate-800 font-medium">
              Rent
            </Link>
            <Link to="/sell" className="text-estate-neutral-700 hover:text-estate-800 font-medium">
              Sell
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
                  <span>{userEmail || "My Account"}</span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="text-red-500 border-red-500 hover:bg-red-50"
                onClick={handleLogout}
              >
                Logout
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
                    <span>Sign In</span>
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
                  Sign Up
                </Button>
              </Dialog>
              <Button asChild className="bg-teal-500 hover:bg-teal-600">
                <Link to="/sell">Get Started</Link>
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
              Buy
            </Link>
            <Link
              to="/properties?type=rent"
              className="py-2 text-estate-neutral-700 hover:text-estate-800 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Rent
            </Link>
            <Link
              to="/sell"
              className="py-2 text-estate-neutral-700 hover:text-estate-800 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Sell
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
                      <span>{userEmail || "My Account"}</span>
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
                    Logout
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
                    <span>Sign In</span>
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
                    Sign Up
                  </Button>
                  <Button asChild className="bg-teal-500 hover:bg-teal-600">
                    <Link to="/sell" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
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
    </nav>
  );
};

export default Navbar;