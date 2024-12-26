import AuthTemplate from "@/components/AuthTemplate";
import ChangePasswordForm from "@/components/forms/ChangePassword";
import React from "react";

export const metadata = {
  title: "Change Password | Royal Nano",
  description: "",
};
const Page = () => {
  return (
    <>
      <AuthTemplate
        src="/assets/images/change_password.png"
        Form={ChangePasswordForm}
      />
    </>
  );
};

export default Page;
