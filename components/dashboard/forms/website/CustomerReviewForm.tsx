"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerReviewSchema } from "@/lib/validations/dashboard/website/customerReviewSchema";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/utils/types";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import TextArea from "@/components/formFields/TextArea";
import FileInput from "@/components/formFields/FileInput";

interface CustomerReviewFormProps {
  onSubmit: (data: CustomerReviewFormValues) => Promise<void>;
  defaultValues?: CustomerReviewFormValues;
}

export interface CustomerReviewFormValues {
  name: string;
  review: string;
  rating: number;
  image: File | null;
}

const CustomerReviewForm = ({
  onSubmit,
  defaultValues,
}: CustomerReviewFormProps) => {
  const form = useForm({
    resolver: zodResolver(customerReviewSchema),
    defaultValues: defaultValues || {
      name: "",
      review: "",
      rating: 5,
      image: null,
    },
  });
  const globalTranslate = useTranslations();
  const t = useTranslations("dashboardWebsite.CustomerReviews");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="name"
              label={t("name")}
              placeholder={t("name")}
            />
            <TextInput
              control={form.control}
              name="rating"
              type="number"
              label={t("rating")}
              placeholder={t("rating")}
            />
            <FileInput
              control={form.control}
              name="image"
              label={t("image")}
              accepted={ACCEPTED_IMAGE_TYPES.join(",")}
              className="mt-2 xl:mt-5"
            />
          </div>
          <TextArea
            control={form.control}
            name="review"
            label={t("review")}
            placeholder={t("review")}
            className="mt-2 xl:mt-5"
          />
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link href="/dashboard/website" passHref>
            <CustomButton
              text={globalTranslate("cancel")}
              className="text-white rounded-lg bg-secondary min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
            />
          </Link>
          <CustomButton
            text={globalTranslate("save")}
            className="text-white rounded-lg min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          />
        </div>
      </form>
    </Form>
  );
};

export default CustomerReviewForm;
