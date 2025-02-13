import AuthTemplate from "@/components/AuthTemplate";
import LoginForm from "@/components/forms/LoginForm";
import React from "react";

export const metadata = {
  title: "Login | Royal Nano",
  description: "Login to use our platform",
};
const Page = () => {
  return (
    <>
      <AuthTemplate src="/assets/images/auth.png" Form={LoginForm} />
    </>
  );
};

export default Page;
