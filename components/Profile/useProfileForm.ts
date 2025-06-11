import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/lib/validations/profileSchema";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useUpdateProfileMutation } from "@/redux/services/website/profileApi";
import { setProfile } from "@/redux/slices/profileSlice";

const useProfileForm = () => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { name, phone_number } = useSelector(
    (state: RootState) => state.profile
  );
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  interface FormValues {
    name: string;
    phone_number: string;
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: name ?? "",
      phone_number: phone_number ?? "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const response = await updateProfile(data);
    if ("error" in response) {
      setIsModalOpen(true);
    } else {
      // Update profile in Redux store
      dispatch(setProfile(response?.data));
    }
  };

  return { form, onSubmit, isLoading, isModalOpen, handleModalChange };
};

export default useProfileForm;
