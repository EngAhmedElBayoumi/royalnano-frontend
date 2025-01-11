import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import useProfileForm from "@/components/Profile/useProfileForm";

const ProfileForm = () => {
  const { form, onSubmit } = useProfileForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-10 mb-5 w-[90vw] md:w-fit">
          <TextInput
            control={form.control}
            name="full_name"
            label="Full Name"
            placeholder="Full Name"
            className="md:min-w-[40vw] lg:min-w-[25vw]"
          />
          <TextInput
            control={form.control}
            name="phone_number"
            label="Phone Number"
            placeholder="Phone Number"
            className="md:min-w-[40vw] lg:min-w-[25vw]"
          />
        </div>
        <CustomButton
          text="Save"
          className="text-white rounded-lg bg-primaryDark shadow-lg min-w-[170px] font-bold text-sm xl:text-[20px] py-1 xl:py-2"
        />
      </form>
    </Form>
  );
};

export default ProfileForm;
