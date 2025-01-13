"use client";
import EmployeeForm, {
  EmployeeFormValues,
} from "@/components/dashboard/forms/EmployeeForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useUpdateEmployeeMutation } from "@/redux/services/EmployeeApi";

export default function EditEmployee() {
  // const [updateEmployee] = useUpdateEmployeeMutation();
  const defaultValues: EmployeeFormValues = {
    name: "John Doe",
    phone_number: "0123456789",
    address: "123 Main St",
    job_title: "Software Engineer",
    email: "john.doe@example.com",
    date: new Date(),
    salary: "50000",
    permissions: {
      "Add service": true,
      "Edit service": false,
      "Delete service": true,
      "View service": true,
    },
  }; // Fetch existing employee data and set as default values

  const handleSubmit = async (data: EmployeeFormValues) => {
    console.log(data);
    // await updateEmployee(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/edit.svg"
          title="Edit Employee"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <EmployeeForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </div>
    </main>
  );
}
