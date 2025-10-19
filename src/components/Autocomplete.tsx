import React, { useRef, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface AutocompleteProps {
  onPlaceChanged: (place: any) => void;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

const Autocomplete = ({ onPlaceChanged, value, onChange, placeholder, label }: AutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);

  useEffect(() => {
    let placeListener: any;
    let autocomplete: any;
    const init = async () => {
      if (!inputRef.current) return;

      if (!(window as any).google?.maps?.places) {
        const loader = new Loader({
          apiKey: "AIzaSyAjAs9O5AqVbaCZth-QDJm4KJfoq2ZzgUI",
          version: "weekly",
          libraries: ["places"],
        });
        await loader.load();
      }

      const google = (window as any).google;
      autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        types: ["address"],
        componentRestrictions: { country: ["fr", "be", "ch", "mc", "ad"] },
        fields: ["formatted_address", "geometry", "address_components", "name"],
      });

      placeListener = autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        onPlaceChanged(place);
      });

      autocompleteRef.current = autocomplete;
    };

    init();

    return () => {
      if (placeListener) placeListener.remove();
    };
  }, [onPlaceChanged]);

  return (
    <div>
      {label ? (
        <label htmlFor="address-autocomplete" className="sr-only">{label}</label>
      ) : null}
      <input
        id="address-autocomplete"
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex h-10 w-full rounded-md border border-estate-neutral-200 bg-white px-3 py-2 text-sm text-estate-800 placeholder:text-estate-neutral-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default Autocomplete;
