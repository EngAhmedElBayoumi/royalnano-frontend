"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { preorderSchema } from "@/lib/validations/dashboard/inventory/preorderSchema";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import TextArea from "@/components/formFields/TextArea";
import Link from "next/link";
import CustomSelect from "@/components/formFields/CustomSelect";
import { useGetPreorderQuery } from "@/redux/services/dashboard/preorderApi";
import { Item } from "../../inventory/preorder";
import { useState } from "react";
import CustomModal from "@/components/modals/CustomModal";
import { useRouter } from "next/navigation";

interface PreorderFormProps {
  onSubmit: (data: PreorderFormValues) => Promise<void>;
  defaultValues?: PreorderFormValues;
}

export interface PreorderFormValues {
  preorder_level: number;
  item: string;
  description?: string;
}

const PreorderForm = ({ onSubmit, defaultValues }: PreorderFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
const router = useRouter();

  const { data: inventoryItems } = useGetPreorderQuery({});

  const itemsOptions = inventoryItems?.results?.map((item: Item) => ({
    value:  String(item.item.item_code),
   

    label:  item.item.item_name,

  })) || [] ;

  const form = useForm({
    resolver: zodResolver(preorderSchema),
    defaultValues: defaultValues || {
      preorder_level: 1,
      item: itemsOptions[0]?.label,
      description: "",
    },
  });
  const handleSubmit = async (data: PreorderFormValues) => {
    try {
      await onSubmit(data);
      
      
    } catch (error) {
      console.error("Submission Error:", error);
      setIsModalOpen(true); 
      
    }
  };
  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen); 
    if (!isOpen) {
      router.push("/dashboard/inventory"); 
    }
  };
  return (
    <Form {...form}>
       <CustomModal
        isOpen={isModalOpen}
        onChange={handleModalChange}
        title="Error!"
        description="Your Request wasn't processed successfully.."
      />
        <form onSubmit={form.handleSubmit(handleSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="preorder_level"
              label="Preorder Level"
              placeholder="Preorder level"
              type="number"
            />
            
            <CustomSelect
              control={form.control}
              name="item"
              label="Item"
              placeholder="Item"
              options={itemsOptions}
            />
          </div>
          <TextArea
            control={form.control}
            name="description"
            label="Description"
            placeholder="Description Optional"
            className="mt-2 xl:mt-5"
          />
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link href="/dashboard/inventory" passHref>
            <CustomButton
              text="Cancel"
              className="text-white rounded-lg bg-secondary min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
            />
          </Link>
          <CustomButton
            text="Save"
            className="text-white rounded-lg min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          />
        </div>
      </form>
    </Form>
  );
};

export default PreorderForm;
