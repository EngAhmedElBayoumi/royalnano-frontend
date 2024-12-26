"use client";
import { zodResolver } from "@hookform/resolvers/zod";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
import Link from "next/link";
import Image from "next/image";

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      email: "",
      confirmPassword: "",
      lastName: "",
      firstName: "",
      password: "",
      phoneNumber: "",
    },
  });
  const onSubmit = async () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" gap-5 flex flex-col pt-[35px] pr-10 pl-7"
      >
        <p className="text-center  font-[600] text-[25px]">Register</p>
        <div className=" grid grid-cols-1 lg:grid-cols-2">
          <div className="mr-4  flex flex-col gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0 w-full">
                  <FormLabel className="text-subtitle font-[500] text-[20px] ">
                    First Name
                  </FormLabel>
                  <FormControl className="flex-1 text-gray-200 ">
                    <Input
                      placeholder="First Name"
                      type="text"
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0 w-full">
                  <FormLabel className="text-subtitle font-[500] text-[20px] ">
                    Phone Number
                  </FormLabel>
                  <FormControl className="flex-1 text-gray-200 ">
                    <Input
                      placeholder=" Phone Number"
                      type="tel"
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
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0 w-full ">
                  <FormLabel className="text-subtitle font-[500] text-[20px]  ">
                    Password
                  </FormLabel>
                  <FormControl className="flex-1 text-gray-200 ">
                    <Input
                      type="password"
                      placeholder="Password"
                      className="p-1 bg-white border-[0.5] border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0 w-full">
                  <FormLabel className="text-subtitle font-[500] text-[20px] ">
                    Last Name
                  </FormLabel>
                  <FormControl className="flex-1 text-gray-200 ">
                    <Input
                      placeholder="Last Name"
                      type="text"
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
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0 w-full">
                  <FormLabel className="text-subtitle font-[500] text-[20px] ">
                    Email
                  </FormLabel>
                  <FormControl className="flex-1 text-gray-200 ">
                    <Input
                      placeholder="Email"
                      type="email"
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
                <FormItem className="flex flex-col gap-0 w-full ">
                  <FormLabel className="text-subtitle font-[500] text-[20px]  ">
                    Confirm Password
                  </FormLabel>
                  <FormControl className="flex-1 text-gray-200 ">
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      className="p-1 bg-white border-[0.5] border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <button
          className="bg-[#BD9D28] text-white py-1.5 rounded-xl px-[71px] text-md w-[100%] m-auto"
          type="submit"
        >
          Register
        </button>

        <div className="flex font-[600] text-[20px] justify-center">
          <p className="mr-1  text-[#8B8B8B] ">Already have an account ? </p>{" "}
          <Link href={"/login"} className="text-primary">
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
            alt="fb"
            width={30}
            height={30}
            className="me-2"
          />
          Google
        </Button>
        <Button className="bg-white border text-[#0047B2] font-[600] text-[25px] h-11 border-subtitle">
          <Image
            src="/assets/icons/btnFB.svg"
            alt="fb"
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
