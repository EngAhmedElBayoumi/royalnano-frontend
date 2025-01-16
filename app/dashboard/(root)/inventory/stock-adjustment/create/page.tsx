"use client";
import StockAdjustmentForm, {
  StockAdjustmentFormValues,
} from "@/components/dashboard/forms/inventory/StockAdjustmentForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useCreateStockAdjustmentMutation } from "@/redux/services/InventoryApi";

export default function CreateStockAdjustment() {
  // const [createStockAdjustment] = useCreateStockAdjustmentMutation();

  const handleSubmit = async (data: StockAdjustmentFormValues) => {
    console.log(data);
    // await createStockAdjustment(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/add.svg"
          title="Add Stock Adjustment"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <StockAdjustmentForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
