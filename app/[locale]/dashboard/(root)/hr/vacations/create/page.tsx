"use client";
import VacationsForm, {
  VacationsFormValues,
} from "@/components/dashboard/forms/hr/VacationsForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useCreateVacationMutation } from "@/redux/services/VacationApi";

export default function CreateVacation() {
  // const [createVacation] = useCreateVacationMutation();

  const handleSubmit = async (data: VacationsFormValues) => {
    console.log(data);
    // await createVacation(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/add.svg"
          title="Add Vacation"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <VacationsForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
