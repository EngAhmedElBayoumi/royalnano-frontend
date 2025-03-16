"use client";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import config from "@/lib/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LanguageSwitcher from "../languageSwitcher";

const baseUrl = config.apiUrl;
const DashboardNavbar = () => {
  const methods = useForm();
  const name = useSelector((state: RootState) => state.profile.name);
  const emailAddress = useSelector(
    (state: RootState) => state.profile.emailAddress
  );
  const profilePicture = useSelector(
    (state: RootState) => state.profile.profilePicture
  );

  return (
    <nav className="absolute ltr:right-0 -top-8 flex justify-end items-center gap-2 pt-10">
      <Avatar>
        <AvatarImage src={baseUrl + profilePicture} />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      <h3>{name ?? emailAddress?.substring(0, emailAddress.indexOf("@"))}</h3>

      <FormProvider {...methods}>
        <LanguageSwitcher />
      </FormProvider>
    </nav>
  );
};

export default DashboardNavbar;
