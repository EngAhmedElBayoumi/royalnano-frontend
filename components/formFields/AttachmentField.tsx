"use client";
import { useCreateAttachmentsMutation } from "@/redux/services/dashboard/sales/salesCustomerAttachmentsApi";
import { useTranslations } from "next-intl";
import { useState } from "react";

const AttachmentField = ({
  customerId,
  onUploadSuccess,
}: {
  customerId?: number;
  onUploadSuccess?: () => void;
}) => {
  const t = useTranslations("Sales.SalesCustomer");
  const [attachments, setAttachments] = useState<
    Array<{
      file: File;
      description: string;
    }>
  >([]);
  const [createAttachment] = useCreateAttachmentsMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        description: "",
      }));
      setAttachments([...attachments, ...newFiles]);
    }
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updatedAttachments = [...attachments];
    updatedAttachments[index] = {
      ...updatedAttachments[index],
      description: value,
    };
    setAttachments(updatedAttachments);
  };

  const handleUpload = async (index: number) => {
    if (!customerId) return;

    const formData = new FormData();
    formData.append("file", attachments[index].file);
    formData.append("description", attachments[index].description);

    try {
      await createAttachment({
        id: customerId.toString(),
        data: formData,
      }).unwrap();
      onUploadSuccess?.();
      removeAttachment(index);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div>
        <input
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
          id="attachment-upload"
        />
        <button
          type="button"
          onClick={() => document.getElementById("attachment-upload")?.click()}
          className="px-4 py-2 border rounded-md text-sm"
        >
          {t("addAttachment")}
        </button>
      </div>

      {attachments.map((attachment, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            placeholder={t("attachmentDescription")}
            value={attachment.description}
            onChange={(e) => handleDescriptionChange(index, e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          />
          <span className="text-sm text-gray-500">{attachment.file.name}</span>
          <button
            type="button"
            onClick={() => handleUpload(index)}
            className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
          >
            Upload
          </button>
          <button
            type="button"
            onClick={() => removeAttachment(index)}
            className="text-red-500"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default AttachmentField;
