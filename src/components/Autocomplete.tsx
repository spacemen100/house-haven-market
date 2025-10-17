import React, { Component, createRef } from 'react';

interface AutocompleteProps {
  onPlaceChanged: (place: google.maps.places.PlaceResult) => void;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}

class Autocomplete extends Component<AutocompleteProps> {
  private autocomplete: google.maps.places.Autocomplete | null = null;
  private inputRef = createRef<HTMLInputElement>();

  componentDidMount() {
    if (this.inputRef.current) {
      this.autocomplete = new google.maps.places.Autocomplete(
        this.inputRef.current,
        {
          componentRestrictions: { country: ["fr", "de", "es", "it", "gb"] },
          types: ["address"],
        }
      );

      this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
    }
  }

  handlePlaceChanged = () => {
    if (this.autocomplete) {
      const place = this.autocomplete.getPlace();
      if (place.formatted_address) {
        this.props.onPlaceChanged(place);
        this.props.onChange(place.formatted_address);
      }
    }
  };

  render() {
    return (
        <div>
            <label htmlFor={this.props.label}>{this.props.label}</label>
            <input
                ref={this.inputRef}
                type="text"
                placeholder={this.props.placeholder}
                value={this.props.value}
                onChange={(e) => this.props.onChange(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
        </div>
    );
  }
}

export default Autocomplete;
