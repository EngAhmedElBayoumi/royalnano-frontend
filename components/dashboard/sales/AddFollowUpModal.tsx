"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateFollowUpMutation } from "@/redux/services/dashboard/sales/followUpApi";
import { Form } from "@/components/ui/form";
import CustomModal from "@/components/modals/CustomModal";
import CustomSelect from "@/components/formFields/CustomSelect";
import TextArea from "@/components/formFields/TextArea";
import CustomButton from "@/components/formFields/CustomButton";
import { useTranslations } from "next-intl";

const followUpSchema = z.object({
  follow_up_type: z.enum(["reserve", "cancel", "comment", "follow_up"], {
    required_error: "Follow-up type is required",
  }),
  comment: z
    .string()
    .max(100, "Comment must be 100 characters or less")
    .optional(),
  customer: z.number().int().positive("Customer ID is required"),
});

type FollowUpFormValues = z.infer<typeof followUpSchema>;

interface AddFollowUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerId: number;
}

export default function AddFollowUpModal({
  isOpen,
  onClose,
  customerId,
}: AddFollowUpModalProps) {
  const t = useTranslations("follow_up");
  const [createFollowUp] = useCreateFollowUpMutation();

  const form = useForm<FollowUpFormValues>({
    resolver: zodResolver(followUpSchema),
    defaultValues: {
      follow_up_type: "follow_up",
      comment: "",
      customer: customerId,
    },
  });

  const { control, handleSubmit, reset } = form;

  const handleFormSubmit = async (data: FollowUpFormValues) => {
    try {
      await createFollowUp(data).unwrap();
      onClose();
      reset();
    } catch (error) {
      console.error("Error creating follow-up:", error);
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onChange={onClose}
      title={t("add_follow_up")}
      description=""
      className="sm:w-[80%] md:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/3 px-3 xs:px-6"
    >
      <Form {...form}>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-4 w-full"
        >
          <CustomSelect
            control={control}
            name="follow_up_type"
            label={t("follow_up_type")}
            placeholder={t("select_follow_up_type")}
            options={[
              { value: "reserve", label: t("reserve") },
              { value: "cancel", label: t("cancel") },
              { value: "comment", label: t("comment_action") },
              { value: "follow_up", label: t("follow_up_action") },
            ]}
            className=""
          />

          <TextArea
            control={control}
            name="comment"
            label={t("comment")}
            placeholder={t("comment")}
            className="mt-2 xl:mt-5"
          />
          <div className="flex justify-end gap-2 flex-col-reverse xs:flex-row">
            <CustomButton
              text={t("cancel_action")}
              variant="secondary"
              onClick={() => {
                onClose();
                reset();
              }}
              className="xs:w-fit"
            />
            <CustomButton text={t("save")} type="submit" />
          </div>
        </form>
      </Form>
    </CustomModal>
  );
}
