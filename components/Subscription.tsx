"use client";
import Image from "next/image";
import React from "react";
import { z, ZodSchema } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EmailInput from "@/components/formFields/EmailInput";
import CustomButton from "@/components/formFields/CustomButton";
import { useTranslations } from 'next-intl';

const Subscription = () => {
  const t = useTranslations('website.subscription'); 

  const emailSchema: ZodSchema<{ email: string }> = z.object({
    email: z
      .string()
      .nonempty(t('errors.required')) 
      .email(t('errors.invalid')),
  });

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
    <section className="py-5 md:pt-0 sm:pb-0 bg-gray300 text-black flex justify-between items-center mb-8">
      <article className="px-4 sm:pl-[120px] w-full md:w-auto">
        <h2 className="text-md lg:text-lg xl:text-xl mb-4 max-w-[530px] lg:w-2/3">
          {t('title')} 
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
          <EmailInput
            register={register}
            errors={errors}
            className="flex-1"
            label={t('emailPlaceholder')}
          />
          <CustomButton text={t('buttonText')} className="text-white px-2" /> 
        </form>
      </article>
      <Image
        src="/assets/images/subscription-car.png"
        alt="Car"
        width={430}
        height={400}
        className="mt-4 md:mt-0 hidden sm:block w-[30%] lg:w-fit h-[300px] xl:h-[400px]"
      />
    </section>
  );
};

export default Subscription;