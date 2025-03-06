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

function HrPage() {
  const t = useTranslations("hr.tabs");

  const permissions = useSelector(
    (state: RootState) => state.profile.permissions
  );

  const tabs = [
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
      label: "applicants",
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
  ].filter((tab) => {
    // Check if the user has view permission for the tab using the permissionKey
    return permissions[tab.permissionKey]?.view;
  });

  return (
    <>
      <CustomTabs tabs={tabs} defaultTab={t("employees")} />
    </>
  );
}

export default HrPage;
