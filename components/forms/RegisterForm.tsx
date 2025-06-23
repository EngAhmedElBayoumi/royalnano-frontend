"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { registerValidation } from "@/lib/validations/register";
import { Link } from "@/i18n/routing";
import { useRegisterMutation } from "@/redux/services/auth/registerApi";
import TextInput from "@/components/formFields/TextInput";
import PhoneInputField from "@/components/formFields/PhoneInputField";
import PasswordInput from "@/components/formFields/PasswordInput";
import CustomButton from "@/components/formFields/CustomButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("auth.register");

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
      let errorMessage = t("error.default");

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
        <p className="text-center font-[600] text-[25px]">{t("title")}</p>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TextInput
            control={form.control}
            name="first_name"
            label={t("firstName")}
            placeholder={t("firstName")}
          />
          <TextInput
            control={form.control}
            name="last_name"
            label={t("lastName")}
            placeholder={t("lastName")}
          />
          <PhoneInputField
            control={form.control}
            name="phone_number"
            label={t("phone")}
          />
          <TextInput
            control={form.control}
            name="email_address"
            label={t("email")}
            placeholder={t("email")}
          />
          <PasswordInput
            control={form.control}
            name="password"
            label={t("password")}
            placeholder={t("password")}
          />
          <PasswordInput
            control={form.control}
            name="confirm_password"
            label={t("confirmPassword")}
            placeholder={t("confirmPassword")}
          />
        </div>

        <CustomButton
          text={isLoading ? t("submitting") : t("submit")}
          isDisabled={isLoading}
          className="bg-primaryDark"
        />

        <div className="flex font-[600] text-sm xl:text-[20px] justify-center">
          <p className="mr-1 text-[#8B8B8B]">{t("alreadyHaveAccount")}?</p>
          <Link href="/login" className="text-primary" passHref>
            {t("login")}
          </Link>
        </div>
      </form>
    </Form>
  );
}
