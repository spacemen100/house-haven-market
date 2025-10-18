import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getUserProfile, updateUserProfile } from '@/lib/profiles';

interface LikeContextType {
  likedProperties: string[];
  toggleLike: (propertyId: string) => Promise<void>;
  isLiked: (propertyId: string) => boolean;
}

const LikeContext = createContext<LikeContextType | undefined>(undefined);

export const useLikes = () => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error('useLikes must be used within a LikeProvider');
  }
  return context;
};

export const LikeProvider = ({ children }: { children: React.ReactNode }) => {
  const [likedProperties, setLikedProperties] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user?.id || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchLikedProperties = async () => {
        const profile = await getUserProfile(userId);
        if (profile && profile.liked_properties) {
          setLikedProperties(profile.liked_properties);
        }
      };
      fetchLikedProperties();
    } else {
      setLikedProperties([]);
    }
  }, [userId]);

  const toggleLike = async (propertyId: string) => {
    if (!userId) return;

    let updatedLikedProperties: string[];
    if (likedProperties.includes(propertyId)) {
      updatedLikedProperties = likedProperties.filter(id => id !== propertyId);
    } else {
      updatedLikedProperties = [...likedProperties, propertyId];
    }

    setLikedProperties(updatedLikedProperties);
    await updateUserProfile(userId, { liked_properties: updatedLikedProperties });
  };

  const isLiked = (propertyId: string) => {
    return likedProperties.includes(propertyId);
  };

  return (
    <LikeContext.Provider value={{ likedProperties, toggleLike, isLiked }}>
      {children}
    </LikeContext.Provider>
  );
};
