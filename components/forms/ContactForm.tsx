"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { aboutValidation } from "@/lib/validations/contact";
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
import { Textarea } from "../ui/textarea";

export default function ContactForm() {
  const form = useForm({
    resolver: zodResolver(aboutValidation),
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      message: "",
    },
  });
  const onSubmit = async (data: any) => {
    console.log("Submitted Data:", data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[100%] md:mb-0 mb-4 flex flex-col gap-2 h-[643px] border border-primary rounded-[16px] pt-9 px-6 pb-5 bg-[#EDEDED]"
      >
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-0 w-full">
              <FormLabel className="text-subtitle font-[500] text-[20px] ">
                Full Name
              </FormLabel>
              <FormControl className="flex-1 text-gray-200 ">
                <Input
                  placeholder="Full Name"
                  type="text"
                  className="bg-white p-3 border-[0.5] border-primary"
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
                  className="p-3 bg-white border-[0.5] border-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-0 w-full">
              <FormLabel className="text-subtitle font-[500] text-[20px] ">
                Phone Number
              </FormLabel>
              <FormControl className="flex-1 text-gray-200 ">
                <Input
                  placeholder="Phone Number"
                  type="tel"
                  className="p-3 border-[0.5] border-primary bg-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-0 w-full ">
              <FormLabel className="text-subtitle font-[500] text-[20px]  ">
                Message
              </FormLabel>
              <FormControl className="flex-1 text-gray-200 ">
                <Textarea
                  placeholder="Message"
                  className="p-3 bg-white border-[0.5] border-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-[#BD9D28] text-white py-1.5 px-[71px] text-md w-[197px] m-auto"
          type="submit"
        >
          Send
        </Button>
      </form>
    </Form>
  );
}
