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

      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <SalaryForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </div>
    </main>
  );
}
