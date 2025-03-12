"use client";
import { useTranslations } from "next-intl";
import { useCreateApplicantMutation } from "@/redux/services/dashboard/hr/applicantsApi";
import CreatePage from "@/components/dashboard/CreatePage";
import ApplicantsForm, {
  ApplicantsFormValues,
} from "@/components/dashboard/forms/hr/ApplicantsForm";

export default function CreateApplicant() {
  const t = useTranslations("hr");
  const [createApplicant] = useCreateApplicantMutation();

  const handleSubmit = async (data: ApplicantsFormValues) => {
    const response = await createApplicant(data);
    if (response.error) throw new Error("creation failed");
  };

  return (
    <CreatePage
      title={t("applicants.addApplicant")}
      onSubmit={handleSubmit}
      Form={ApplicantsForm}
      redirectPath={`/dashboard/hr?tab=${t("tabs.applicants")}`}
    />
  );
}
