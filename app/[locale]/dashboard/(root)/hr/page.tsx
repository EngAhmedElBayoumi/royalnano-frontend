"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CustomTabs from "@/components/dashboard/CustomTabs";
import Attendance from "@/components/dashboard/hr/attendance";
import Bonuses from "@/components/dashboard/hr/Bonuses";
import Employees from "@/components/dashboard/hr/employees";
import Vacations from "@/components/dashboard/hr/vacations";
import Applicants from "@/components/dashboard/hr/Applicants";
import Interviews from "@/components/dashboard/hr/Interviews";
import Competitions from "@/components/dashboard/hr/Competitions";
import Evaluations from "@/components/dashboard/hr/Evaluations";
import Departments from "@/components/dashboard/hr/Departments";

function HrPage() {
  const t = useTranslations("hr.tabs");

  const permissions = useSelector(
    (state: RootState) => state.profile.permissions
  );

  const tabs = [
    {
      label: t("departments"),
      permissionKey: "department",
      icon: (
        <Image
          width="24"
          height="24"
          alt={t("departments")}
          src="/assets/icons/dashboard/hr/departments.svg"
        />
      ),
      content: <Departments />,
    },
    {
      label: t("employees"),
      permissionKey: "employee",
      icon: (
        <Image
          width="24"
          height="24"
          alt={t("employees")}
          src="/assets/icons/dashboard/hr/employees.svg"
        />
      ),
      content: <Employees />,
    },
    {
      label: t("attendance"),
      permissionKey: "attendance",
      icon: (
        <Image
          width="24"
          height="24"
          alt={t("attendance")}
          src="/assets/icons/dashboard/hr/attendance.svg"
        />
      ),
      content: <Attendance />,
    },
    {
      label: t("vacation"),
      permissionKey: "leaverequest",
      icon: (
        <Image
          width="24"
          height="24"
          alt={t("vacation")}
          src="/assets/icons/dashboard/hr/vacations.svg"
        />
      ),
      content: <Vacations />,
    },
    {
      label: t("bonuses"),
      permissionKey: "bonusdeduction",
      icon: (
        <Image
          width="24"
          height="24"
          alt={t("bonuses")}
          src="/assets/icons/dashboard/hr/bonuses.svg"
        />
      ),
      content: <Bonuses />,
    },
    {
      label: t("applicants"),
      permissionKey: "applicant",
      icon: (
        <Image
          width="24"
          height="24"
          alt={t("applicants")}
          src="/assets/icons/dashboard/hr/applicants.svg"
        />
      ),
      content: <Applicants />,
    },
    {
      label: t("interviews"),
      permissionKey: "interview",
      icon: (
        <Image
          width="24"
          height="24"
          alt={t("interviews")}
          src="/assets/icons/dashboard/hr/interviews.svg"
        />
      ),
      content: <Interviews />,
    },
    {
      label: t("competitions"),
      permissionKey: "competition",
      icon: (
        <Image
          width="24"
          height="24"
          alt={t("competitions")}
          src="/assets/icons/dashboard/hr/competitions.svg"
        />
      ),
      content: <Competitions />,
    },
    {
      label: t("evaluations"),
      permissionKey: "evaluation",
      icon: (
        <Image
          width="24"
          height="24"
          alt={t("evaluations")}
          src="/assets/icons/dashboard/hr/evaluations.svg"
        />
      ),
      content: <Evaluations />,
    },
  ];

  const filteredTabs = tabs.filter((tab) => {
    return permissions[tab.permissionKey]?.view;
  });

  return (
    <>
      <CustomTabs tabs={filteredTabs} defaultTab={filteredTabs[0]?.label} />
    </>
  );
}

export default HrPage;
