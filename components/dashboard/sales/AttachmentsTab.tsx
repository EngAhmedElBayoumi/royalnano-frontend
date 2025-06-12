/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAttachmentsByIdQuery } from "@/redux/services/dashboard/sales/salesCustomerAttachmentsApi";
import Image from "next/image";
import { Key } from "react";

export default function AttachmentsTab({ customerId }: { customerId: number }) {
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
          }) => (
            <div
              key={attachment.id}
              className="border p-4 rounded shadow-md space-y-2 bg-white"
            >
              {/* <p> */}
              <strong>File: </strong>
              <Image
                src={attachment.file}
                width={100}
                height={100}
                alt={attachment.description}
              />
              {/* {attachment.file} */}
              {/* </p> */}
              <p>
                <strong>Description: </strong>
                {attachment.description}
              </p>
            </div>
          )
        )
      )}
    </div>
  );
}
