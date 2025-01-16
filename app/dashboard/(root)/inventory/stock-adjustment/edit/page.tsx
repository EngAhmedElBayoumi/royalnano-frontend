"use client";
import StockAdjustmentForm, {
  StockAdjustmentFormValues,
} from "@/components/dashboard/forms/inventory/StockAdjustmentForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useUpdateStockAdjustmentMutation } from "@/redux/services/InventoryApi";

export default function EditStockAdjustment() {
  // const [updateStockAdjustment] = useUpdateStockAdjustmentMutation();
  const defaultValues: StockAdjustmentFormValues = {
    reason: "Sample Reason",
    item: "Sample Item",
    quantity: 5,
    type: "Adjustment",
    date: new Date(),
  };

  const handleSubmit = async (data: StockAdjustmentFormValues) => {
    console.log(data);
    // await updateStockAdjustment(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/edit.svg"
          title="Edit Stock Adjustment"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <StockAdjustmentForm
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
        />
      </div>
    </main>
  );
}
