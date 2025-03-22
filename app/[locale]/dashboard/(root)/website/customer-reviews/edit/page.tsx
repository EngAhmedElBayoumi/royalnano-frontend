"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  useGetReviewByIdQuery,
  useUpdateReviewMutation,
} from "@/redux/services/customerReviewApi";
import CustomerReviewForm, {
  CustomerReviewFormValues,
} from "@/components/dashboard/forms/website/CustomerReviewForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditCustomerReview() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("dashboardWebsite");
  const { data, isLoading, error } = useGetReviewByIdQuery(id);
  const [updateReview, { isLoading: submitting }] = useUpdateReviewMutation();

  const defaultValues = data && {
    ...data,
    rating: Number(data.rating),
    image: data.image,
  };

  const handleSubmit = async (data: CustomerReviewFormValues) => {
    try {
      // Create FormData instance to handle file upload
      const formData = new FormData();

      // Append text fields
      formData.append("name", data.name);
      formData.append("review", data.review);
      formData.append("rating", data.rating.toString());

      // Append image file if it exists
      if (data.image && data.image instanceof File) {
        formData.append("image", data.image);
      }

      const response = await updateReview({ id, data: formData });
      if ("error" in response) {
        throw new Error("Edit failed");
      }
    } catch (error) {
      console.log("Customer review edit error:", error);
      throw error;
    }
  };

  return (
    <EditPage
      title={t("CustomerReviews.editCustomerReview")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={CustomerReviewForm}
      redirectPath={`/dashboard/website?tab=${t("tabs.customerReviews")}`}
    />
  );
}
