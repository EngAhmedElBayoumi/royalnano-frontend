"use client";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateAttendanceMutation } from "@/redux/services/dashboard/hr/attendanceApi";
import AttendanceForm, {
  AttendanceFormValues,
} from "@/components/dashboard/forms/hr/AttendanceForm";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateAttendance() {
  const t = useTranslations("hr");
  const [createAttendance, { isLoading }] = useCreateAttendanceMutation();

  const handleSubmit = async (data: AttendanceFormValues) => {
    const payload = {
      ...data,
      employee: Number(data.employee),
      branch: Number(data.branch),
      date: format(data.check_in, "yyyy-MM-dd"),
      check_in: format(data.check_in, "HH:mm:ss"),
      check_out: format(data.check_out, "HH:mm:ss"),
    };
    const response = await createAttendance(payload);
    if (response.error) handleApiError(response.error);
  };

  return (
    <CreatePage
      title={t("attendance.addAttendance")}
      onSubmit={handleSubmit}
      Form={AttendanceForm}
      isLoading={isLoading}
      redirectPath={`/dashboard/hr?tab=${t("tabs.attendance")}`}
    />
  );
}
