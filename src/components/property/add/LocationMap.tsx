import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set mapbox access token (should ideally be in your env variables)
mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHR6dmp5b28wYzFpMmptbGVnaXE0NnBtIn0.a9DiQy7Dq_-uVVHP6F8e7g';

interface LocationMapProps {
  onLocationSelect?: (lat: number, lng: number) => void;
  initialLat?: number;
  initialLng?: number;
}

const LocationMap = ({ 
  onLocationSelect, 
  initialLat = 41.7151, 
  initialLng = 44.8271 
}: LocationMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Changed to v11 which is more stable
      center: [initialLng, initialLat],
      zoom: 12,
      attributionControl: false
    });

    // Add marker
    marker.current = new mapboxgl.Marker({
      draggable: true,
      color: '#3b82f6' // Blue color for better visibility
    })
      .setLngLat([initialLng, initialLat])
      .addTo(map.current);

    // Add controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.AttributionControl(), 'bottom-right');

    // Handle map load
    map.current.on('load', () => {
      setMapLoaded(true);
      // Add a subtle terrain layer for better context
      map.current?.addLayer({
        id: 'terrain-data',
        type: 'hillshade',
        source: {
          type: 'raster-dem',
          url: 'mapbox://mapbox.terrain-rgb'
        }
      });
    });

    // Handle map clicks
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      marker.current?.setLngLat([lng, lat]);
      onLocationSelect?.(lat, lng);
    });

    // Handle marker drag
    marker.current.on('dragend', () => {
      const lngLat = marker.current?.getLngLat();
      if (lngLat) {
        onLocationSelect?.(lngLat.lat, lngLat.lng);
      }
    });

    // Cleanup
    return () => {
      if (marker.current) marker.current.remove();
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [initialLat, initialLng, onLocationSelect]);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
      <div 
        ref={mapContainer} 
        className="w-full h-full"
        style={{ minHeight: '400px' }}
      />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p>Loading map...</p>
        </div>
      )}
    </div>
  );
};

export default LocationMap;