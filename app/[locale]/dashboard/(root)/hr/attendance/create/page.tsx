"use client";
import { useTranslations } from "next-intl";
import AttendanceForm, {
  AttendanceFormValues,
} from "@/components/dashboard/forms/hr/AttendanceForm";
import CreatePage from "@/components/dashboard/CreatePage";
// import { useCreateAttendanceMutation } from "@/redux/services/AttendanceApi";

export default function CreateAttendance() {
  const t = useTranslations("hr");
  // const [createAttendance] = useCreateAttendanceMutation();

  const handleSubmit = async (data: AttendanceFormValues) => {
    console.log(data);
    // await createAttendance(data);
    // Uncomment the following lines when the API is ready
    // const response = await createAttendance(data);
    // if (response.error) throw new Error("creation failed");
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
