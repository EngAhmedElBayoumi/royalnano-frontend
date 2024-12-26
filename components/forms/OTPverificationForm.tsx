"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OTPValidation } from "@/lib/validations/OTPValidation";

export default function OTPverificationForm() {
  const form = useForm({
    resolver: zodResolver(OTPValidation),
    defaultValues: {
      num1: "",
      num2: "",
      num3: "",
      num4: "",
      num5: "",
      num6: "",
    },
  });

  const onSubmit = async () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-5 h-[100%] flex flex-col pt-[80px] pr-10 pl-7"
      >
        <p className="text-center font-[600] text-[25px]">OTP Verification</p>
        <div>
          <p className="text-center text-[#8B8B8B] font-[400] text-[20px]">
            Please enter the code send to your mobile
          </p>
          <p className="text-center text-[#8B8B8B] font-[400] text-[20px]">
            number <span className="text-primary">01027489652</span>
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <FormField
            control={form.control}
            name="num1"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0 w-full h-[48px] w-[48px]">
                <FormControl>
                  <div className="flex items-center bg-white border border-primary rounded-lg overflow-hidden">
                    <Input
                      type="number"
                      className="p-3 border rounded-1 focus:outline-1 focus:ring-0 appearance-none"
                      {...field}
                      value={field.value}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="num2"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0 w-full h-[48px] w-[48px]">
                <FormControl>
                  <div className="flex items-center bg-white border border-primary rounded-lg overflow-hidden">
                    <Input
                      type="number"
                      className="p-3 border rounded-1 focus:outline-1 focus:ring-0 appearance-none"
                      {...field}
                      value={field.value}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="num3"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0 w-full h-[48px] w-[48px]">
                <FormControl>
                  <div className="flex items-center bg-white border border-primary rounded-lg overflow-hidden">
                    <Input
                      type="number"
                      className="p-3 border rounded-1 focus:outline-1 focus:ring-0 appearance-none"
                      {...field}
                      value={field.value}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="num4"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0 w-full h-[48px] w-[48px]">
                <FormControl>
                  <div className="flex items-center bg-white border border-primary rounded-lg overflow-hidden">
                    <Input
                      type="number"
                      className="p-3 border rounded-1 focus:outline-1 focus:ring-0 appearance-none"
                      {...field}
                      value={field.value}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="num5"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0 w-full h-[48px] w-[48px]">
                <FormControl>
                  <div className="flex items-center bg-white border border-primary rounded-lg overflow-hidden">
                    <Input
                      type="number"
                      className="p-3 border rounded-1 focus:outline-1 focus:ring-0 appearance-none"
                      {...field}
                      value={field.value}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="num6"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0 w-full h-[48px] w-[48px]">
                <FormControl>
                  <div className="flex items-center bg-white border border-primary rounded-lg overflow-hidden">
                    <Input
                      type="number"
                      className="p-3 border rounded-1 focus:outline-1 focus:ring-0 appearance-none"
                      {...field}
                      value={field.value}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <p className="text-center text-[#8B8B8B] font-[400] text-[20px]">
          I didn`t receive any code . RESEND
        </p>

        <button
          className="bg-[#BD9D28] text-white py-1.5 rounded-xl px-[71px] font-[700] text-[20px] w-[100%] mt-[40%]"
          type="submit"
        >
          Submit
        </button>
      </form>
    </Form>
  );
}
