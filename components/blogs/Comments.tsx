import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { z, ZodSchema } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCommentMutation } from "@/redux/services/website/commentsApi";
import { Input } from "@/components/ui/input";
import CustomButton from "@/components/formFields/CustomButton";
import CustomModal from "@/components/modals/CustomModal";

interface Error {
  data?: {
    detail?: string;
    non_field_errors?: string[];
  };
  message?: string;
  status?: number;
}
interface CommentsProps {
  blogId: string;
  comments: { id: number; content: string; user: string }[];
}
const Comments: React.FC<CommentsProps> = ({ blogId, comments }) => {
  const t = useTranslations("website.blogs");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const [createComment, { isLoading }] = useCreateCommentMutation();

  const commentSchema: ZodSchema<{ content: string }> = z.object({
    content: z.string().nonempty(t("requiredError")),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ content: string }>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit: SubmitHandler<{ content: string }> = async (data) => {
    try {
      const response = await createComment({
        content: data.content,
        blog_id: blogId,
      });
      if (response.error) throw new Error("creation failed");
    } catch (error: unknown) {
      let errorMessage = "An error occurred";

      const commentError = error as Error;
      if (commentError?.data?.detail) {
        errorMessage = commentError?.data.detail;
      } else if (commentError?.data?.non_field_errors?.length) {
        errorMessage = commentError?.data.non_field_errors[0];
      } else if (commentError?.message) {
        errorMessage = commentError?.message;
      }

      setError(errorMessage);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex-1 mt-4 min-w-[360px]">
      <CustomModal
        isOpen={isModalOpen}
        onChange={(isOpen) => setIsModalOpen(isOpen)}
        title="Error!"
        description={error}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <Input
            placeholder={t("writeComment")}
            className="px-3 py-2 h-fit border-2 border-primary rounded-none rounded-s-lg bg-white xl:text-sm"
            {...register("content")}
          />

          <CustomButton
            text={t("addComment")}
            className="text-white min-w-[130px] md:min-w-[160px] px-2 py-[11.2px] sm:py-[9.6px] md:py-[9.8px] rounded-none rounded-e-lg text-[14px] sm:text-[16px] md:text-sm"
            isDisabled={!!errors.content || !watch("content") || isLoading}
          />
        </div>
        {errors.content && (
          <span className="text-red-500">{errors.content.message}</span>
        )}
      </form>

      <div className="mt-4 flex flex-col gap-4">
        {comments?.map((comment) => (
          <div key={comment.id} className="flex gap-2 items-center">
            <Image
              src={"/assets/images/user-placeholder.jpg"}
              alt={comment.user}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="text-[14px]">
              <h3 className="font-bold">{comment.user}</h3>
              <p className="text-subtitle">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
