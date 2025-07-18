"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Navigation } from "lucide-react";

interface SimpleMapProps {
  latitude?: number;
  longitude?: number;
  onLocationSelect: (lat: number, lng: number, locationName: string) => void;
  height?: number;
}

const SimpleMap: React.FC<SimpleMapProps> = ({
  latitude = 30.0444,
  longitude = 31.2357,
  onLocationSelect,
  height = 400,
}) => {
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([latitude, longitude]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationName, setLocationName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Get current location
  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setSelectedPosition([lat, lng]);
          reverseGeocode(lat, lng);
          setIsLoading(false);
        },
        (error) => {
          console.log("Could not get current location:", error);
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        }
      );
    } else {
      setIsLoading(false);
    }
  };

  // Search for location using Nominatim API
  const searchLocation = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        setSelectedPosition([lat, lng]);
        setLocationName(result.display_name);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
    setIsLoading(false);
  };

  // Reverse geocoding to get location name
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setLocationName(data.display_name);
      }
    } catch (error) {
      console.error("Reverse geocoding error:", error);
    }
  };

  // Handle map click
  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert pixel coordinates to lat/lng (simplified calculation)
    const mapWidth = rect.width;
    const mapHeight = rect.height;
    
    // Calculate approximate lat/lng based on current center and zoom
    const latRange = 0.01; // Approximate range for zoom level
    const lngRange = 0.01;
    
    const lat = selectedPosition[0] + (0.5 - y / mapHeight) * latRange;
    const lng = selectedPosition[1] + (x / mapWidth - 0.5) * lngRange;
    
    setSelectedPosition([lat, lng]);
    reverseGeocode(lat, lng);
  };

  // Confirm selection
  const handleConfirm = () => {
    onLocationSelect(selectedPosition[0], selectedPosition[1], locationName);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="w-full space-y-4">
      {/* Search Section */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="البحث عن مكان..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <Button onClick={searchLocation} disabled={isLoading}>
          بحث
        </Button>
        <Button onClick={getCurrentLocation} disabled={isLoading} variant="outline">
          <Navigation className="h-4 w-4 ml-2" />
          موقعي
        </Button>
      </div>

      {/* Map Section */}
      <div 
        ref={mapRef}
        className="relative border rounded-lg overflow-hidden cursor-crosshair"
        style={{ height: `${height}px` }}
        onClick={handleMapClick}
      >
        {/* Static Map using OpenStreetMap tiles */}
        <iframe
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedPosition[1] - 0.01},${selectedPosition[0] - 0.01},${selectedPosition[1] + 0.01},${selectedPosition[0] + 0.01}&layer=mapnik&marker=${selectedPosition[0]},${selectedPosition[1]}`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          title="Map"
        />
        
        {/* Marker overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <MapPin className="h-8 w-8 text-red-500 drop-shadow-lg" />
        </div>
        
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          </div>
        )}
      </div>

      {/* Location Info */}
      <div className="space-y-2">
        <div className="text-sm text-gray-600">
          <strong>الإحداثيات:</strong> {selectedPosition[0].toFixed(6)}, {selectedPosition[1].toFixed(6)}
        </div>
        {locationName && (
          <div className="text-sm text-gray-600">
            <strong>العنوان:</strong> {locationName}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={() => window.location.reload()}>
          إلغاء
        </Button>
        <Button onClick={handleConfirm}>
          تأكيد الموقع
        </Button>
      </div>
    </div>
  );
};

export default SimpleMap;

