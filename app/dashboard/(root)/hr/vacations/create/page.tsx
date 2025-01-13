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

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <VacationsForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
