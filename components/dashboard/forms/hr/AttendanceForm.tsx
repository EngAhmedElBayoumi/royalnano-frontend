"use client";
import { Link } from "@/i18n/routing";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { attendanceSchema } from "@/lib/validations/dashboard/hr/attendanceSchema";
import { useGetEmployeesQuery } from "@/redux/services/dashboard/hr/employeeApi";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";
import Image from "next/image";
import MapGL, { Marker } from "react-map-gl/maplibre";
import { MapLayerMouseEvent } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import DateTimePicker from "@/components/formFields/DateTimePicker";
import CustomSelect from "@/components/formFields/CustomSelect";
import CustomModal from "@/components/modals/CustomModal";

interface AttendanceFormProps {
  onSubmit: (data: AttendanceFormValues) => Promise<void>;
  defaultValues?: AttendanceFormValues;
}

export interface AttendanceFormValues {
  employee: number;
  branch: number;
  check_in: Date;
  check_out: Date;
  working_hours: number;
  location?: string;
  longitude?: number;
  latitude?: number;
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

const AttendanceForm = ({ onSubmit, defaultValues }: AttendanceFormProps) => {
  const form = useForm({
    resolver: zodResolver(attendanceSchema),
    defaultValues: defaultValues || {
      employee: 1,
      branch: 1,
      check_in: new Date(),
      check_out: new Date(),
      working_hours: 0,
      location: "",
      longitude: 31,
      latitude: 30,
    },
  });

  const globalTranslate = useTranslations();
  const t = useTranslations("hr.attendance");

  const { data: employees } = useGetEmployeesQuery({});
  const { data: branches } = useGetBranchesQuery({});

  const employeesOptions =
    employees?.results?.map((employee: { id: number; name: string }) => ({
      value: String(employee.id),
      label: employee.name,
    })) || [];

  const branchesOptions =
    branches?.results?.map((branch: { id: number; name: string }) => ({
      value: String(branch.id),
      label: branch.name,
    })) || [];
  // Watch for changes in check_in, check_out, and working_hours
  const check_in = form.watch("check_in");
  const check_out = form.watch("check_out");
  const workingHours = form.watch("working_hours");

  useEffect(() => {
    if (check_in && check_out) {
      const hours =
        (check_out.getTime() - check_in.getTime()) / (1000 * 60 * 60);
      form.setValue("working_hours", hours);
    }
  }, [check_in, check_out, form]);

  useEffect(() => {
    if (check_in) {
      const newCheck_out = new Date(
        check_in.getTime() + workingHours * 60 * 60 * 1000
      );
      form.setValue("check_out", newCheck_out);
    }
    // eslint-disable-next-line
  }, [workingHours, form]);

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <CustomSelect
              control={form.control}
              name="employee"
              label={t("employee")}
              placeholder={t("employee")}
              options={employeesOptions}
            />
            <CustomSelect
              control={form.control}
              name="branch"
              label={t("branch")}
              placeholder={t("branch")}
              options={branchesOptions}
            />
            <TextInput
              control={form.control}
              name="working_hours"
              label={t("working_hours")}
              placeholder={t("working_hours")}
              type="number"
            />
            <DateTimePicker
              control={form.control}
              name="check_in"
              label={t("check_in")}
              placeholder={t("check_in")}
              disabledEndDate={form.watch("check_out")}
            />
            <DateTimePicker
              control={form.control}
              name="check_out"
              label={t("check_out")}
              placeholder={t("check_out")}
              disabledStartDate={form.watch("check_in")}
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
          </div>
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link
            href={`/dashboard/hr?tab=${globalTranslate("hr.tabs.attendance")}`}
            passHref
          >
            <CustomButton
              text={globalTranslate("cancel")}
              className="text-white rounded-lg bg-secondary min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
            />
          </Link>

          <CustomButton
            text={globalTranslate("save")}
            className="text-white rounded-lg min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          />
        </div>
      </form>
    </Form>
  );
};

export default AttendanceForm;
