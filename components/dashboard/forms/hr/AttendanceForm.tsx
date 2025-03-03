"use client";
import { Link } from "@/i18n/routing";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { attendanceSchema } from "@/lib/validations/dashboard/hr/attendanceSchema";
import { useGetEmployeesQuery } from "@/redux/services/dashboard/hr/employeeApi";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import DateTimePicker from "@/components/formFields/DateTimePicker";
import CustomSelect from "@/components/formFields/CustomSelect";

interface AttendanceFormProps {
  onSubmit: (data: AttendanceFormValues) => Promise<void>;
  defaultValues?: AttendanceFormValues;
}

export interface AttendanceFormValues {
  employee: number;
  branch: number;
  attendance: Date;
  departure: Date;
  working_hours: number;
  location?: string;
  longitude?: number;
  latitude?: number;
}

const AttendanceForm = ({ onSubmit, defaultValues }: AttendanceFormProps) => {
  const form = useForm({
    resolver: zodResolver(attendanceSchema),
    defaultValues: defaultValues || {
      employee: 1,
      branch: 1,
      attendance: new Date(),
      departure: new Date(),
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
  // Watch for changes in attendance, departure, and working_hours
  const attendance = form.watch("attendance");
  const departure = form.watch("departure");
  const workingHours = form.watch("working_hours");

  useEffect(() => {
    if (attendance && departure) {
      const hours =
        (departure.getTime() - attendance.getTime()) / (1000 * 60 * 60);
      form.setValue("working_hours", hours);
    }
  }, [attendance, departure, form]);

  useEffect(() => {
    if (attendance) {
      const newDeparture = new Date(
        attendance.getTime() + workingHours * 60 * 60 * 1000
      );
      form.setValue("departure", newDeparture);
    }
    // eslint-disable-next-line
  }, [workingHours, form]);

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
            <TextInput
              control={form.control}
              name="name"
              label="Name"
              placeholder="Name"
            />
            <TextInput
              control={form.control}
              name="working_hours"
              label="Working Hours"
              placeholder="Working Hours"
              type="number"
            />
            <DateTimePicker
              control={form.control}
              name="attendance"
              label="Attendance"
              placeholder="Select Attendance Time"
              disabledEndDate={form.watch("departure")}
            />
            <DateTimePicker
              control={form.control}
              name="departure"
              label="Departure"
              placeholder="Select Departure Time"
              disabledStartDate={form.watch("attendance")}
            />
          </div>
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link href="/dashboard/hr" passHref>
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

export default AttendanceForm;
