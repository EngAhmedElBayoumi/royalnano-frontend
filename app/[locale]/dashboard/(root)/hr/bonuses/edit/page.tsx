"use client";
import BonusesForm, {
  BonusesFormValues,
} from "@/components/dashboard/forms/hr/BonusesForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useUpdateBonusMutation } from "@/redux/services/BonusApi";

export default function EditBonus() {
  // const [updateBonus] = useUpdateBonusMutation();
  const defaultValues: BonusesFormValues = {
    name: "John Doe",
    branch_name: "Branch 1",
    rewards: "1000",
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 1)),
    date: new Date(),
  }; // Fetch existing bonus data and set as default values

  const handleSubmit = async (data: BonusesFormValues) => {
    console.log(data);
    // await updateBonus(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/edit.svg"
          title="Edit Bonuses"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <BonusesForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </div>
    </main>
  );
}
