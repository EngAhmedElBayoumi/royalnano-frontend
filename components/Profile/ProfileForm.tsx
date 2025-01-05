import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/lib/validations/profileSchema";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import { useUpdateProfileMutation } from "@/redux/services/profileApi";

const ProfileForm = () => {
  // const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [updateProfile] = useUpdateProfileMutation();

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
  //hena deft formvalues 3shan el type error eli kan 3nd onsubmittt
  const onSubmit = async (data: FormValues) => {
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
          className="text-white rounded-lg bg-primaryDark shadow-lg min-w-[170px] font-bold text-sm xl:text-[20px]"
        />
      </form>
    </Form>
  );
};

export default ProfileForm;
