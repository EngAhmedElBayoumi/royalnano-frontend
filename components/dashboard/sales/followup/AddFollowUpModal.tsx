"use client";
import { useTranslations } from "next-intl";
import { useCreateFollowUpMutation } from "@/redux/services/dashboard/sales/followUpApi";
import { FollowUpFormValues } from "@/lib/validations/dashboard/sales/followUp/followUpSchema";
import CustomModal from "@/components/modals/CustomModal";
import FollowUpForm from "./forms/FollowUpForm";

interface AddFollowUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerId: number;
  refetch: () => void;
}

export default function AddFollowUpModal({
  isOpen,
  onClose,
  customerId,
  refetch,
}: AddFollowUpModalProps) {
  const t = useTranslations("follow_up");
  const [createFollowUp, { isLoading }] = useCreateFollowUpMutation();

  const defaultValues = {
    follow_up_type: 1,
    comment: "",
    customer: customerId,
    action_date: new Date(),
  };

  const handleSubmit = async (data: FollowUpFormValues) => {
    try {
      await createFollowUp(data).unwrap();
      refetch();
      onClose();
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
      <FollowUpForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        defaultValues={defaultValues}
        hideCustomer={true}
      />
    </CustomModal>
  );
}
