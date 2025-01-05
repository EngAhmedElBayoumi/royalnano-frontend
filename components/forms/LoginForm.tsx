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
import { loginValidation } from "@/lib/validations/login";
import Link from "next/link";
import Image from "next/image";
import { useLoginMutation } from "@/redux/services/loginApi";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [Login, { isLoading }] = useLoginMutation();
  const router = useRouter();

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
    try {
      const response = await Login(data).unwrap(); // Use .unwrap() to handle the promise
      localStorage.setItem("token", response.access); // Access the token from response.data
      console.log("token", response.access);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" gap-5 flex flex-col pt-[35px] pr-10 pl-7"
      >
        <p className="text-center  font-[600] text-[25px]"> Log in</p>
        <FormField
          control={form.control}
          name="email_address"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-0 w-full">
              <FormLabel className="text-subtitle font-[500] text-sm xl:text-[20px] ">
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
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-0 w-full ">
              <FormLabel className="text-subtitle font-[500] text-sm xl:text-[20px]  ">
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
        <Link
          className="ml-auto text-[#969696] text-sm xl:text-[20px] font-[600]"
          href={"/forget-password"}
        >
          Forget Password?
        </Link>
        <button
          className="bg-[#BD9D28] text-white py-1.5 rounded-xl px-[71px] md:text-sm xl:text-md w-[100%] m-auto"
          type="submit"
        >
          Log in
        </button>

        <div className="flex font-[600] text-sm xl:text-[20px] justify-center">
          <p className="mr-1  text-[#8B8B8B] ">Don`t have account ? </p>{" "}
          <Link href="/register" className="text-primary">
            {isLoading ? "Submitting..." : "Login"}
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
