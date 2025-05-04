
// src/lib/api/auth.ts
import { supabase } from "./supabaseClient";
import { toast } from "sonner";

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

export const signUpWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin + '/account',
      data: {
        email_confirmed_at: new Date().toISOString(),
      }
    }
  });

  if (error) {
    toast.error("Registration failed: " + error.message);
    return false;
  }
  
  toast.success("Registration successful! Please check your email to verify your account.");
  return true;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    toast.error("Sign out failed: " + error.message);
    return false;
  }
  return true;
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error retrieving user:", error);
    return null;
  }
  return user;
};

// Handle authentication errors
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
