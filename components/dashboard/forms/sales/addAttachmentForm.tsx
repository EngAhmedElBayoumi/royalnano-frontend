"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import { Form } from "@/components/ui/form";
import { useCreateAttachmentsMutation } from "@/redux/services/dashboard/sales/salesCustomerAttachmentsApi";
import FileInput from "@/components/formFields/FileInput";
import { useState } from "react";
import CustomModal from "@/components/modals/CustomModal";
// import { set } from "date-fns";
// import { useCreateAttachmentMutation } from "@/redux/services/dashboard/attachmentsApi"; // غيّري الباث لو محتاج

const attachmentSchema = z.object({
  description: z.string().min(1, "Description is required"),
  file: z.any().refine((file) => file instanceof File, {
    message: "File is required",
  }),
});

type AttachmentFormValues = z.infer<typeof attachmentSchema>;

const UploadAttachmentForm = ({ customerId }: { customerId: number }) => {
  const [createAttachment, { isLoading }] = useCreateAttachmentsMutation();
  // const [isOpen, setIsOpen] = useState(false);
  // const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [shouldResetFileInput, setShouldResetFileInput] = useState(false);

  const form = useForm<AttachmentFormValues>({
    resolver: zodResolver(attachmentSchema),
    defaultValues: {
      description: "",
      file: undefined,
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };
  const onSubmit = async (data: AttachmentFormValues) => {
    console.log("file data:", data.file);
    console.log(data.file instanceof File);
    console.log("submited", data);

    console.log("iddd", customerId);
    try {
      const formData = new FormData();
      formData.append("description", data.description);
      formData.append("file", data.file);
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      console.log("formdata", formData instanceof FormData);
      const response = await createAttachment({
        id: customerId,
        data: formData,
      });

      if ("error" in response) {
        console.error("Upload failed:", response.error);
      } else {
        console.log("Upload success:", response);
      }
      setShouldResetFileInput(true);

      form.reset();
      //   if (fileInputRef.current) {
      //     fileInputRef.current.value = "";
      //   }
      setTimeout(() => setShouldResetFileInput(false), 100);

      setIsModalOpen(true);
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-md"
      >
        <TextInput
          control={form.control}
          name="description"
          label="Description"
          placeholder="Enter description"
        />

        <div>
          <FileInput
            control={form.control}
            name="file"
            label="upload file"
            shouldReset={shouldResetFileInput}
          />
        </div>

        <CustomButton
          text={isLoading ? "Uploading..." : "Upload"}
          type="submit"
          isDisabled={isLoading}
        />
        {/* {isOpen && ( */}
        <CustomModal
          isOpen={isModalOpen}
          onChange={handleModalChange}
          title="Success"
          description="Your Request was processed successfully.."
        />
        {/* )} */}
      </form>
    </Form>
  );
};

export default UploadAttachmentForm;
