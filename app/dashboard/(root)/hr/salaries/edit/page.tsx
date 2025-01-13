"use client";
import SalaryForm, {
  SalaryFormValues,
} from "@/components/dashboard/forms/hr/SalaryForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useUpdateSalaryMutation } from "@/redux/services/SalaryApi";

export default function EditSalary() {
  // const [updateSalary] = useUpdateSalaryMutation();
  const defaultValues: SalaryFormValues = {
    name: "Jane Doe",
    job_title: "Manager",
    salary: "60000",
    date: new Date(),
  }; // Fetch existing salary data and set as default values

  const handleSubmit = async (data: SalaryFormValues) => {
    console.log(data);
    // await updateSalary(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/edit.svg"
          title="Edit Salary"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <SalaryForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </div>
    </main>
  );
}
