import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { z, ZodSchema } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import config from "@/lib/config";
import { useCreateCommentMutation } from "@/redux/services/website/commentsApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import CustomButton from "@/components/formFields/CustomButton";
import CustomModal from "@/components/modals/CustomModal";

const baseUrl = config.apiUrl;
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
  comments: {
    id: number;
    content: string;
    user: { name: string; profile_picture: string | null };
  }[];
}
const Comments: React.FC<CommentsProps> = ({ blogId, comments }) => {
  const t = useTranslations("website.blogs");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const [allComments, setAllComments] = useState(comments);
  const [createComment, { isLoading }] = useCreateCommentMutation();

  const commentSchema: ZodSchema<{ content: string }> = z.object({
    content: z.string().nonempty(t("requiredError")),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<{ content: string }>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit: SubmitHandler<{ content: string }> = async (data) => {
    try {
      const response = await createComment({
        content: data.content,
        blog: blogId,
      }).unwrap(); // Use unwrap to get the response data directly

      // Add the new comment to the existing comments
      setAllComments((prevComments) => [response, ...prevComments]);

      // Reset the form
      reset();
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
        {allComments?.map((comment) => (
          <div key={comment.id} className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage
                src={
                  comment.user.profile_picture
                    ? baseUrl + comment.user.profile_picture.substring(1)
                    : "/assets/images/user-placeholder.jpg"
                }
              />
              <AvatarFallback>{comment.user.name}</AvatarFallback>
            </Avatar>
            <div className="text-[14px]">
              <h3 className="font-bold">{comment.user.name}</h3>
              <p className="text-subtitle">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
