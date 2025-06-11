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
import { usePostContactMutation } from "@/redux/services/website/contactApi";
import { useState } from "react";
import CustomModal from "../modals/CustomModal";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [postContact, { isLoading }] = usePostContactMutation();
  const t = useTranslations("website.ContactForm");

  const form = useForm({
    resolver: zodResolver(aboutValidation),
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      message: "",
    },
  });

  const onSubmit = async (data: {
    full_name: string;
    email: string;
    phone_number: string;
    message: string;
  }) => {
    await postContact(data);
    form.reset();
    setIsOpen(true);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[80%] md:mb-0 mb-4 flex flex-col gap-2 h-[643px] border border-primary rounded-[16px] pt-9 px-6 pb-5 bg-[#EDEDED]"
      >
        <CustomModal
          isOpen={isOpen}
          onChange={(isOpen) => setIsOpen(isOpen)}
          title={t("thankYou")}
          description={t("thankYouMessage")}
        />

        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-0 w-full">
              <FormLabel className="text-subtitle font-[500] text-sm xl:text-[20px] ">
                {t("fullName")}
              </FormLabel>
              <FormControl className="flex-1 text-gray-200 ">
                <Input
                  placeholder={t("fullName")}
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
              <FormLabel className="text-subtitle font-[500] text-sm xl:text-[20px] ">
                {t("email")}
              </FormLabel>
              <FormControl className="flex-1 text-gray-200 ">
                <Input
                  placeholder={t("email")}
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
              <FormLabel className="text-subtitle font-[500] text-sm xl:text-[20px] ">
                {t("phoneNumber")}
              </FormLabel>
              <FormControl className="flex-1 text-gray-200 ">
                <Input
                  placeholder={t("phoneNumber")}
                  type="text"
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
              <FormLabel className="text-subtitle font-[500] text-sm xl:text-[20px]  ">
                {t("message")}
              </FormLabel>
              <FormControl className="flex-1 text-gray-200 ">
                <Textarea
                  placeholder={t("message")}
                  className="p-3 bg-white border-[0.5] border-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-[#BD9D28] text-white py-1.5 px-[71px] md:text-sm xl:text-md w-[197px] m-auto"
          type="submit"
        >
          {isLoading ? t("sending") : t("send")}
        </Button>
      </form>
    </Form>
  );
}
