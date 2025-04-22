"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import IconWithTitle from "./IconWithTitle";
import CustomModal from "../modals/CustomModal";

interface CreatePageProps {
  title: string;
  // eslint-disable-next-line
  onSubmit: (data: any) => Promise<void>;
  Form: React.ComponentType<{
    // eslint-disable-next-line
    onSubmit: (data: any) => Promise<void>;
    isLoading?: boolean;
    // eslint-disable-next-line
    defaultValues?: any;
  }>;
  redirectPath: string;
  iconSrc?: string;
  backgroundColor?: string;
  textColor?: string;
  isLoading: boolean;
}

export default function CreatePage({
  title,
  onSubmit,
  Form,
  redirectPath,
  iconSrc = "/assets/icons/add.svg",
  backgroundColor = "#F8F7F7",
  textColor = "primary",
  isLoading = false,
}: CreatePageProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string>("");

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  // eslint-disable-next-line
  const handleSubmit = async (data: any) => {
    try {
      await onSubmit(data);
      router.push(redirectPath);
    } catch (error: unknown) {
      setIsModalOpen(true);
      if (error instanceof Error) {
        setError(error.message || "An error occurred");
      } else {
        setError("An error occurred");
      }
    }
  };

  return (
    <main className="mx-4 sm:mx-7 my-5">
      <CustomModal
        isOpen={isModalOpen}
        onChange={handleModalChange}
        title="Error!"
        description={error}
      />
      <div className="flex">
        <IconWithTitle
          imageSrc={iconSrc}
          title={title}
          backgroundColor={backgroundColor}
          textColor={textColor}
        />
      </div>

      <div className="bg-dashboardBg px-4 sm:px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <Form onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </main>
  );
}
