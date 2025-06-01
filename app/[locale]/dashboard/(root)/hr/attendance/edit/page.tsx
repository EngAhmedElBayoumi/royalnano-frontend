"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  useUpdateAttendanceMutation,
  useGetAttendanceByIdQuery,
} from "@/redux/services/dashboard/hr/attendanceApi";
import EditPage from "@/components/dashboard/EditPage";
import AttendanceForm, {
  AttendanceFormValues,
} from "@/components/dashboard/forms/hr/AttendanceForm";

export default function EditAttendance() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("hr");

  const { data, isLoading, error } = useGetAttendanceByIdQuery(id);
  const [updateAttendance, { isLoading: submitting }] =
    useUpdateAttendanceMutation();

  const checkInDate =
    data && data?.check_in
      ? new Date(`${data.date}T${data.check_in}`)
      : new Date();
  const checkOutDate =
    data && data?.check_out
      ? new Date(`${data.date}T${data.check_out}`)
      : new Date();

  const defaultValues: AttendanceFormValues = data && {
    ...data,
    employee: data.employee.id,
    branch: data.branch.id,
    check_in: checkInDate,
    check_out: checkOutDate,
    working_hours:
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60),
    latitude: data.latitude ?? undefined,
    longitude: data.longitude ?? undefined,
  };

  const handleSubmit = async (data: AttendanceFormValues) => {
    const payload = {
      ...data,
      employee: Number(data.employee),
      branch: Number(data.branch),
      date: format(data.check_in, "yyyy-MM-dd"),
      check_in: format(data.check_in, "HH:mm:ss"),
      check_out: format(data.check_out, "HH:mm:ss"),
    };
    const response = await updateAttendance({ id, data: payload });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("attendance.editAttendance")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={AttendanceForm}
      redirectPath="/dashboard/hr?tab=attendance"
    />
  );
}
