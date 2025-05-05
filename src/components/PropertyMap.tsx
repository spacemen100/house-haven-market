import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

interface PropertyMapProps {
  lat: number;
  lng: number;
  address: string;
}

const PropertyMap = ({ lat, lng, address }: PropertyMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    // Configuration de l'icône
    const DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    // Initialisation de la carte
    mapRef.current = L.map(mapContainerRef.current, {
      center: [lat, lng],
      zoom: 15,
      scrollWheelZoom: false
    });

    // Ajout de la couche OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapRef.current);

    // Ajout du marqueur
    markerRef.current = L.marker([lat, lng])
      .addTo(mapRef.current)
      .bindPopup(address);

    // Nettoyage
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [lat, lng, address]);

  return (
    <div 
      ref={mapContainerRef} 
      className="h-64 rounded-lg overflow-hidden relative z-0"
    />
  );
};

export default PropertyMap;