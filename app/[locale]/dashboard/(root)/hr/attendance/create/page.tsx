"use client";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { useCreateAttendanceMutation } from "@/redux/services/dashboard/hr/attendanceApi";
import AttendanceForm, {
  AttendanceFormValues,
} from "@/components/dashboard/forms/hr/AttendanceForm";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateAttendance() {
  const t = useTranslations("hr");
  const [createAttendance] = useCreateAttendanceMutation();

  const handleSubmit = async (data: AttendanceFormValues) => {
    const payload = {
      ...data,
      employee: Number(data.employee),
      branch: Number(data.branch),
      data: format(data.check_in, "yyyy-MM-dd"),
      check_in: format(data.check_in, "hh:mm aa"),
      check_out: format(data.check_out, "hh:mm aa"),
    };
    const response = await createAttendance(payload);
    if (response.error) throw new Error("creation failed");
  };

  return (
    <CreatePage
      title={t("attendance.addAttendance")}
      onSubmit={handleSubmit}
      Form={AttendanceForm}
      redirectPath={`/dashboard/hr?tab=${t("tabs.attendance")}`}
    />
  );
}
