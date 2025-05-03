import { Link } from "react-router-dom";
import { Menu, X, User, Search, Github } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      setIsLoggedIn(true);
      setIsLoginOpen(false);
      toast.success("Logged in successfully");
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setIsLoggedIn(false);
      toast.success("Logged out successfully");
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
                  <span>My Account</span>
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
              <Button 
                variant="outline" 
                className="flex gap-2"
                onClick={() => setIsLoginOpen(true)}
              >
                <User size={18} />
                <span>Sign In</span>
              </Button>
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
                      <span>My Account</span>
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
                      setIsLoginOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <User size={18} />
                    <span>Sign In</span>
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

      {/* Login Modal */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-estate-800">
              Sign In
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
                  Or sign in with email
                </span>
              </div>
            </div>

            <form onSubmit={handleEmailLogin} className="space-y-4">
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
                Sign In
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;