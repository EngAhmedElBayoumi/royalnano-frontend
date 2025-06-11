"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { changePasswordValidation } from "@/lib/validations/changePasswordValidation";
import { useState } from "react";
import { useResetPasswordMutation } from "@/redux/services/resetPassword";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTranslations } from "next-intl";

interface ChangePasswordError {
  data?: {
    detail?: string;
    password?: string[];
    confirmPassword?: string[];
    non_field_errors?: string[];
  };
  message?: string;
  status?: number;
}

export default function ChangePasswordForm() {
  const t = useTranslations("auth.changePassword");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const form = useForm({
    resolver: zodResolver(changePasswordValidation),
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
  });

  const [isNumbersChecked, setIsNumbersChecked] = useState(false);
  const [isLettersChecked, setIsLettersChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: {
    confirmPassword: string;
    password: string;
  }) => {
    setError(null);
    try {
      await resetPassword(data).unwrap();
    } catch (error: unknown) {
      let errorMessage = t("error.default");

      const changeError = error as ChangePasswordError;

      if (changeError.data?.detail) {
        errorMessage = changeError.data.detail;
      } else if (changeError.data?.password?.length) {
        errorMessage = changeError.data.password[0];
      } else if (changeError.data?.confirmPassword?.length) {
        errorMessage = changeError.data.confirmPassword[0];
      } else if (changeError.data?.non_field_errors?.length) {
        errorMessage = changeError.data.non_field_errors[0];
      } else if (changeError.message) {
        errorMessage = changeError.message;
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
        <p className="text-center text-primary font-[600] text-[25px]">
          {t("title")}
        </p>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-0 w-full ">
              <FormLabel className="text-subtitle font-[500] text-sm xl:text-[20px] ">
                {t("password")}
              </FormLabel>
              <FormControl className="flex-1 text-gray-200 ">
                <Input
                  type="password"
                  placeholder={t("password")}
                  className="p-1 bg-white border-[0.5] border-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-0 w-full">
              <FormLabel className="text-subtitle font-[500] text-sm xl:text-[20px] ">
                {t("confirmPassword")}
              </FormLabel>
              <FormControl className="flex-1 text-gray-200 ">
                <Input
                  placeholder={t("confirmPassword")}
                  type="password"
                  className="p-1 bg-white border-[0.5] border-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4">
          <p className="text-[#8B8B8B] font-[600] text-[16px]">
            {t("passwordRequirements")}
          </p>

          <div className="flex flex-col gap-2 ">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="numbers"
                checked={isNumbersChecked}
                onChange={() => setIsNumbersChecked(!isNumbersChecked)}
                className={`mr-2 ${isNumbersChecked ? "bg-primary" : ""}`}
              />
              <label
                htmlFor="numbers"
                className={`${isNumbersChecked ? "text-primary" : ""}`}
              >
                {t("numbers")}
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="letters"
                checked={isLettersChecked}
                onChange={() => setIsLettersChecked(!isLettersChecked)}
                className={`mr-2 ${isLettersChecked ? "text-primary" : ""}`}
              />
              <label
                htmlFor="letters"
                className={`${isLettersChecked ? "text-primary" : ""}`}
              >
                {t("letters")}
              </label>
            </div>
          </div>
        </div>

        <button
          className="bg-[#BD9D28] text-white py-1.5 rounded-xl px-[71px] md:text-sm xl:text-md w-[100%] m-auto mt-[15%]"
          type="submit"
        >
          {isLoading ? t("submitting") : t("submit")}
        </button>
      </form>
    </Form>
  );
}
