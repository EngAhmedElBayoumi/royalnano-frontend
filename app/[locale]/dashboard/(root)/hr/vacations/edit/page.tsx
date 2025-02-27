"use client";
import VacationsForm, {
  VacationsFormValues,
} from "@/components/dashboard/forms/hr/VacationsForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useUpdateVacationMutation } from "@/redux/services/VacationApi";

export default function EditVacation() {
  // const [updateVacation] = useUpdateVacationMutation();
  const defaultValues: VacationsFormValues = {
    name: "Jane Doe",
    job_title: "Developer",
    vacation_period: "2 weeks",
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 1)),
    date: new Date(),
  }; // Fetch existing vacation data and set as default values

  const handleSubmit = async (data: VacationsFormValues) => {
    console.log(data);
    // await updateVacation(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/edit.svg"
          title="Edit Vacation"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <VacationsForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </div>
    </main>
  );
}
