"use client";
import Image from "next/image";
import React from "react";
import { z, ZodSchema } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EmailInput from "@/components/formFields/EmailInput/EmailInput";
import CustomButton from "@/components/formFields/CustomButton";

const emailSchema: ZodSchema<{ email: string }> = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email"),
});

const Subscription = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit: SubmitHandler<{ email: string }> = (data) => {
    console.log("Subscribed with email:", data.email);
  };

  return (
    <section className="bg-gray300 text-black flex justify-between items-center mb-8">
      <article className="pl-[50px]">
        <h2 className="text-lg mb-4 max-w-[530px]">
          Subscribe to get the latest car maintenance updates
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
          <EmailInput register={register} errors={errors} className="flex-1" />
          <CustomButton text="subscribe" className="text-white px-2" />
        </form>
      </article>
      <Image
        src="/assets/images/subscription-car.png"
        alt="Car"
        width={430}
        height={400}
      />
    </section>
  );
};

export default Subscription;
