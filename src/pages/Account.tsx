import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyCard from "@/components/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { getMyProperties, getLikedProperties } from "@/lib/api/properties";
import { Property } from "@/types/property";
import { supabase } from "@/lib/api/supabaseClient";
import { toast } from "sonner";

const Account = () => {
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
              {user?.user_metadata?.full_name || 'My Account'}
            </h1>
            <p className="text-estate-neutral-600">
              {user?.email}
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="published" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="published">Mes Annonces</TabsTrigger>
            <TabsTrigger value="liked">Favoris</TabsTrigger>
          </TabsList>
          
          <TabsContent value="published">
            <div className="py-4">
              <h2 className="text-xl font-semibold mb-4">Mes annonces publiées</h2>
              
              {loadingMyProperties ? (
                <div className="flex justify-center py-8">
                  <p>Chargement...</p>
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
                    Vous n'avez pas encore publié d'annonces.
                  </p>
                  <a 
                    href="/sell" 
                    className="text-teal-500 hover:text-teal-600 font-medium mt-2 inline-block"
                  >
                    Publier une annonce
                  </a>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="liked">
            <div className="py-4">
              <h2 className="text-xl font-semibold mb-4">Mes favoris</h2>
              
              {loadingLikedProperties ? (
                <div className="flex justify-center py-8">
                  <p>Chargement...</p>
                </div>
              ) : likedProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {likedProperties.map((property: Property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg p-8 text-center border border-estate-neutral-200">
                  <p className="text-estate-neutral-600">
                    Vous n'avez pas encore de favoris.
                  </p>
                  <a 
                    href="/properties" 
                    className="text-teal-500 hover:text-teal-600 font-medium mt-2 inline-block"
                  >
                    Explorer les propriétés
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