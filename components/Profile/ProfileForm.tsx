import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import useProfileForm from "@/components/Profile/useProfileForm";

const ProfileForm = () => {
  const { form, onSubmit } = useProfileForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
        <div className="flex flex-wrap gap-10 w-full mb-5">
          <TextInput
            control={form.control}
            name="full_name"
            label="Full Name"
            placeholder="Full Name"
          />
          <TextInput
            control={form.control}
            name="phone_number"
            label="Phone Number"
            placeholder="Phone Number"
          />
        </div>
        <CustomButton
          text="Save"
          className="text-white rounded-lg bg-primaryDark shadow-lg min-w-[170px] font-bold text-sm xl:text-[20px]"
        />
      </form>
    </Form>
  );
};

export default ProfileForm;
