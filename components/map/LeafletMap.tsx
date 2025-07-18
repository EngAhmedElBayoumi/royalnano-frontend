"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Crosshair } from "lucide-react";

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface LeafletMapProps {
  latitude?: number;
  longitude?: number;
  onLocationSelect: (lat: number, lng: number, locationName: string) => void;
  height?: number;
}

interface MapClickHandlerProps {
  onLocationSelect: (lat: number, lng: number, locationName: string) => void;
}

// Component to handle map clicks
function MapClickHandler({ onLocationSelect }: MapClickHandlerProps) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      
      try {
        // Reverse geocoding using Nominatim
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`
        );
        const data = await response.json();
        const locationName = data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        
        onLocationSelect(lat, lng, locationName);
      } catch (error) {
        console.error("Error fetching location name:", error);
        onLocationSelect(lat, lng, `${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      }
    },
  });

  return null;
}

// Component to handle search functionality
function SearchControl({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number, locationName: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const map = useMap();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1&addressdetails=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        
        // Move map to the found location
        map.setView([lat, lng], 15);
        
        // Select this location
        onLocationSelect(lat, lng, result.display_name);
      } else {
        alert("لم يتم العثور على المكان المطلوب");
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("حدث خطأ أثناء البحث");
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="absolute top-4 left-4 right-4 z-[1000] flex gap-2">
      <div className="flex-1 flex gap-2">
        <Input
          type="text"
          placeholder="ابحث عن مكان..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="bg-white shadow-md"
        />
        <Button
          onClick={handleSearch}
          disabled={isSearching}
          size="sm"
          className="shadow-md"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Component to handle current location
function CurrentLocationControl({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number, locationName: string) => void }) {
  const map = useMap();
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("الموقع الجغرافي غير مدعوم في هذا المتصفح");
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        // Move map to current location
        map.setView([lat, lng], 15);
        
        try {
          // Get location name
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`
          );
          const data = await response.json();
          const locationName = data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
          
          onLocationSelect(lat, lng, locationName);
        } catch (error) {
          console.error("Error fetching location name:", error);
          onLocationSelect(lat, lng, `${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("لا يمكن الحصول على موقعك الحالي");
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  return (
    <div className="absolute top-4 right-4 z-[1000]">
      <Button
        onClick={getCurrentLocation}
        disabled={isGettingLocation}
        size="sm"
        variant="secondary"
        className="shadow-md"
        title="موقعي الحالي"
      >
        <Crosshair className="h-4 w-4" />
      </Button>
    </div>
  );
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  latitude = 30.0444,
  longitude = 31.2357,
  onLocationSelect,
  height = 400,
}) => {
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([latitude, longitude]);
  const [mapKey, setMapKey] = useState(0);

  const handleLocationSelect = (lat: number, lng: number, locationName: string) => {
    setSelectedPosition([lat, lng]);
    onLocationSelect(lat, lng, locationName);
  };

  // Get current location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setSelectedPosition([lat, lng]);
        },
        (error) => {
          console.log("Could not get current location:", error);
          // Keep default position (Cairo, Egypt)
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 300000,
        }
      );
    }
  }, []);

  // Force re-render of map when modal opens
  useEffect(() => {
    setMapKey(prev => prev + 1);
  }, []);

  return (
    <div className="relative w-full" style={{ height: `${height}px` }}>
      <MapContainer
        key={mapKey}
        center={selectedPosition}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg"
        whenCreated={(map) => {
          // Ensure map is properly initialized
          setTimeout(() => {
            map.invalidateSize();
          }, 100);
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <SearchControl onLocationSelect={handleLocationSelect} />
        <CurrentLocationControl onLocationSelect={handleLocationSelect} />
        <MapClickHandler onLocationSelect={handleLocationSelect} />
        
        <Marker position={selectedPosition} />
      </MapContainer>
      
      <div className="absolute bottom-4 left-4 right-4 z-[1000]">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>انقر على الخريطة لتحديد الموقع أو استخدم البحث</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeafletMap;

