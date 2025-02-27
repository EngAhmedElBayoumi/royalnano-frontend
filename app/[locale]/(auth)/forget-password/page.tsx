import AuthTemplate from "@/components/AuthTemplate";
import ForgetPasswordForm from "@/components/forms/ForgetPasswordForm";
import React from "react";

export const metadata = {
  title: "Login | Royal Nano",
  description: "Login to use our platform",
};
const Page = () => {
  return (
    <>
      <AuthTemplate
        src="/assets/images/forget_password.png"
        Form={ForgetPasswordForm}
      />
    </>
  );
};

export default Page;
