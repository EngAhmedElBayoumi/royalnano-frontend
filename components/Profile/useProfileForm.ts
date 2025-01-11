import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/lib/validations/profileSchema";
import { useUpdateProfileMutation } from "@/redux/services/profileApi";

const useProfileForm = () => {
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

  const onSubmit = async (data: FormValues) => {
    await updateProfile(data);
  };

  return { form, onSubmit };
};

export default useProfileForm;
