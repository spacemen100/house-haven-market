import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, ChevronDown, Home, Key, Users, CalendarDays, LogIn, LogOut, UserPlus, PlusCircle, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { signInWithEmail, signUpWithEmail, signOut } from '@/lib/api/auth';
import { supabase } from '@/lib/api/supabaseClient';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    address: '',
    instagram: '',
    twitter: '',
    facebook: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
      setUserEmail(user?.email || '');
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session?.user);
      setUserEmail(session?.user?.email || '');
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signInWithEmail(formData.email, formData.password);

    if (success) {
      setIsAuthDialogOpen(false);
      resetForm();
      toast.success('Connecté avec succès');
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, ...profileData } = formData;
    const success = await signUpWithEmail(email, password, profileData);

    if (success) {
      setIsAuthDialogOpen(false);
      resetForm();
      toast.success('Compte créé avec succès !');
    }
  };

  const handleLogout = async () => {
    const success = await signOut();
    if (success) {
      toast.success('Déconnecté avec succès');
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      phone: '',
      address: '',
      instagram: '',
      twitter: '',
      facebook: ''
    });
  };

  const toggleAuthMode = () => {
    setAuthMode(prev => prev === 'login' ? 'signup' : 'login');
    resetForm();
  };

  const handleNavigationWithFilter = (type: string) => {
    navigate(`/properties?type=${type}`);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container py-3 flex items-center justify-between">
        {/* Logo et nom du site */}
        <Link to="/" className="flex flex-col items-start">
          <div className="text-estate-800 font-serif font-bold flex flex-col">
            <div className="text-2xl leading-tight">Annonces Immobilières</div>
            <div className="text-lg text-teal-600 leading-tight">Région Lyonnaise</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-6">
            <button
              onClick={() => handleNavigationWithFilter('sell')}
              className="text-estate-neutral-700 hover:text-estate-800 font-medium flex items-center gap-2"
            >
              <Home size={18} />
              Vendre
            </button>
            <button
              onClick={() => handleNavigationWithFilter('lease')}
              className="text-estate-neutral-700 hover:text-estate-800 font-medium flex items-center gap-2"
            >
              <Key size={18} />
              Bail Commercial
            </button>
            <button
              onClick={() => handleNavigationWithFilter('rent')}
              className="text-estate-neutral-700 hover:text-estate-800 font-medium flex items-center gap-2"
            >
              <Users size={18} />
              Louer
            </button>
            <button
              onClick={() => handleNavigationWithFilter('daily-rent')}
              className="text-estate-neutral-700 hover:text-estate-800 font-medium flex items-center gap-2"
            >
              <CalendarDays size={18} />
              Location Journalière
            </button>
            <Link
              to="/moving-services"
              className="text-estate-neutral-700 hover:text-estate-800 font-medium flex items-center gap-2"
            >
              <Truck size={18} />
              Services de déménagement
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Button asChild variant="outline" className="flex gap-2">
                <Link to="/account">
                  <User size={18} />
                  <span>{userEmail || 'Mon Compte'}</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="text-red-500 border-red-500 hover:bg-red-50 flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => setAuthMode('login')}
                  >
                    <LogIn size={18} />
                    <span>Connexion</span>
                  </Button>
                </DialogTrigger>
                <Button
                  variant="ghost"
                  className="text-teal-600 hover:text-teal-700 flex items-center gap-2"
                  onClick={() => {
                    setIsAuthDialogOpen(true);
                    setAuthMode('signup');
                  }}
                >
                  <UserPlus size={18} />
                  S'inscrire
                </Button>
              </Dialog>
            </>
          )}
          <Button asChild className="bg-teal-500 hover:bg-teal-600 flex items-center gap-2">
            <Link to="/sell">
              <PlusCircle size={18} />
              Publier une annonce
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-estate-800"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 shadow-lg animate-fade-in">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                handleNavigationWithFilter('sell');
                setIsMenuOpen(false);
              }}
              className="py-2 text-estate-neutral-700 hover:text-estate-800 font-medium flex items-center gap-2"
            >
              <Home size={18} />
              Vendre
            </button>
            <button
              onClick={() => {
                handleNavigationWithFilter('lease');
                setIsMenuOpen(false);
              }}
              className="py-2 text-estate-neutral-700 hover:text-estate-800 font-medium flex items-center gap-2"
            >
              <Key size={18} />
              Bail Commercial
            </button>
            <button
              onClick={() => {
                handleNavigationWithFilter('rent');
                setIsMenuOpen(false);
              }}
              className="py-2 text-estate-neutral-700 hover:text-estate-800 font-medium flex items-center gap-2"
            >
              <Users size={18} />
              Louer
            </button>
            <button
              onClick={() => {
                handleNavigationWithFilter('daily-rent');
                setIsMenuOpen(false);
              }}
              className="py-2 text-estate-neutral-700 hover:text-estate-800 font-medium flex items-center gap-2"
            >
              <CalendarDays size={18} />
              Location Journalière
            </button>
            <Link
              to="/moving-services"
              onClick={() => setIsMenuOpen(false)}
              className="py-2 text-estate-neutral-700 hover:text-estate-800 font-medium flex items-center gap-2"
            >
              <Truck size={18} />
              Services de déménagement
            </Link>

            <div className="flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Button asChild variant="outline" className="flex gap-2 justify-center">
                    <Link to="/account" onClick={() => setIsMenuOpen(false)}>
                      <User size={18} />
                      <span>{userEmail || 'Mon Compte'}</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="text-red-500 border-red-500 hover:bg-red-50 flex items-center gap-2 justify-center"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut size={18} />
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 justify-center"
                    onClick={() => {
                      setIsAuthDialogOpen(true);
                      setAuthMode('login');
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogIn size={18} />
                    <span>Connexion</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-teal-600 hover:text-teal-700 flex items-center gap-2 justify-center"
                    onClick={() => {
                      setIsAuthDialogOpen(true);
                      setAuthMode('signup');
                      setIsMenuOpen(false);
                    }}
                  >
                    <UserPlus size={18} />
                    S'inscrire
                  </Button>
                </>
              )}
              <Button asChild className="bg-teal-500 hover:bg-teal-600 flex items-center gap-2 justify-center">
                <Link to="/sell" onClick={() => setIsMenuOpen(false)}>
                  <PlusCircle size={18} />
                  Publier une annonce
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Dialog */}
      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-estate-800">
              {authMode === 'login' ? 'Connexion' : 'S\'inscrire'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <form onSubmit={authMode === 'login' ? handleEmailLogin : handleEmailSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Entrez votre e-mail"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {authMode === 'signup' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Entrez votre numéro de téléphone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Entrez votre adresse"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      type="text"
                      placeholder="@votrenomdutilisateur"
                      value={formData.instagram}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      type="text"
                      placeholder="@votrenomdutilisateur"
                      value={formData.twitter}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      type="text"
                      placeholder="Lien vers votre profil"
                      value={formData.facebook}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600">
                {authMode === 'login' ? 'Connexion' : 'S\'inscrire'}
              </Button>
            </form>

            <div className="text-center text-sm">
              {authMode === 'login' ? (
                <>
                  Vous n'avez pas de compte?{' '}
                  <button
                    type="button"
                    className="text-teal-600 hover:underline"
                    onClick={toggleAuthMode}
                  >
                    S'inscrire
                  </button>
                </>
              ) : (
                <>
                  Vous avez déjà un compte?{' '}
                  <button
                    type="button"
                    className="text-teal-600 hover:underline"
                    onClick={toggleAuthMode}
                  >
                    Connexion
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
