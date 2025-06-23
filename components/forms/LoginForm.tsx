"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { loginValidation } from "@/lib/validations/login";
import { Link } from "@/i18n/routing";
import { useLoginMutation } from "@/redux/services/auth/loginApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/slices/authSlice";
import config from "@/lib/config";
import { setProfile } from "@/redux/slices/profileSlice";
import TextInput from "@/components/formFields/TextInput";
import PasswordInput from "@/components/formFields/PasswordInput";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface LoginError {
  data?: {
    detail?: string;
    non_field_errors?: string[];
  };
  message?: string;
  status?: number;
}

export default function LoginForm() {
  const t = useTranslations("auth.login");

  const dispatch = useDispatch();
  const [Login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email_address: "",
      password: "",
    },
  });

  const onSubmit = async (data: {
    email_address: string;
    password: string;
  }) => {
    setError(null);
    try {
      const response = await Login(data).unwrap();

      const profileResponse = await fetch(`${config.apiUrl}core/profile`, {
        headers: {
          Authorization: `Bearer ${response.access}`,
          "Content-Type": "application/json",
        },
      });

      if (!profileResponse.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const profileData = await profileResponse.json();

      dispatch(
        setCredentials({
          userId: response.user_id,
          email_address: response.email_address,
          accessToken: response.access,
          refreshToken: response.refresh,
        })
      );
      dispatch(setProfile(profileData));
      if (profileData.role !== "client") router.push("/dashboard");
      else router.push("/");
    } catch (error: unknown) {
      let errorMessage = t("error.default");

      const loginError = error as LoginError;

      if (loginError.data?.detail) {
        errorMessage = loginError.data.detail;
      } else if (loginError.data?.non_field_errors?.length) {
        errorMessage = loginError.data.non_field_errors[0];
      } else if (loginError.message) {
        errorMessage = loginError.message;
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

        <TextInput
          control={form.control}
          name="email_address"
          label={t("email")}
          placeholder={t("placeholder.email")}
        />
        <PasswordInput
          control={form.control}
          name="password"
          label={t("password")}
          placeholder={t("placeholder.password")}
        />

        <Link
          className="ml-auto text-[#969696] text-sm xl:text-[20px] font-[600]"
          href="/forget-password"
          passHref
        >
          {t("forgotPassword")}
        </Link>

        <button
          className="bg-[#BD9D28] text-white py-1.5 rounded-xl px-[71px] md:text-sm xl:text-md w-[100%] m-auto"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? t("submitting") : t("title")}
        </button>

        <div className="flex font-[600] text-sm xl:text-[20px] justify-center">
          <p className="mr-1 text-[#8B8B8B]">{t("noAccount")}</p>
          <Link href="/register" className="text-primary" passHref>
            {t("register")}
          </Link>
        </div>
      </form>
    </Form>
  );
}
