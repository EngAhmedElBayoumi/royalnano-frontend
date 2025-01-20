import CustomTabs from "@/components/dashboard/CustomTabs";
import Attendance from "@/components/dashboard/hr/attendance";
import Bonuses from "@/components/dashboard/hr/Bonuses";
import Employees from "@/components/dashboard/hr/employees";
import Salaries from "@/components/dashboard/hr/salaries";
import Vacations from "@/components/dashboard/hr/vacations";
import Image from "next/image";
import React from "react";
function HrPage() {
  const tabs = [
    {
      label: "Employees",
      icon: (
        <Image
          width="24"
          height="24"
          alt="employees"
          src="/assets/icons/dashboard/hr/employees.svg"
        />
      ),
      content: <Employees />,
    },
    {
      icon: (
        <Image
          width="24"
          height="24"
          alt="salaries"
          src="/assets/icons/dashboard/hr/salaries.svg"
        />
      ),
      label: "Salary",
      content: <Salaries />,
    },
    {
      icon: (
        <Image
          width="24"
          height="24"
          alt="bonuses"
          src="/assets/icons/dashboard/hr/bonuses.svg"
        />
      ),
      label: "Bonuses",
      content: <Bonuses />,
    },
    {
      icon: (
        <Image
          width="24"
          height="24"
          alt="vacations"
          src="/assets/icons/dashboard/hr/vacations.svg"
        />
      ),
      label: "Vacation",
      content: <Vacations />,
    },
    {
      icon: (
        <Image
          width="24"
          height="24"
          alt="vacations"
          src="/assets/icons/dashboard/hr/attendance.svg"
        />
      ),
      label: "Attendance",
      content: <Attendance />,
    },
  ];

  return (
    <>
      <CustomTabs tabs={tabs} defaultTab="Employees" />
    </>
  );
}

export default HrPage;
