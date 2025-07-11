"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import IconWithTitle from "./IconWithTitle";
import CustomModal from "../modals/CustomModal";
import FormSkelton from "./skelton/FormSkelton";
import LoadingError from "./LoadingError";

interface ViewPageProps<T> {
  title: string;
  data: T | undefined;
  isLoading: boolean;
  // eslint-disable-next-line
  error: any;
  onSubmit: (data: T) => Promise<void>;
  Form: React.ComponentType<{
    onSubmit: (data: T) => Promise<void>;
    isLoading?: boolean;
    defaultValues?: T;
  }>;
}

export default function ViewPage<T>({
  title,
  data,
  isLoading,
  error,
  onSubmit,
  Form,
}: ViewPageProps<T>) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalError, setModalError] = useState<string>("");

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleSubmit = async (formData: T) => {
    try {
      await onSubmit(formData);
    } catch (error) {
      setIsModalOpen(true);
      if (error instanceof Error) {
        setModalError(error.message || "An error occurred");
      } else {
        setModalError("An error occurred");
      }
    }
  };

  return (
    <main className="mx-4 sm:mx-7 my-5">
      <CustomModal
        isOpen={isModalOpen}
        onChange={handleModalChange}
        title="Error!"
        description={modalError}
      />
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/view.svg"
          title={title}
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-4 sm:px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        {isLoading ? (
          <FormSkelton />
        ) : error ? (
          <LoadingError />
        ) : (
          <Form
            onSubmit={handleSubmit}
            defaultValues={data}
            isLoading={false}
          />
        )}
      </div>
    </main>
  );
}


