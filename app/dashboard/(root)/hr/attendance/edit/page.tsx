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

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <AttendanceForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </div>
    </main>
  );
}
