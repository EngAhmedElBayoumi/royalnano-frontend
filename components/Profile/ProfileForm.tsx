import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/lib/validations/profileSchema";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import { useUpdateProfileMutation } from "@/redux/services/profileApi";

const ProfileForm = () => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  interface FormValues {
    full_name: string;
    phone_number: string;
  }
  const form = useForm<FormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      phone_number: "",
    },
  });

  const onSubmit = async (data: {
    full_name: string;
    email: string;
    phone_number: string;
    message: string;
  }) => {
    await updateProfile(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
        <div className="flex flex-wrap gap-10 w-full mb-5">
          <TextInput<FormValues>
            control={form.control}
            name="full_name"
            label="Full Name"
            placeholder="Full Name"
          />
          <TextInput<FormValues>
            control={form.control}
            name="phone_number"
            label="Phone Number"
            placeholder="Phone Number"
          />
        </div>
        <CustomButton
          text="Save"
          className="text-white rounded-lg bg-primaryDark shadow-lg min-w-[170px] font-bold text-[20px]"
        />
      </form>
    </Form>
  );
};

export default ProfileForm;
