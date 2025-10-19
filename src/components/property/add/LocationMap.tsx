import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const INITIAL_LAT = 41.7151;
const INITIAL_LNG = 44.7871;
const INITIAL_ZOOM = 12;

const createDefaultIcon = () =>
  L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

type ReverseAddress = {
  street?: string;
  city?: string;
  district?: string;
  state?: string;
  zip?: string;
  formatted?: string;
};

interface LocationMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  onReverseGeocode?: (result: { lat: number; lng: number; address?: ReverseAddress }) => void;
  onDragStateChange?: (dragging: boolean) => void;
  onLongPress?: () => void;
  initialLat?: number;
  initialLng?: number;
}

export default function LocationMap({
  onLocationSelect,
  onReverseGeocode,
  onDragStateChange,
  onLongPress,
  initialLat = INITIAL_LAT,
  initialLng = INITIAL_LNG,
}: LocationMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    mapRef.current = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: INITIAL_ZOOM,
      preferCanvas: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(mapRef.current);

    L.Marker.prototype.options.icon = createDefaultIcon();
    markerRef.current = L.marker([initialLat, initialLng], {
      draggable: true,
      autoPan: true,
    }).addTo(mapRef.current);

    const handleMapClick = async (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      markerRef.current?.setLatLng([lat, lng]);
      onLocationSelect(lat, lng);
      await doReverseGeocode(lat, lng);
    };

    const handleContextMenu = async (e: L.LeafletMouseEvent) => {
      // Long-press (mobile) or right-click (desktop) shortcut
      const { lat, lng } = e.latlng;
      markerRef.current?.setLatLng([lat, lng]);
      onLocationSelect(lat, lng);
      onLongPress?.();
      await doReverseGeocode(lat, lng);
    };

    const handleDragStart = () => onDragStateChange?.(true);
    const handleMarkerDragEnd = async () => {
      const position = markerRef.current?.getLatLng();
      if (position) {
        onLocationSelect(position.lat, position.lng);
        mapRef.current?.panTo(position);
        await doReverseGeocode(position.lat, position.lng);
      }
      onDragStateChange?.(false);
    };

    mapRef.current.on('click', handleMapClick);
    mapRef.current.on('contextmenu', handleContextMenu);
    markerRef.current.on('dragstart', handleDragStart);
    markerRef.current.on('dragend', handleMarkerDragEnd);

    return () => {
      mapRef.current?.off('click', handleMapClick);
      mapRef.current?.off('contextmenu', handleContextMenu);
      markerRef.current?.off('dragstart', handleDragStart);
      markerRef.current?.off('dragend', handleMarkerDragEnd);
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  const doReverseGeocode = async (lat: number, lng: number) => {
    try {
      let address: ReverseAddress | undefined;
      const g = (window as any).google;
      if (g?.maps?.Geocoder) {
        const geocoder = new g.maps.Geocoder();
        const resp = await geocoder.geocode({ location: { lat, lng } });
        const result = resp?.results?.[0];
        if (result) {
          const comps = result.address_components || [];
          const get = (types: string[]) => comps.find((c: any) => types.every((t) => c.types.includes(t)))?.long_name;
          address = {
            street: get(['route']) || undefined,
            city: get(['locality']) || get(['postal_town']) || get(['administrative_area_level_2']) || undefined,
            district: get(['sublocality', 'sublocality_level_1']) || get(['neighborhood']) || undefined,
            state: get(['administrative_area_level_1']) || undefined,
            zip: get(['postal_code']) || undefined,
            formatted: result.formatted_address,
          };
        }
      } else {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
        const res = await fetch(url, { headers: { Accept: 'application/json' } });
        if (res.ok) {
          const data = await res.json();
          const a = data.address || {};
          address = {
            street: a.road || a.pedestrian || a.path || undefined,
            city: a.city || a.town || a.village || a.municipality || undefined,
            district: a.suburb || a.neighbourhood || a.city_district || undefined,
            state: a.state || undefined,
            zip: a.postcode || undefined,
            formatted: data.display_name,
          };
        }
      }
      onReverseGeocode?.({ lat, lng, address });
    } catch (err) {
      onReverseGeocode?.({ lat, lng });
    }
  };

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-[400px] rounded-lg border border-gray-300 z-0"
      aria-label="Carte de localisation de la propriété"
    />
  );
}

