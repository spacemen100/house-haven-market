// src/lib/api/auth.ts
import { supabase } from "./supabaseClient";
import { toast } from "sonner";

export const signInWithGitHub = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: window.location.origin + '/account',
      scopes: 'user:email'
    }
  });

  if (error) {
    toast.error("GitHub login failed: " + error.message);
    return false;
  }
  return true;
};

export const signInWithEmail = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    toast.error("Login failed: " + error.message);
    return false;
  }
  return true;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    toast.error("Logout failed: " + error.message);
    return false;
  }
  return true;
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error getting user:", error);
    return null;
  }
  return user;
};