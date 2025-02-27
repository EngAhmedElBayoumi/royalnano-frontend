"use client";
import AttendanceForm, {
  AttendanceFormValues,
} from "@/components/dashboard/forms/hr/AttendanceForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useCreateAttendanceMutation } from "@/redux/services/AttendanceApi";

export default function CreateAttendance() {
  // const [createAttendance] = useCreateAttendanceMutation();

  const handleSubmit = async (data: AttendanceFormValues) => {
    console.log(data);
    // await createAttendance(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/add.svg"
          title="Add Attendance"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <AttendanceForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
