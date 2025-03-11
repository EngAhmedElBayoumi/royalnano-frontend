"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import IconWithTitle from "./IconWithTitle";
import CustomModal from "../modals/CustomModal";

interface CreatePageProps {
  title: string;
  // eslint-disable-next-line
  onSubmit: (data: any) => Promise<void>;
  // eslint-disable-next-line
  Form: React.ComponentType<{ onSubmit: (data: any) => Promise<void> }>;
  redirectPath: string;
  iconSrc?: string;
  backgroundColor?: string;
  textColor?: string;
}

export default function CreatePage({
  title,
  onSubmit,
  Form,
  redirectPath,
  iconSrc = "/assets/icons/add.svg",
  backgroundColor = "#F8F7F7",
  textColor = "primary",
}: CreatePageProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  // eslint-disable-next-line
  const handleSubmit = async (data: any) => {
    try {
      await onSubmit(data);
      router.push(redirectPath);
    } catch (error) {
      setIsModalOpen(true);
      console.log(error);
    }
  };

  return (
    <main className="mx-7 my-5">
      <CustomModal
        isOpen={isModalOpen}
        onChange={handleModalChange}
        title="Error!"
        description="Your Request wasn't processed successfully.."
      />
      <div className="flex">
        <IconWithTitle
          imageSrc={iconSrc}
          title={title}
          backgroundColor={backgroundColor}
          textColor={textColor}
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <Form onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
