// src/lib/auth/githubAuth.ts
import { toast } from "sonner";

// Configuration
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const GITHUB_REDIRECT_URI = `${window.location.origin}/auth/github/callback`;
const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&scope=user:email`;

/**
 * Initie le processus de connexion OAuth avec GitHub
 */
export const initiateGitHubLogin = () => {
  try {
    // Stocker l'URL actuelle pour redirection après connexion
    sessionStorage.setItem('preAuthUrl', window.location.href);
    window.location.href = GITHUB_AUTH_URL;
  } catch (error) {
    toast.error("Échec de l'initialisation de la connexion GitHub");
    console.error("GitHub login initiation error:", error);
    throw error;
  }
};

/**
 * Gère le callback GitHub après authentification
 * @param code Le code d'autorisation retourné par GitHub
 * @returns Les données utilisateur ou null en cas d'échec
 */
export const handleGitHubCallback = async (code: string): Promise<{email: string; name?: string; avatar?: string} | null> => {
  try {
    const response = await fetch('/api/auth/github', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const userData = await response.json();
    
    if (!userData?.email) {
      throw new Error('No email returned from GitHub');
    }

    return {
      email: userData.email,
      name: userData.name || '',
      avatar: userData.avatar || '',
    };
  } catch (error) {
    toast.error("L'authentification GitHub a échoué");
    console.error("GitHub callback error:", error);
    return null;
  }
};

/**
 * Vérifie si l'utilisateur est authentifié via GitHub
 */
export const checkGitHubAuth = (): boolean => {
  return !!localStorage.getItem('githubAuthToken');
};

/**
 * Déconnecte l'utilisateur GitHub
 */
export const githubLogout = (): void => {
  localStorage.removeItem('githubAuthToken');
  localStorage.removeItem('githubUserEmail');
  toast.success("Déconnexion réussie");
};