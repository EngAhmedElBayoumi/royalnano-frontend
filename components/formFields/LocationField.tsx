"use client";

import { useState } from "react";
import Image from "next/image";
import MapGL, { Marker } from "react-map-gl/maplibre";
import { MapLayerMouseEvent } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import CustomModal from "@/components/modals/CustomModal";
import TextInput from "@/components/formFields/TextInput";
import { Control, FieldValues, useController, Path } from "react-hook-form";

interface LocationFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  latitudeName: string;
  longitudeName: string;
  label: string;
  placeholder: string;
  modalTitle: string;
  modalDescription: string;
  defaultLatitude?: number;
  defaultLongitude?: number;
}

const LocationField = <T extends FieldValues>({
  control,
  name,
  latitudeName,
  longitudeName,
  label,
  placeholder,
  modalTitle,
  modalDescription,
  defaultLatitude = 30,
  defaultLongitude = 31,
}: LocationFieldProps<T>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: defaultLatitude ?? 30,
    longitude: defaultLongitude ?? 31,
    zoom: 10,
    width: "100%",
    height: "400px",
  });

  const [marker, setMarker] = useState({
    latitude: defaultLatitude ?? 30,
    longitude: defaultLongitude ?? 31,
  });

  const { field: locationField } = useController({ control, name });
  const { field: latitudeField } = useController({
    control,
    name: latitudeName,
  });
  const { field: longitudeField } = useController({
    control,
    name: longitudeName,
  });

  const handleMapClick = async (event: MapLayerMouseEvent) => {
    const { lng, lat } = event.lngLat;
    setMarker({ latitude: lat, longitude: lng });

    // Fetch location name from a reverse geocoding service
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await response.json();
    const locationName = data.display_name || `lat: ${lat}, long: ${lng}`;

    // Update form values
    locationField.onChange(locationName);
    latitudeField.onChange(lat);
    longitudeField.onChange(lng);

    setViewport((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };

  return (
    <div className="relative">
      <TextInput
        control={control}
        name={name}
        label={label}
        placeholder={placeholder}
        readonly={true}
      />
      <Image
        src="/assets/icons/dashboard/branches/mdi_add-location.svg"
        alt="location"
        width="24"
        height="24"
        className="absolute top-0 ltr:right-0 rtl:left-0 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      />
      <CustomModal
        isOpen={isModalOpen}
        onChange={() => setIsModalOpen(false)}
        title={modalTitle}
        description={modalDescription}
      >
        <MapGL
          initialViewState={viewport}
          style={{ height: 400 }}
          mapStyle="https://api.maptiler.com/maps/streets/style.json?key=5jmaQWxsSn2zFDJSXmK4"
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          onClick={handleMapClick}
        >
          <Marker latitude={marker.latitude} longitude={marker.longitude} />
        </MapGL>
      </CustomModal>
    </div>
  );
};

export default LocationField;
