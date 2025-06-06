
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-estate-800 text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-serif font-bold mb-6">House<span className="text-teal-500">Haven</span></div>
            <p className="text-estate-neutral-200 mb-6">
              Your trusted partner in finding the perfect property. Whether buying, selling, or renting, we're here to help you every step of the way.
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
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-estate-neutral-200 hover:text-teal-500">Home</Link>
              </li>
              <li>
                <Link to="/properties?type=sale" className="text-estate-neutral-200 hover:text-teal-500">Buy</Link>
              </li>
              <li>
                <Link to="/properties?type=rent" className="text-estate-neutral-200 hover:text-teal-500">Rent</Link>
              </li>
              <li>
                <Link to="/sell" className="text-estate-neutral-200 hover:text-teal-500">Sell</Link>
              </li>
              <li>
                <Link to="/agents" className="text-estate-neutral-200 hover:text-teal-500">Agents</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-estate-neutral-200 hover:text-teal-500">Real Estate Blog</Link>
              </li>
              <li>
                <Link to="/guides" className="text-estate-neutral-200 hover:text-teal-500">Buyer's Guide</Link>
              </li>
              <li>
                <Link to="/guides" className="text-estate-neutral-200 hover:text-teal-500">Seller's Guide</Link>
              </li>
              <li>
                <Link to="/mortgage" className="text-estate-neutral-200 hover:text-teal-500">Mortgage Calculator</Link>
              </li>
              <li>
                <Link to="/faq" className="text-estate-neutral-200 hover:text-teal-500">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-teal-500 mt-1" />
                <span className="text-estate-neutral-200">123 Real Estate Ave, Suite 100<br />Metropolis, CA 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-teal-500" />
                <a href="tel:+15551234567" className="text-estate-neutral-200 hover:text-teal-500">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-teal-500" />
                <a href="mailto:info@househaven.com" className="text-estate-neutral-200 hover:text-teal-500">
                  info@househaven.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-estate-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-estate-neutral-300 text-sm">
            © 2025 HouseHaven. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-estate-neutral-300 hover:text-teal-500 text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-estate-neutral-300 hover:text-teal-500 text-sm">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-estate-neutral-300 hover:text-teal-500 text-sm">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
