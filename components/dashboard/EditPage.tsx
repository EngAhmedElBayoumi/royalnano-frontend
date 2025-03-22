"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import IconWithTitle from "./IconWithTitle";
import CustomModal from "../modals/CustomModal";
import FormSkelton from "./skelton/FormSkelton";
import LoadingError from "./LoadingError";

interface EditPageProps<T> {
  title: string;
  data: T | undefined;
  isLoading: boolean;
  submitting?: boolean;
  // eslint-disable-next-line
  error: any;
  onSubmit: (data: T) => Promise<void>;
  Form: React.ComponentType<{
    onSubmit: (data: T) => Promise<void>;
    isLoading?: boolean;
    defaultValues?: T;
  }>;
  redirectPath: string;
}

export default function EditPage<T>({
  title,
  data,
  isLoading,
  submitting,
  error,
  onSubmit,
  Form,
  redirectPath,
}: EditPageProps<T>) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleSubmit = async (formData: T) => {
    try {
      await onSubmit(formData);
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
          imageSrc="/assets/icons/edit.svg"
          title={title}
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        {isLoading ? (
          <FormSkelton />
        ) : error ? (
          <LoadingError />
        ) : (
          <Form
            onSubmit={handleSubmit}
            defaultValues={data}
            isLoading={submitting}
          />
        )}
      </div>
    </main>
  );
}
