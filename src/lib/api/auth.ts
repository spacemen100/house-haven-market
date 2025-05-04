
// src/lib/api/auth.ts
import { supabase } from "./supabaseClient";
import { toast } from "sonner";

export const signInWithEmail = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    toast.error("Échec de la connexion: " + error.message);
    return false;
  }
  return true;
};

export const signUpWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin + '/account'
    }
  });

  if (error) {
    toast.error("Échec de l'inscription: " + error.message);
    return false;
  }
  
  toast.success("Inscription réussie! Veuillez vérifier votre email pour confirmer votre compte.");
  return true;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    toast.error("Échec de la déconnexion: " + error.message);
    return false;
  }
  return true;
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return null;
  }
  return user;
};
