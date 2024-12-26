import AuthTemplate from "@/components/AuthTemplate";
import RegisterForm from "@/components/forms/RegisterForm";
import React from "react";

export const metadata = {
  title: "Register | Royal Nano",
  description: "Register to use our platform",
};
const Page = () => {
  return (
    <>
      <AuthTemplate src="/assets/images/auth.png" Form={RegisterForm} />
    </>
  );
};

export default Page;
