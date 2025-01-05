"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OTPValidation } from "@/lib/validations/OTPValidation";
// import { useVerifyOTPMutation } from "@/redux/services/verifyOTP";
import { useResendOTPMutation } from "@/redux/services/resendOTP";
// import { OTPFieldName } from "../services/types";

export default function OTPverificationForm() {
  // const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const [resendOTPFn] = useResendOTPMutation();
  const form = useForm({
    resolver: zodResolver(OTPValidation),
    defaultValues: {
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0,
      num5: 0,
      num6: 0,
    },
  });

  const onSubmit = async () =>
    //   data: {
    //   num1: number;
    //   num2: number;
    //   num3: number;
    //   num4: number;
    //   num5: number;
    //   num6: number;
    // }
    {
      // await verifyOTP(data);
    };

  const resendOTP = async (data: { data: string }) => {
    await resendOTPFn(data);
  };
  type OTPFieldName = "num1" | "num2" | "num3" | "num4" | "num5" | "num6";
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-5 h-[100%] flex flex-col pt-[80px] pr-10 pl-7"
      >
        <p className="text-center text-primary font-[600] text-[25px]">
          OTP Verification
        </p>
        <div>
          <p className="text-center text-[#8B8B8B] font-[400] text-sm xl:text-[20px]">
            Please enter the code sent to your mobile
          </p>
          <p className="text-center text-[#8B8B8B] font-[400] text-sm xl:text-[20px]">
            number <span className="text-primary">01027489652</span>
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((item) => {
            const fieldName = `num${item}` as OTPFieldName;

            return (
              <FormField
                key={item}
                control={form.control}
                name={fieldName}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-0 w-full h-[48px] w-[48px]">
                    <FormControl>
                      <div
                        className={`flex items-center bg-white border ${
                          form.formState.errors[fieldName]
                            ? "border-red-500"
                            : "border-primary"
                        } rounded-lg overflow-hidden`}
                      >
                        <Input
                          type="number"
                          className="p-3 border rounded-1 focus:outline-1 focus:ring-0 appearance-none"
                          {...field}
                          value={field.value}
                        />
                      </div>
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
            );
          })}
        </div>
        <div className="text-center text-[#8B8B8B] font-[400] text-sm xl:text-[20px] flex justify-center items-center gap-1">
          <p>I didn&apos;t receive any code.</p>
          <button onClick={() => resendOTP({ data: "" })} className="bg-none ">
            RESEND
          </button>
        </div>

        <button
          className="bg-[#BD9D28] text-white py-1.5 rounded-xl px-[71px] font-[700] text-sm xl:text-[20px] w-[100%] mt-[40%]"
          type="submit"
        >
          Submit
          {/* {isLoading ? "Submitting ..." : "Submit"} */}
        </button>
      </form>
    </Form>
  );
}
