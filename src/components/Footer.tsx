import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-estate-800 text-white relative z-20">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-serif font-bold mb-6">Annonces Immobilières<span className="text-teal-500">Région Lyonnaise</span></div>
            <p className="text-estate-neutral-200 mb-6">
              Votre agence immobilière de confiance dans la région lyonnaise, offrant des services personnalisés pour l'achat, la vente et la location.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-estate-neutral-200 hover:text-teal-500">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-estate-neutral-200 hover:text-teal-500">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-estate-neutral-200 hover:text-teal-500">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-estate-neutral-200 hover:text-teal-500">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-estate-neutral-200 hover:text-teal-500">Accueil</Link>
              </li>
              <li>
                <Link to="/properties?type=sale" className="text-estate-neutral-200 hover:text-teal-500">Acheter</Link>
              </li>
              <li>
                <Link to="/properties?type=rent" className="text-estate-neutral-200 hover:text-teal-500">Louer</Link>
              </li>
              <li>
                <Link to="/sell" className="text-estate-neutral-200 hover:text-teal-500">Vendre / Annoncer</Link>
              </li>
              <li>
                <Link to="/properties?type=rent_by_day" className="text-estate-neutral-200 hover:text-teal-500">Location à la journée</Link>
              </li>
            </ul>
          </div>

          
        </div>

        <hr className="border-estate-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-estate-neutral-300 text-sm">
            © 2025 Annonces Immobilières Région Lyonnaise. Tous droits réservés.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-estate-neutral-300 hover:text-teal-500 text-sm">
              Politique de confidentialité
            </Link>
            <Link to="/terms" className="text-estate-neutral-300 hover:text-teal-500 text-sm">
              Conditions d'utilisation
            </Link>
            <Link to="/sitemap" className="text-estate-neutral-300 hover:text-teal-500 text-sm">
              Plan du site
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;