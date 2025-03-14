"use client";
import { useCreateReviewMutation } from "@/redux/services/customerReviewApi";
import { useTranslations } from "next-intl";
import CustomerReviewForm, {
  CustomerReviewFormValues,
} from "@/components/dashboard/forms/website/CustomerReviewForm";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateCustomerReview() {
  const [createReview] = useCreateReviewMutation();
  const t = useTranslations("dashboardWebsite.CustomerReviews");

  const handleSubmit = async (data: CustomerReviewFormValues) => {
    try {
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
      if ("error" in response) {
        throw new Error("Creation failed");
      }
    } catch (error) {
      console.log("Customer review creation error:", error);
      throw error;
    }
  };

  return (
    <CreatePage
      title={t("addCustomerReview")}
      onSubmit={handleSubmit}
      Form={CustomerReviewForm}
      redirectPath="/dashboard/website"
    />
  );
}
