// src/pages/AuthGitHubCallback.tsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleGitHubCallback } from '@/lib/auth/githubAuth';
import { toast } from 'sonner';

const AuthGitHubCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');

  useEffect(() => {
    const authenticate = async () => {
      if (code) {
        const email = await handleGitHubCallback(code);
        if (email) {
          // Stockez l'email dans le state/localStorage
          // et redirigez l'utilisateur
          localStorage.setItem('userEmail', email);
          navigate('/account');
        } else {
          navigate('/login');
        }
      }
    };

    authenticate();
  }, [code, navigate]);

  return <div>Processing GitHub authentication...</div>;
};

export default AuthGitHubCallback;