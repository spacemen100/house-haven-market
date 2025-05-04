import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Configuration des constantes
const INITIAL_LAT = 41.7151;
const INITIAL_LNG = 44.7871; // Décalé de ~3km vers l'ouest (original: 44.8271)
const INITIAL_ZOOM = 12; // Réduit de 1 par rapport au zoom original (13)

// Correction pour les icônes Leaflet
const createDefaultIcon = () => {
  return L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

interface LocationMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialLat?: number;
  initialLng?: number;
}

export default function LocationMapLeaflet({
  onLocationSelect,
  initialLat = INITIAL_LAT,
  initialLng = INITIAL_LNG,
}: LocationMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    // Initialisation de la carte avec les paramètres ajustés
    mapRef.current = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: INITIAL_ZOOM,
      preferCanvas: true
    });

    // Couche OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(mapRef.current);

    // Configuration du marqueur
    L.Marker.prototype.options.icon = createDefaultIcon();
    
    markerRef.current = L.marker([initialLat, initialLng], {
      draggable: true,
      autoPan: true,
    }).addTo(mapRef.current);

    // Gestion des événements
    const handleMapClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      markerRef.current?.setLatLng([lat, lng]);
      onLocationSelect(lat, lng);
    };

    const handleMarkerDrag = () => {
      const position = markerRef.current?.getLatLng();
      if (position) {
        onLocationSelect(position.lat, position.lng);
        mapRef.current?.panTo(position);
      }
    };

    mapRef.current.on('click', handleMapClick);
    markerRef.current.on('dragend', handleMarkerDrag);

    // Nettoyage
    return () => {
      mapRef.current?.off('click', handleMapClick);
      markerRef.current?.off('dragend', handleMarkerDrag);
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-[400px] rounded-lg border border-gray-300 z-0"
      aria-label="Carte de localisation de la propriété"
    />
  );
}