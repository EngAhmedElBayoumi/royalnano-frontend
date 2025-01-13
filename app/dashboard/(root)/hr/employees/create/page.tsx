"use client";
import EmployeeForm, {
  EmployeeFormValues,
} from "@/components/dashboard/forms/EmployeeForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useCreateEmployeeMutation } from "@/redux/services/EmployeeApi";

export default function CreateEmployee() {
  // const [createEmployee] = useCreateEmployeeMutation();

  const handleSubmit = async (data: EmployeeFormValues) => {
    console.log(data);
    // await createEmployee(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/add.svg"
          title="Add Employee"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <EmployeeForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
