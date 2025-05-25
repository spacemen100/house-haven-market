import { useEffect, useState } from "react"; // Added useState
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getUserProfile } from "@/lib/profiles"; // Added getUserProfile
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyCard from "@/components/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { getMyProperties, getLikedProperties } from "@/lib/api/properties";
import { Property } from "@/types/property";
import { supabase } from "@/lib/api/supabaseClient";
import { toast } from "sonner";
import { handleAuthError } from "@/lib/api/auth";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Account = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // Check for auth errors in hash
    if (location.hash) {
      handleAuthError(location.hash);
    }
  }, [location]);

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    }
  });

  const { data: myProperties = [], isLoading: loadingMyProperties } = useQuery({
    queryKey: ['my-properties'],
    queryFn: getMyProperties,
  });

  const { data: likedProperties = [], isLoading: loadingLikedProperties } = useQuery({
    queryKey: ['liked-properties'],
    queryFn: getLikedProperties,
  });

  const [currentUserLikedPropertyIds, setCurrentUserLikedPropertyIds] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchProfileLikedIds = async () => {
      if (user?.id) { // Check if user object and user.id is available
        try {
          const profile = await getUserProfile(user.id);
          setCurrentUserLikedPropertyIds(profile?.liked_properties || []);
        } catch (error) {
          console.error("Error fetching user profile for liked property IDs in Account:", error);
          setCurrentUserLikedPropertyIds([]);
        }
      } else if (user === null) { // Explicitly null means auth check complete, no user
           setCurrentUserLikedPropertyIds([]);
      }
      // If user is undefined (still loading), do nothing yet, wait for user query to complete
    };

    fetchProfileLikedIds();
  }, [user]); // Dependency array includes 'user' from the useQuery

  return (
    <div>
      <Navbar />

      <div className="container py-8">
        <div className="flex items-center gap-4 mb-8">
          {user?.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-estate-800 flex items-center justify-center text-white text-2xl">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-estate-800">
              {user?.user_metadata?.full_name || t("myAccount")}
            </h1>
            <p className="text-estate-neutral-600">
              {user?.email}
            </p>
          </div>
        </div>

        <Tabs defaultValue="published" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="published">{t("myListings")}</TabsTrigger>
            <TabsTrigger value="liked">{t("favorites")}</TabsTrigger>
          </TabsList>

          <TabsContent value="published">
            <div className="py-4">
              <h2 className="text-xl font-semibold mb-4">{t("myPublishedListings")}</h2>

              {loadingMyProperties ? (
                <div className="flex justify-center py-8">
                  <p>{t("loading")}</p>
                </div>
              ) : myProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myProperties.map((property: Property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg p-8 text-center border border-estate-neutral-200">
                  <p className="text-estate-neutral-600">
                    {t("noPublishedListings")}
                  </p>
                  <a
                    href="/sell"
                    className="text-teal-500 hover:text-teal-600 font-medium mt-2 inline-block"
                  >
                    {t("publishListing")}
                  </a>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="liked">
            <div className="py-4">
              <h2 className="text-xl font-semibold mb-4">{t("myFavorites")}</h2>

              {loadingLikedProperties ? (
                <div className="flex justify-center py-8">
                  <p>{t("loading")}</p>
                </div>
              ) : currentUserLikedPropertyIds !== null && likedProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {likedProperties.map((property: Property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      userLikedProperties={currentUserLikedPropertyIds}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg p-8 text-center border border-estate-neutral-200">
                  <p className="text-estate-neutral-600">
                    {t("noFavorites")}
                  </p>
                  <a
                    href="/properties"
                    className="text-teal-500 hover:text-teal-600 font-medium mt-2 inline-block"
                  >
                    {t("exploreProperties")}
                  </a>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Account;
