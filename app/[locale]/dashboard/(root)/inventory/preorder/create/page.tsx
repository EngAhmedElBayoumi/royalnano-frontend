"use client";
import PreorderForm, {
  PreorderFormValues,
} from "@/components/dashboard/forms/inventory/PreorderForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import { useCreatePreorderMutation } from "@/redux/services/dashboard/preorderApi";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function CreatePreorder() {
  const router = useRouter();
  
  const [createPreorder] = useCreatePreorderMutation()
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen); 
    if (!isOpen) {
      router.push("/dashboard/inventory"); 
    }
  };
  
  
  const handleSubmit = async (data: PreorderFormValues) => {
    try{
      console.log("submit btn clicked")
      const payload = {
        ...data,
        item: Number(data.item), 

      };
      console.log(data);
     const response= await createPreorder(payload);
      console.log("req sent")
      console.log(response)
      if(response.error){
        throw new Error("creation failed")
      }
    }
    
    catch(error){
      setIsModalOpen(true); 

      console.log(error)
      console.log("error in c reation")
     
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
          imageSrc="/assets/icons/add.svg"
          title="Add Preorder"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
     

        
        <PreorderForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
