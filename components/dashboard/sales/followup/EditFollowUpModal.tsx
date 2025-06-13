"use client";
import { useTranslations } from "next-intl";
import { FollowUp } from "@/components/dashboard/sales/types";
import { FollowUpFormValues } from "@/lib/validations/dashboard/sales/followUp/followUpSchema";
import { useUpdateFollowUpMutation } from "@/redux/services/dashboard/sales/followUpApi";
import CustomModal from "@/components/modals/CustomModal";
import FollowUpForm from "./forms/FollowUpForm";

interface EditFollowUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  followUp: FollowUp;
  customerId: number;
  refetch: () => void;
}

export default function EditFollowUpModal({
  isOpen,
  onClose,
  followUp,
  refetch,
  customerId,
}: EditFollowUpModalProps) {
  const t = useTranslations("follow_up");
  const [updateFollowUp, { isLoading }] = useUpdateFollowUpMutation();

  const defaultValues = {
    follow_up_type: followUp?.follow_up_type,
    comment: followUp?.comment || "",
    customer: customerId,
    action_date: new Date(followUp.action_date),
  };

  const handleSubmit = async (data: FollowUpFormValues) => {
    try {
      await updateFollowUp({
        id: followUp.id,
        data,
      }).unwrap();
      refetch();
      onClose();
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
      <FollowUpForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        defaultValues={defaultValues}
        hideCustomer={true}
      />
    </CustomModal>
  );
}
