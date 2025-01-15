"use client";
import BonusesForm, {
  BonusesFormValues,
} from "@/components/dashboard/forms/hr/BonusesForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useCreateBonusMutation } from "@/redux/services/BonusApi";

export default function CreateBonus() {
  // const [createBonus] = useCreateBonusMutation();

  const handleSubmit = async (data: BonusesFormValues) => {
    console.log(data);
    // await createBonus(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/add.svg"
          title="Add Bonuses"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <BonusesForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
