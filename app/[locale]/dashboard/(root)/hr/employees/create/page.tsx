"use client";
import EmployeeForm, {
  EmployeeFormValues,
} from "@/components/dashboard/forms/hr/EmployeeForm";
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

      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <EmployeeForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
