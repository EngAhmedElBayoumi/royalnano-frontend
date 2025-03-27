"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { loginValidation } from "@/lib/validations/login";
import { Link } from "@/i18n/routing";
// import Image from "next/image";
import { useLoginMutation } from "@/redux/services/loginApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/slices/authSlice";
import config from "@/lib/config";
import { setProfile } from "@/redux/slices/profileSlice";
import TextInput from "@/components/formFields/TextInput";
import PasswordInput from "@/components/formFields/PasswordInput";

export default function LoginForm() {
  const dispatch = useDispatch();
  const [Login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginValidation), // Ensure zodResolver is correctly set
    defaultValues: {
      email_address: "",
      password: "",
    },
    // mode: "onChange", // Validate on every change
  });

  const onSubmit = async (data: {
    email_address: string;
    password: string;
  }) => {
    try {
      const response = await Login(data).unwrap();

      const profileResponse = await fetch(`${config.apiUrl}core/profile`, {
        headers: {
          Authorization: `Bearer ${response.access}`,
          "Content-Type": "application/json",
        },
      });
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-4 flex flex-col p-4 sm:px-7"
      >
        <p className="text-center font-[600] text-[25px]">Log in</p>
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

        {/* Forget Password Link */}
        <Link
          className="ml-auto text-[#969696] text-sm xl:text-[20px] font-[600]"
          href="/forget-password"
          passHref
        >
          Forget Password?
        </Link>

        {/* Submit Button */}
        <button
          className="bg-[#BD9D28] text-white py-1.5 rounded-xl px-[71px] md:text-sm xl:text-md w-[100%] m-auto"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Log in"}
        </button>

        {/* Register Link */}
        <div className="flex font-[600] text-sm xl:text-[20px] justify-center">
          <p className="mr-1 text-[#8B8B8B]">Dont have an account?</p>
          <Link href="/register" className="text-primary" passHref>
            Register
          </Link>
        </div>

        {/* Divider with OR */}
        {/* <div className="flex items-center">
          <div className="w-[203px] h-[2px] bg-subtitle"></div>
          <p className="mx-[27px] text-[25px] font-[500] text-[#5A5A5A]">OR</p>
          <div className="w-[203px] h-[2px] bg-subtitle"></div>
        </div> */}

        {/* Google Login Button */}
        {/* <Button className="bg-white border text-[#EC0000] font-[600] text-[25px] h-11 border-subtitle">
          <Image
            src="/assets/icons/btnGoogle.svg"
            alt="Google"
            width={30}
            height={30}
            className="me-2"
          />
          Google
        </Button> */}

        {/* Facebook Login Button */}
        {/* <Button className="bg-white border text-[#0047B2] font-[600] text-[25px] h-11 border-subtitle">
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
