"use client";
import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import MapGL, { Marker } from "react-map-gl/maplibre";
import { MapLayerMouseEvent } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { branchSchema } from "@/lib/validations/dashboard/branchSchema";
import { useGetEmployeesQuery } from "@/redux/services/dashboard/hr/employeeApi";

import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import PhoneInputField from "@/components/formFields/PhoneInputField";
import CustomTextArea from "@/components/formFields/TextArea";
import CustomModal from "@/components/modals/CustomModal";
import CustomSelect from "@/components/formFields/CustomSelect";
import useExtraFields from "@/hooks/useExtraFields";
import ExtraFields from "@/components/formFields/ExtraFields";

interface BranchFormProps {
  onSubmit: (data: BranchFormValues) => Promise<void>;
  defaultValues?: BranchFormValues;
  isLoading?: boolean;
}

export interface BranchFormValues {
  name: string;
  phone_number: string;
  address: string;
  branch_code: string;
  email: string;
  location?: string;
  longitude?: number;
  latitude?: number;
  description?: string;
  manager?: number;
  balance?: string;
  extra_fields?: Record<string, string> | null;
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

const BranchForm = ({
  onSubmit,
  defaultValues,
  isLoading,
}: BranchFormProps) => {
  const t = useTranslations("branches");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: employees } = useGetEmployeesQuery({});

  const managersOption =
    employees?.results?.map((employee: { id: number; name: string }) => ({
      value: String(employee.id),
      label: employee.name,
    })) || [];

  const form = useForm({
    resolver: zodResolver(branchSchema),
    defaultValues: defaultValues || {
      name: "",
      phone_number: "",
      address: "",
      branch_code: "",
      email: "",
      location: "",
      longitude: 31,
      latitude: 30,
      description: "",
      manager: 1,
      balance: "0.00",
      extra_fields: {},
    },
  });
  const [viewport, setViewport] = useState({
    latitude: defaultValues?.latitude ?? 30,
    longitude: defaultValues?.longitude ?? 31,
    zoom: 10,
    width: "100%",
    height: "400px",
  });

  const [marker, setMarker] = useState({
    latitude: defaultValues?.latitude ?? 30,
    longitude: defaultValues?.longitude ?? 31,
  });

  const handleMapClick = async (event: MapLayerMouseEvent) => {
    const { lng, lat } = event.lngLat;
    setMarker({ latitude: lat, longitude: lng });

    // Fetch location name from a reverse geocoding service
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await response.json();
    // Set the location name if available
    const locationName = data.display_name || `lat: ${lat}, long: ${lng}`;
    form.setValue("location", locationName);
    form.setValue("latitude", lat);
    form.setValue("longitude", lng);

    setViewport((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };

  const {
    extraFields,
    handleAddExtraField,
    handleRemoveExtraField,
    handleExtraFieldChange,
  } = useExtraFields({
    defaultFields: defaultValues?.extra_fields ?? {},
    setValue: form.setValue,
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="name"
              label={t("name")}
              placeholder={t("name")}
            />
            <PhoneInputField
              control={form.control}
              name="phone_number"
              label={t("phoneNumber")}
            />

            <TextInput
              control={form.control}
              name="branch_code"
              label={t("branchCode")}
              placeholder={t("branchCode")}
            />
            <TextInput
              control={form.control}
              name="email"
              label={t("email")}
              placeholder={t("email")}
            />
            <div className="relative">
              <TextInput
                control={form.control}
                name="location"
                label={t("location")}
                placeholder={t("location")}
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
            <CustomModal
              isOpen={isModalOpen}
              onChange={() => setIsModalOpen(false)}
              title={t("setLocation")}
              description={t("selectBranchLocation")}
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
              label={t("address")}
              placeholder={t("address")}
            />

            <CustomSelect
              control={form.control}
              name="manager"
              label={t("manager")}
              placeholder={t("manager")}
              options={managersOption}
            />
            <TextInput
              control={form.control}
              name="balance"
              label={t("balance")}
              placeholder={t("balance")}
            />
          </div>
          <CustomTextArea
            control={form.control}
            name="description"
            label={t("description")}
            placeholder={t("description")}
            className="mt-2 xl:mt-5"
          />
          <ExtraFields
            extraFields={extraFields}
            onAddField={handleAddExtraField}
            onRemoveField={handleRemoveExtraField}
            onFieldChange={handleExtraFieldChange}
          />
        </section>
        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link href="/dashboard/branches" passHref>
            <CustomButton text={t("cancel")} variant="secondary" />
          </Link>

          <CustomButton
            text={isLoading ? t("saving") : t("save")}
            isDisabled={isLoading}
          />
        </div>
      </form>
    </Form>
  );
};

export default BranchForm;
