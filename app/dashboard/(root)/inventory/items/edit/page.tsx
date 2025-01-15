"use client";
import ItemForm, {
  ItemFormValues,
} from "@/components/dashboard/forms/inventory/ItemForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useUpdateItemMutation } from "@/redux/services/InventoryApi";

export default function EditItem() {
  // const [updateItem] = useUpdateItemMutation();
  const defaultValues: ItemFormValues = {
    itemName: "Sample Item",
    itemCode: "ITEM123",
    quantity: 10,
    price: 100,
  };

  const handleSubmit = async (data: ItemFormValues) => {
    console.log(data);
    // await updateItem(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/edit.svg"
          title="Edit Item"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <ItemForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </div>
    </main>
  );
}
