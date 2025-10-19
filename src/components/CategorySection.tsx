
import { Link } from "react-router-dom";
import { ArrowRight, Home, Building, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    title: "Acheter une maison",
    description: "Trouvez votre chez‑vous avec une expérience photo immersive et le plus grand choix d’annonces, y compris des biens introuvables ailleurs.",
    icon: <Home size={24} className="text-teal-500" />,
    link: "/properties?type=sale",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2946&ixlib=rb-4.0.3"
  },
  {
    title: "Louer une maison",
    description: "Nous offrons une expérience en ligne fluide — de la recherche sur le plus grand réseau de locations jusqu’à la candidature et au paiement du loyer.",
    icon: <Building size={24} className="text-teal-500" />,
    link: "/properties?type=rent",
    image: "https://images.unsplash.com/photo-1594484208019-b7d33c577659?auto=format&fit=crop&q=80&w=2970&ixlib=rb-4.0.3"
  },
  {
    title: "Vendre votre bien",
    description: "Quel que soit le chemin que vous empruntez pour vendre, nous vous aidons à concrétiser votre vente avec succès.",
    icon: <MapPin size={24} className="text-teal-500" />,
    link: "/sell",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=2960&ixlib=rb-4.0.3"
  }
];

const CategorySection = () => {
  return (
    <section className="section bg-estate-neutral-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-estate-800 mb-4">
            Comment pouvons‑nous vous aider ?
          </h2>
          <p className="text-lg text-estate-neutral-700 max-w-3xl mx-auto">
            Nous proposons un service complet pour la vente, l’achat et la location de biens immobiliers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  {category.icon}
                  <h3 className="text-xl font-bold text-estate-800">{category.title}</h3>
                </div>
                <p className="text-estate-neutral-600 mb-4">{category.description}</p>
                <Link to={category.link}>
                  <Button variant="outline" className="flex items-center gap-2 border-estate-800 text-estate-800 hover:bg-estate-800 hover:text-white">
                    <span>En savoir plus</span>
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
