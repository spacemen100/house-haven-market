import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, ChevronDown, Home, Key, Users, CalendarDays, LogIn, LogOut, UserPlus, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { signInWithEmail, signUpWithEmail, signOut } from '@/lib/api/auth';
import { supabase } from '@/lib/api/supabaseClient';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/LanguageContext';
import { useCurrency } from '@/CurrencyContext';

const FlagFrance = ({ width = 20, height = 15 }) => (
  <svg viewBox="0 0 60 30" width={width} height={height} className="flex-shrink-0">
    <rect width="20" height="30" x="0" fill="#002395"/>
    <rect width="20" height="30" x="20" fill="#fff"/>
    <rect width="20" height="30" x="40" fill="#ed2939"/>
  </svg>
);

const FlagUK = ({ width = 20, height = 15 }) => (
  <svg viewBox="0 0 60 30" width={width} height={height} className="flex-shrink-0">
    <rect width="60" height="30" fill="#012169"/>
    <rect width="60" height="2" y="4" fill="#fff"/>
    <rect width="60" height="2" y="8" fill="#fff"/>
    <rect width="60" height="2" y="12" fill="#fff"/>
    <rect width="60" height="2" y="16" fill="#fff"/>
    <rect width="60" height="2" y="20" fill="#fff"/>
    <rect width="60" height="2" y="24" fill="#fff"/>
    <rect width="25" height="14" fill="#c8102e"/>
    <rect width="2" height="30" x="10" fill="#fff"/>
    <rect width="2" height="30" x="16" fill="#fff"/>
    <rect width="2" height="30" x="22" fill="#fff"/>
    <rect width="2" height="30" x="28" fill="#fff"/>
    <rect width="2" height="30" x="34" fill="#fff"/>
    <rect width="2" height="30" x="40" fill="#fff"/>
    <rect width="2" height="30" x="46" fill="#fff"/>
    <rect width="2" height="30" x="52" fill="#fff"/>
  </svg>
);

const FlagEU = ({ width = 20, height = 15 }) => (
  <svg viewBox="0 0 60 30" width={width} height={height} className="flex-shrink-0">
    <rect width="60" height="30" fill="#003399"/>
    <circle cx="30" cy="15" r="8" fill="#ffcc00"/>
    <circle cx="30" cy="15" r="6" fill="#003399"/>
    <circle cx="30" cy="15" r="4" fill="#ffcc00"/>
  </svg>
);

