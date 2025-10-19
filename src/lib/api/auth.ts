import { supabase } from "./supabaseClient";
import { toast } from "sonner";

/**
 * Authentifie un utilisateur avec email et mot de passe
 */
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast.error("Échec de la connexion : " + error.message);
      return false;
    }
    
    toast.success("Connexion réussie");
    return true;
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    return false;
  }
};

/**
 * Crée un nouveau compte utilisateur avec email et mot de passe
 * et crée automatiquement un profil associé
 */
export const signUpWithEmail = async (
  email: string, 
  password: string, 
  profileData?: {
    phone?: string;
    address?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
  }
) => {
  try {
    // Étape 1: Création du compte d'authentification
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + '/account',
        data: {
          email_confirmed_at: new Date().toISOString(),
        }
      }
    });

    if (authError) throw authError;

    // Étape 2: Création ou mise à jour du profil utilisateur
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          user_id: authData.user.id,
          email: authData.user.email,
          phone: profileData?.phone || null,
          address: profileData?.address || null,
          instagram: profileData?.instagram || null,
          twitter: profileData?.twitter || null,
          facebook: profileData?.facebook || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (profileError) throw profileError;
    }

    toast.success("Inscription réussie ! Vérifiez votre email pour confirmer votre compte.");
    return true;
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    
    let errorMessage = "Échec de l'inscription";
    if (error instanceof Error) {
      errorMessage += ` : ${error.message}`;
    }
    
    toast.error(errorMessage);
    return false;
  }
};

/**
 * Déconnecte l'utilisateur
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast.error("Échec de la déconnexion : " + error.message);
      return false;
    }
    
    toast.success("Déconnexion réussie");
    return true;
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    return false;
  }
};

/**
 * Récupère l'utilisateur actuellement connecté
 */
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) throw error;
    return user;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return null;
  }
};

/**
 * Récupère le profil complet de l'utilisateur (auth + données supplémentaires)
 */
export const getCompleteUserProfile = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) return null;

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) throw error;

    return {
      ...user,
      profile: {
        phone: profile.phone,
        address: profile.address,
        instagram: profile.instagram,
        twitter: profile.twitter,
        facebook: profile.facebook,
        created_at: profile.created_at,
        updated_at: profile.updated_at
      }
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du profil utilisateur:", error);
    return null;
  }
};

/**
 * Met à jour le profil utilisateur
 */
export const updateUserProfile = async (profileData: {
  phone?: string;
  address?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
}) => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error("Utilisateur non authentifié");

    const { error } = await supabase
      .from('profiles')
      .update({
        ...profileData,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id);

    if (error) throw error;

    toast.success("Profil mis à jour avec succès");
    return true;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    toast.error("Échec de la mise à jour du profil");
    return false;
  }
};

/**
 * Gère les erreurs d'authentification depuis l'URL
 */
export const handleAuthError = (hash: string) => {
  if (hash && hash.includes('error=')) {
    const params = new URLSearchParams(hash.substring(1));
    const error = params.get('error');
    const errorDescription = params.get('error_description');
    
    if (error === 'access_denied' && errorDescription?.includes('expired')) {
      window.location.href = '/verification-error' + hash;
      return true;
    }
  }
  return false;
};
