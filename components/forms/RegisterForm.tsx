"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerValidation } from "@/lib/validations/register";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useRegisterMutation } from "@/redux/services/registerApi";

export default function RegisterForm() {
  const [register, { isLoading }] = useRegisterMutation();

  const form = useForm({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      email_address: "",
      name: "",
      password: "",
      phone_number: "",
    },
    // mode: "onChange",
  });

  const onSubmit = async (data: {
    email_address: string;
    name: string;
    password: string;
    phone_number: string;
  }) => {
    try {
      await register({ ...data, role: "client" }).unwrap();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-4 flex flex-col pt-[35px] pr-10 pl-7"
      >
        <p className="text-center font-[600] text-[25px]">Register</p>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Column */}
          <div className="mr-4 flex flex-col gap-4">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0 w-full">
                  <FormLabel className="text-subtitle font-[500] text-sm xl:text-[20px]">
                    Name
                  </FormLabel>
                  <FormControl className="flex-1 text-gray-200">
                    <Input
                      placeholder="Name"
                      type="text"
                      className="p-1 bg-white border-[0.5px] border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm">
                    {form.formState.errors.name?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0 w-full">
                  <FormLabel className="text-subtitle font-[500] text-sm xl:text-[20px]">
                    Phone Number
                  </FormLabel>
                  <FormControl className="flex-1 text-gray-200">
                    <Input
                      placeholder="Phone Number"
                      type="tel"
                      className="p-1 bg-white border-[0.5px] border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm">
                    {form.formState.errors.phone_number?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0 w-full">
                  <FormLabel className="text-subtitle font-[500] text-sm xl:text-[20px]">
                    Password
                  </FormLabel>
                  <FormControl className="flex-1 text-gray-200">
                    <Input
                      type="password"
                      placeholder="Password"
                      className="p-1 bg-white border-[0.5px] border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm">
                    {form.formState.errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email_address"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0 w-full">
                  <FormLabel className="text-subtitle font-[500] text-sm xl:text-[20px]">
                    Email
                  </FormLabel>
                  <FormControl className="flex-1 text-gray-200">
                    <Input
                      placeholder="Email"
                      type="email"
                      className="p-1 bg-white border-[0.5px] border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm">
                    {form.formState.errors.email_address?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
        </div>

        <button
          className="bg-[#BD9D28] text-white py-1.5 rounded-xl px-[71px] md:text-sm xl:text-md w-[100%] m-auto"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Register"}
        </button>

        <div className="flex font-[600] text-sm xl:text-[20px] justify-center">
          <p className="mr-1 text-[#8B8B8B]">Already have an account?</p>
          <Link href="/login" className="text-primary" passHref>
            Log in
          </Link>
        </div>

        <div className="flex items-center">
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
        </Button>
      </form>
    </Form>
  );
}
