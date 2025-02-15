"use client";
import AttendanceForm, {
  AttendanceFormValues,
} from "@/components/dashboard/forms/hr/AttendanceForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useUpdateAttendanceMutation } from "@/redux/services/AttendanceApi";

export default function EditAttendance() {
  // const [updateAttendance] = useUpdateAttendanceMutation();
  const defaultValues: AttendanceFormValues = {
    name: "John Doe",
    attendance: new Date(new Date().setHours(new Date().getHours() - 8)),
    departure: new Date(),
    working_hours: 8,
  };

  const handleSubmit = async (data: AttendanceFormValues) => {
    console.log(data);
    // await updateAttendance(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/edit.svg"
          title="Edit Attendance"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <AttendanceForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </div>
    </main>
  );
}
