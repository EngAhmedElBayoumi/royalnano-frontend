"use client";
import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import MapGL, { Marker } from "react-map-gl/maplibre";
import { MapLayerMouseEvent } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { branchSchema } from "@/lib/validations/dashboard/branchSchema";

import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import PhoneInputField from "@/components/formFields/PhoneInputField";
import CustomTextArea from "@/components/formFields/TextArea";
import CustomModal from "@/components/modals/CustomModal";

interface BranchFormProps {
  onSubmit: (data: BranchFormValues) => Promise<void>;
  defaultValues?: BranchFormValues;
}

export interface BranchFormValues {
  name: string;
  phone_number: string;
  address: string;
  branch_code: string;
  email: string;
  location?: string;
  description?: string;
  manager?: number;
}

interface Viewport {
  latitude: number;
  longitude: number;
  zoom: number;
  width: string;
  height: string;
}

interface ExtendedMapGLProps extends React.ComponentProps<typeof MapGL> {
  onViewportChange?: (viewport: Viewport) => void;
}

const ExtendedMapGL = MapGL as React.ComponentType<ExtendedMapGLProps>;

const BranchForm = ({ onSubmit, defaultValues }: BranchFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(branchSchema),
    defaultValues: defaultValues || {
      name: "",
      phone_number: "",
      address: "",
      branch_code: "",
      email: "",
      location: "",
      description: "",
      manager: undefined,
    },
  });
  const [viewport, setViewport] = useState({
    latitude: 30,
    longitude: 30,
    zoom: 10,
    width: "100%",
    height: "400px",
  });

  const [marker, setMarker] = useState({ latitude: 30, longitude: 30 });

  const handleMapClick = (event: MapLayerMouseEvent) => {
    const { lng, lat } = event.lngLat;
    setMarker({ latitude: lat, longitude: lng });
    form.setValue("location", `lat: ${lat}, long: ${lng}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="name"
              label="Name"
              placeholder="Name"
            />
            <PhoneInputField
              control={form.control}
              name="phone_number"
              label="Phone Number"
            />

            <TextInput
              control={form.control}
              name="branch_code"
              label="Branch Code"
              placeholder="Branch Code"
            />
            <TextInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Email"
            />
            <div className="relative">
              <TextInput
                control={form.control}
                name="location"
                label="Location"
                placeholder="Location"
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
            </div>
            {/* Google Map for selecting location */}
            <CustomModal
              isOpen={isModalOpen}
              onChange={() => setIsModalOpen(false)}
              title="Set location"
              description="Select branch location"
            >
              <ExtendedMapGL
                initialViewState={viewport}
                style={{ height: 400 }}
                mapStyle="https://api.maptiler.com/maps/streets/style.json?key=5jmaQWxsSn2zFDJSXmK4"
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
                onClick={handleMapClick}
              >
                <Marker
                  latitude={marker.latitude}
                  longitude={marker.longitude}
                />
              </ExtendedMapGL>
            </CustomModal>

            <TextInput
              control={form.control}
              name="address"
              label="Address"
              placeholder="Address"
            />
            <TextInput
              control={form.control}
              name="manager"
              label="Manager"
              placeholder="Manager ID"
            />
          </div>
          <CustomTextArea
            control={form.control}
            name="description"
            label="Description"
            placeholder="Description"
            className="mt-2 xl:mt-5"
          />
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link href="/dashboard/branches" passHref>
            <CustomButton
              text="Cancel"
              className="text-white rounded-lg bg-secondary min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
            />
          </Link>

          <CustomButton
            text="Save"
            className="text-white rounded-lg min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          />
        </div>
      </form>
    </Form>
  );
};

export default BranchForm;
