"use client";
import { zodResolver } from "@hookform/resolvers/zod";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
import { useState } from "react"; // Import useState for checkbox state
import { useResetPasswordMutation } from "@/redux/services/resetPassword";

export default function ChangePasswordForm() {
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

  const onSubmit = async (data: {
    confirmPassword: string;
    password: string;
  }) => {
    await resetPassword(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-4 flex flex-col pt-[35px] pr-10 pl-7"
      >
        <p className="text-center text-primary font-[600] text-[25px]">
          Change Password
        </p>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-0 w-full ">
              <FormLabel className="text-subtitle font-[500] text-sm xl:text-[20px] ">
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-0 w-full">
              <FormLabel className="text-subtitle font-[500] text-sm xl:text-[20px] ">
                Confirm Password
              </FormLabel>
              <FormControl className="flex-1 text-gray-200 ">
                <Input
                  placeholder="Confirm Password"
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
            Your Password Must Contain
          </p>

          {/* Checkboxes for Numbers and Letters */}
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
                Numbers
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
                Letters
              </label>
            </div>
          </div>
        </div>

        <button
          className="bg-[#BD9D28] text-white py-1.5 rounded-xl px-[71px] md:text-sm xl:text-md w-[100%] m-auto mt-[15%]"
          type="submit"
        >
          {isLoading ? "submitting ..." : "Reset"}
        </button>
      </form>
    </Form>
  );
}
