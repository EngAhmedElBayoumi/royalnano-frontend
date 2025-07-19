"use client";

import CustomButton from "@/components/formFields/CustomButton";
import { useGetAttachmentsByIdQuery } from "@/redux/services/dashboard/sales/salesCustomerAttachmentsApi";
import Image from "next/image";
import { Key, useState } from "react";
import UploadAttachmentForm from "../forms/sales/addAttachmentForm";
import config from "@/lib/config";

const baseUrl = config.apiUrl;

const isImage = (fileName: string) => {
  return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileName);
};

const isPDF = (fileName: string) => /\.pdf$/i.test(fileName);
const isWord = (fileName: string) => /\.(doc|docx)$/i.test(fileName);
const isExcel = (fileName: string) => /\.(xls|xlsx)$/i.test(fileName);

export default function AttachmentsTab({ customerId }: { customerId: number }) {
  const [showForm, setShowForm] = useState(false);
  const { data, isLoading, error } = useGetAttachmentsByIdQuery(customerId);

  if (isLoading) return <p>Loading attachments...</p>;
  if (error) return <p>Error fetching attachments.</p>;

  return (
    <div className="space-y-4">
      {data.length === 0 ? (
        <p>No attachments found for this customer.</p>
      ) : (
        data.map(
          (attachment: {
            id: Key | null | undefined;
            file: any;
            description: string;
          }) => {
            const fileUrl = `${baseUrl}${attachment.file.substring(1)}`;
            const fileName = attachment.file.split("/").pop() || "attachment";

            return (
              <div
                key={attachment.id}
                className="border p-4 rounded shadow-md space-y-2 bg-white"
              >
                <strong>File: </strong>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="block"
                >
                  {isImage(fileName) ? (
                    <Image
                      src={fileUrl}
                      width={100}
                      height={100}
                      alt={attachment.description}
                      className="cursor-pointer hover:opacity-80"
                    />
                  ) : isPDF(fileName) ? (
                    <p className="text-blue-600 underline">📄 PDF File</p>
                  ) : isWord(fileName) ? (
                    <p className="text-blue-600 underline">📝 Word Document</p>
                  ) : isExcel(fileName) ? (
                    <p className="text-blue-600 underline">📊 Excel Sheet</p>
                  ) : (
                    <p className="text-blue-600 underline">📁 File</p>
                  )}
                </a>

                <p>
                  <strong>Description: </strong>
                  {attachment.description}
                </p>
              </div>
            );
          }
        )
      )}

      <CustomButton
        text="Add Attachment"
        onClick={() => {
          setShowForm(true);
        }}
      />
      {showForm && <UploadAttachmentForm customerId={customerId} />}
    </div>
  );
}
