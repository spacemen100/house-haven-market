import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Correction pour les icônes manquantes de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LocationMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialLat?: number;
  initialLng?: number;
}

const LocationMap: React.FC<LocationMapProps> = ({
  onLocationSelect,
  initialLat = 41.7151,
  initialLng = 44.8271,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialiser la carte
    mapRef.current = L.map(mapContainerRef.current).setView(
      [initialLat, initialLng],
      13
    );

    // Ajouter la couche OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current);

    // Créer le marqueur
    markerRef.current = L.marker([initialLat, initialLng], {
      draggable: true,
    }).addTo(mapRef.current);

    // Gestion des événements
    const handleMapClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      markerRef.current?.setLatLng([lat, lng]);
      onLocationSelect(lat, lng);
    };

    const handleMarkerDrag = (e: L.LeafletEvent) => {
      const { lat, lng } = markerRef.current?.getLatLng() as L.LatLng;
      onLocationSelect(lat, lng);
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
      className="w-full h-[400px] rounded-lg border border-gray-300"
    />
  );
};

export default LocationMap;