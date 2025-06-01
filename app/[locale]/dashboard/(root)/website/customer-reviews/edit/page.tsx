"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
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
  const t = useTranslations("dashboardWebsite.CustomerReviews");
  const { data, isLoading, error } = useGetReviewByIdQuery(id);
  const [updateReview, { isLoading: submitting }] = useUpdateReviewMutation();

  const defaultValues = data && {
    ...data,
    rating: Number(data.rating),
    image: data.image,
  };

  const handleSubmit = async (data: CustomerReviewFormValues) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("review", data.review);
    formData.append("rating", data.rating.toString());

    if (data.image && data.image instanceof File) {
      formData.append("image", data.image);
    }

    const response = await updateReview({ id, data: formData });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("editCustomerReview")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={CustomerReviewForm}
      redirectPath="/dashboard/website?tab=customer-reviews"
    />
  );
}
