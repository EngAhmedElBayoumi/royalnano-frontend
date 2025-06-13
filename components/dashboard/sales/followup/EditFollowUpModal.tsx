"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateFollowUpMutation } from "@/redux/services/dashboard/sales/followUpApi";
import { Form } from "@/components/ui/form";
import CustomModal from "@/components/modals/CustomModal";
import CustomSelect from "@/components/formFields/CustomSelect";
import TextArea from "@/components/formFields/TextArea";
import CustomButton from "@/components/formFields/CustomButton";
import { useTranslations } from "next-intl";
import { FollowUp } from "@/components/dashboard/sales/types";
import DateTimePicker from "@/components/formFields/DateTimePicker";

const followUpSchema = z.object({
  follow_up_type: z.enum(["reserve", "cancel", "comment", "follow_up"], {
    required_error: "Follow-up type is required",
  }),
  comment: z
    .string()
    .max(100, "Comment must be 100 characters or less")
    .optional(),
  action_date: z.date().optional(),
});

type FollowUpFormValues = z.infer<typeof followUpSchema>;

interface EditFollowUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  followUp: FollowUp; // Use the reusable FollowUp type here
  refetch: () => void; // Add refetch prop
}

export default function EditFollowUpModal({
  isOpen,
  onClose,
  followUp,
  refetch,
}: EditFollowUpModalProps) {
  const t = useTranslations("follow_up");
  const [updateFollowUp] = useUpdateFollowUpMutation();

  const form = useForm<FollowUpFormValues>({
    resolver: zodResolver(followUpSchema),
    defaultValues: {
      follow_up_type: followUp?.follow_up_type || "follow_up",
      comment: followUp?.comment || "",
      action_date: new Date(followUp.action_date),
    },
  });

  const { control, handleSubmit, reset } = form;

  const handleFormSubmit = async (data: FollowUpFormValues) => {
    try {
      await updateFollowUp({
        id: followUp.id,
        data: {
          ...data,
          action_date: data.action_date?.toISOString(),
        },
      }).unwrap();
      refetch(); // Refetch follow-ups after successful update
      onClose();
      reset();
    } catch (error) {
      console.error("Error updating follow-up:", error);
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onChange={onClose}
      title={t("edit_follow_up")}
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
              { value: "follow_up", label: t("follow_up") },
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

          <DateTimePicker
            control={control}
            name="action_date"
            label={t("action_date")}
            placeholder={t("select_date_time")}
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
