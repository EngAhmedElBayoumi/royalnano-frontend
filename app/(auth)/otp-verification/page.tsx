import AuthTemplate from "@/components/AuthTemplate";
import OTPverificationForm from "@/components/forms/OTPverificationForm";
import React from "react";

export const metadata = {
  title: "OTP Verification | Royal Nano",
  description: "",
};
//y2bl 1 integer when typed , g to next one,..
//book now
const Page = () => {
  return (
    <>
      <AuthTemplate src="/assets/images/otp.png" Form={OTPverificationForm} />
    </>
  );
};

export default Page;
