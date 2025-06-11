"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateReviewMutation } from "@/redux/services/website/customerReviewApi";
import CustomerReviewForm, {
  CustomerReviewFormValues,
} from "@/components/dashboard/forms/website/CustomerReviewForm";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateCustomerReview() {
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const t = useTranslations("dashboard_website.CustomerReviews");

  const handleSubmit = async (data: CustomerReviewFormValues) => {
    // Create FormData instance to handle file upload
    const formData = new FormData();

    // Append text fields
    formData.append("name", data.name);
    formData.append("review", data.review);
    formData.append("rating", data.rating.toString());

    // Append image file if it exists
    if (data.image && data?.image instanceof File) {
      formData.append("image", data.image);
    }

    const response = await createReview(formData);
    if (response.error) {
      handleApiError(response.error);
    }
  };

  return (
    <CreatePage
      title={t("addCustomerReview")}
      onSubmit={handleSubmit}
      Form={CustomerReviewForm}
      redirectPath="/dashboard/website?tab=customer-reviews"
      isLoading={isLoading}
    />
  );
}
