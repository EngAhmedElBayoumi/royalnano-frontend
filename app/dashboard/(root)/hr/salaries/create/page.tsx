"use client";
import SalaryForm, {
  SalaryFormValues,
} from "@/components/dashboard/forms/hr/SalaryForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useCreateSalaryMutation } from "@/redux/services/SalaryApi";

export default function CreateSalary() {
  // const [createSalary] = useCreateSalaryMutation();

  const handleSubmit = async (data: SalaryFormValues) => {
    console.log(data);
    // await createSalary(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/add.svg"
          title="Add Salary"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <SalaryForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
