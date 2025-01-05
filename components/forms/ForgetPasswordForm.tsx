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
import { forgetPasswordValidation } from "@/lib/validations/forgetPasswordValidation";
import { useForgotPasswordMutation } from "@/redux/services/forgotPasswordApi";

export default function ForgetPasswordForm() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const form = useForm({
    resolver: zodResolver(forgetPasswordValidation),
    defaultValues: {
      email_address: "",
    },
  });

  const onSubmit = async (data: { email_address: string }) => {
    try {
      const response = await forgotPassword(data).unwrap();
      console.log(response);

      form.reset();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-5 h-[100%] flex flex-col pt-[80px] pr-10 pl-7"
      >
        <p className="text-center font-[600] text-[25px]">Forget Password</p>
        <div>
          <p className="text-center text-[#8B8B8B] font-[400] text-[20px]">
            Please enter your email to send to
          </p>
          <p className="text-center text-[#8B8B8B] font-[400] text-[20px]">
            you a verification code
          </p>
        </div>

        <FormField
          control={form.control}
          name="email_address"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-0 w-full">
              <FormLabel className="text-subtitle font-[500] text-[20px]">
                Email address
              </FormLabel>
              <FormControl>
                <div className="flex items-center bg-white border border-primary rounded-lg overflow-hidden">
                  {/* <div className="flex items-center px-3 bg-gray-100">
                    <span className="text-[#8B8B8B] font-[500] text-[16px] me-2">
                      +20
                    </span>
                    <Image
                      height={16}
                      width={27}
                      src="/assets/icons/egypt.svg"
                      alt="Egyptian flag"
                      className="mr-2"
                    />
                  </div> */}
                  {/* Input Field */}
                  <Input
                    placeholder="Email address"
                    type="email"
                    className="p-3 border-0 rounded-none flex-1 focus:outline-none focus:ring-0"
                    {...field}
                    value={field.value}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          className="bg-[#BD9D28] text-white py-1.5 rounded-xl px-[71px] font-[700] text-[20px] w-[100%] mt-[50%]"
          type="submit"
        >
          {isLoading ? "sending ..." : "Send OTP"}
        </button>
      </form>
    </Form>
  );
}