const Navbar = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const { currency } = useCurrency(); // Plus de setCurrency car on a seulement EUR
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangPopoverOpen, setIsLangPopoverOpen] = useState(false);
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
      toast.success(t('loginSuccess'));
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, ...profileData } = formData;
    const success = await signUpWithEmail(email, password, profileData);

    if (success) {
      setIsAuthDialogOpen(false);
      resetForm();
      toast.success(t('signupSuccess'));
    }
  };

  const handleLogout = async () => {
    const success = await signOut();
    if (success) {
      toast.success(t('logoutSuccess'));
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

  const handleLanguageChange = (lng: string) => {
    changeLanguage(lng);
    setIsMenuOpen(false);
    setIsLangPopoverOpen(false);
  };

  const handleNavigationWithFilter = (type: string) => {
    navigate(`/properties?type=${type}`);
  };

  // Fonction pour obtenir le drapeau en fonction de la langue
  const getLanguageFlag = (lng: string) => {
    return lng === 'en' ? <FlagUK /> : <FlagFrance />;
  };

  // Fonction pour obtenir le texte de la langue
  const getLanguageText = (lng: string) => {
    return lng === 'en' ? 'EN' : 'FR';
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container py-3 flex items-center justify-between">
        <Link to="/" className="flex flex-col items-center gap-1">
          <div className="text-estate-800 text-2xl font-serif font-bold flex flex-col items-center gap-1">
            House
            <FlagEU width={24} height={18} />
            <span className="text-teal-500">Real Estate</span>
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
              {t('sell')}
            </button>
            <button
              onClick={() => handleNavigationWithFilter('lease')}
              className="text-estate-neutral-700 hover:text-estate-800 font-medium flex items-center gap-2"
            >
              <Key size={18} />
              {t('lease')}
            </button>
            <button
              onClick={() => handleNavigationWithFilter('rent')}
              className="text-estate-neutral-700 hover:text-estate-800 font-medium flex items-center gap-2"
            >
              <Users size={18} />
              {t('rent')}
            </button>
            <button
              onClick={() => handleNavigationWithFilter('daily-rent')}
              className="text-estate-neutral-700 hover:text-estate-800 font-medium flex items-center gap-2"
            >
              <CalendarDays size={18} />
              {t('dailyRent')}
            </button>
          </div>

          {/* Currency Display (seulement EUR) */}
          <div className="flex items-center gap-2 px-3 py-2 bg-estate-50 rounded-lg">
            <FlagEU />
            <span className="font-medium text-estate-800">EUR</span>
          </div>

          {/* Language Selector */}
          <Popover open={isLangPopoverOpen} onOpenChange={setIsLangPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-3 py-2 bg-estate-50 hover:bg-estate-100 rounded-lg transition-colors">
                {getLanguageFlag(language)}
                <span className="font-medium text-estate-800">
                  {getLanguageText(language)}
                </span>
                <ChevronDown className={`h-4 w-4 text-estate-600 transition-transform ${isLangPopoverOpen ? 'rotate-180' : ''}`} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50">
              <button
                onClick={() => handleLanguageChange('fr')}
                className={`flex items-center w-full px-4 py-2 text-sm ${language === 'fr' ? 'bg-teal-50 text-teal-800' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FlagFrance className="mr-3" />
                <span>Français</span>
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`flex items-center w-full px-4 py-2 text-sm ${language === 'en' ? 'bg-teal-50 text-teal-800' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FlagUK className="mr-3" />
                <span>English</span>
              </button>
            </PopoverContent>
          </Popover>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Button asChild variant="outline" className="flex gap-2">
                <Link to="/account">
                  <User size={18} />
                  <span>{userEmail || t('myAccount')}</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="text-red-500 border-red-500 hover:bg-red-50 flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                {t('logout')}
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
                    <span>{t('login')}</span>
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
                  {t('signup')}
                </Button>
              </Dialog>
            </>
          )}
          <Button asChild className="bg-teal-500 hover:bg-teal-600 flex items-center gap-2">
            <Link to="/sell">
              <PlusCircle size={18} />
              {t('addListing')}
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
              {t('sell')}
            </button>
            <button
              onClick={() => {
                handleNavigationWithFilter('lease');
                setIsMenuOpen(false);
              }}
              className="py-2 text-estate-neutral-700 hover:text-estate-800 font-medium flex items-center gap-2"
            >
              <Key size={18} />
              {t('lease')}
            </button>
            <button
              onClick={() => {
                handleNavigationWithFilter('rent');
                setIsMenuOpen(false);
              }}
              className="py-2 text-estate-neutral-700 hover:text-estate-800 font-medium flex items-center gap-2"
            >
              <Users size={18} />
              {t('rent')}
            </button>
            <button
              onClick={() => {
                handleNavigationWithFilter('daily-rent');
                setIsMenuOpen(false);
              }}
              className="py-2 text-estate-neutral-700 hover:text-estate-800 font-medium flex items-center gap-2"
            >
              <CalendarDays size={18} />
              {t('dailyRent')}
            </button>

            <div className="flex flex-col gap-4 mt-4">
              {/* Currency Display (seulement EUR) */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">{t('currency')}</h3>
                <div className="flex justify-center">
                  <div className="py-3 px-6 rounded-md bg-estate-50 flex flex-col items-center">
                    <FlagEU width={24} height={18} />
                    <span className="text-sm mt-1 font-medium">EUR</span>
                  </div>
                </div>
              </div>

              {/* Language Selector */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">{t('language')}</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleLanguageChange('fr')}
                    className={`py-3 rounded-md flex flex-col items-center transition-colors ${language === 'fr' ? 'bg-teal-100 text-teal-800' : 'bg-estate-50 hover:bg-estate-100'}`}
                  >
                    <FlagFrance width={24} height={18} />
                    <span className="text-xs mt-1">Français</span>
                  </button>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`py-3 rounded-md flex flex-col items-center transition-colors ${language === 'en' ? 'bg-teal-100 text-teal-800' : 'bg-estate-50 hover:bg-estate-100'}`}
                  >
                    <FlagUK width={24} height={18} />
                    <span className="text-xs mt-1">English</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Button asChild variant="outline" className="flex gap-2 justify-center">
                    <Link to="/account" onClick={() => setIsMenuOpen(false)}>
                      <User size={18} />
                      <span>{userEmail || t('myAccount')}</span>
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
                    {t('logout')}
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
                    <span>{t('login')}</span>
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
                    {t('signup')}
                  </Button>
                </>
              )}
              <Button asChild className="bg-teal-500 hover:bg-teal-600 flex items-center gap-2 justify-center">
                <Link to="/sell" onClick={() => setIsMenuOpen(false)}>
                  <PlusCircle size={18} />
                  {t('addListing')}
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
              {authMode === 'login' ? t('login') : t('signup')}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <form onSubmit={authMode === 'login' ? handleEmailLogin : handleEmailSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('enterEmail')}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('enterPassword')}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {authMode === 'signup' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('phone')}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t('enterPhone')}
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">{t('address')}</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder={t('enterAddress')}
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      type="text"
                      placeholder="@yourusername"
                      value={formData.instagram}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      type="text"
                      placeholder="@yourusername"
                      value={formData.twitter}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      type="text"
                      placeholder={t('linkToProfile')}
                      value={formData.facebook}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600">
                {authMode === 'login' ? t('login') : t('signup')}
              </Button>
            </form>

            <div className="text-center text-sm">
              {authMode === 'login' ? (
                <>
                  {t('noAccount')}{' '}
                  <button
                    type="button"
                    className="text-teal-600 hover:underline"
                    onClick={toggleAuthMode}
                  >
                    {t('signup')}
                  </button>
                </>
              ) : (
                <>
                  {t('haveAccount')}{' '}
                  <button
                    type="button"
                    className="text-teal-600 hover:underline"
                    onClick={toggleAuthMode}
                  >
                    {t('login')}
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