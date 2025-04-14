"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { registerValidation } from "@/lib/validations/register";
import { Link } from "@/i18n/routing";
// import Image from "next/image";
import { useRegisterMutation } from "@/redux/services/registerApi";
import TextInput from "@/components/formFields/TextInput";
import PhoneInputField from "@/components/formFields/PhoneInputField";
import PasswordInput from "@/components/formFields/PasswordInput";
import CustomButton from "@/components/formFields/CustomButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";

interface RegisterError {
  data?: {
    detail?: string;
    email_address?: string[];
    phone_number?: string[];
    password?: string[];
    non_field_errors?: string[];
  };
  message?: string;
  status?: number;
}

export default function RegisterForm() {
  const [register, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email_address: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: {
    first_name: string;
    last_name: string;
    phone_number: string;
    email_address: string;
    password: string;
    confirm_password: string;
  }) => {
    setError(null);
    try {
      await register({
        ...data,
        name: data?.first_name + " " + data?.last_name,
        role: "client",
      }).unwrap();
    } catch (error: unknown) {
      let errorMessage = "An error occurred during registration";

      const registerError = error as RegisterError;

      if (registerError.data?.detail) {
        errorMessage = registerError.data.detail;
      } else if (registerError.data?.email_address?.length) {
        errorMessage = registerError.data.email_address[0];
      } else if (registerError.data?.phone_number?.length) {
        errorMessage = registerError.data.phone_number[0];
      } else if (registerError.data?.password?.length) {
        errorMessage = registerError.data.password[0];
      } else if (registerError.data?.non_field_errors?.length) {
        errorMessage = registerError.data.non_field_errors[0];
      } else if (registerError.message) {
        errorMessage = registerError.message;
      }

      setError(errorMessage);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-4 flex flex-col p-4 sm:px-7"
      >
        <p className="text-center font-[600] text-[25px]">Register</p>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TextInput
            control={form.control}
            name="first_name"
            label="first Name"
            placeholder="first Name"
          />
          <TextInput
            control={form.control}
            name="last_name"
            label="last Name"
            placeholder="last Name"
          />
          <PhoneInputField
            control={form.control}
            name="phone_number"
            label="Phone Number"
          />

          <TextInput
            control={form.control}
            name="email_address"
            label="Email"
            placeholder="Email"
          />
          <PasswordInput
            control={form.control}
            name="password"
            label="Password"
            placeholder="Password"
          />
          <PasswordInput
            control={form.control}
            name="confirm_password"
            label="confirm_password"
            placeholder="confirm_password"
          />
        </div>

        <CustomButton
          text={isLoading ? "Submitting..." : "Register"}
          isDisabled={isLoading}
          className="bg-primaryDark"
        />

        <div className="flex font-[600] text-sm xl:text-[20px] justify-center">
          <p className="mr-1 text-[#8B8B8B]">Already have an account?</p>
          <Link href="/login" className="text-primary" passHref>
            Log in
          </Link>
        </div>

        {/* <div className="flex items-center">
          <div className="w-[203px] h-[2px] bg-subtitle"></div>
          <p className="mx-[27px] text-[25px] font-[500] text-[#5A5A5A]">OR</p>
          <div className="w-[203px] h-[2px] bg-subtitle"></div>
        </div>

        <Button className="bg-white border text-[#EC0000] font-[600] text-[25px] h-11 border-subtitle">
          <Image
            src="/assets/icons/btnGoogle.svg"
            alt="Google"
            width={30}
            height={30}
            className="me-2"
          />
          Google
        </Button>

        <Button className="bg-white border text-[#0047B2] font-[600] text-[25px] h-11 border-subtitle">
          <Image
            src="/assets/icons/btnFB.svg"
            alt="Facebook"
            width={30}
            height={30}
            className="me-2"
          />
          Facebook
        </Button> */}
      </form>
    </Form>
  );
}
