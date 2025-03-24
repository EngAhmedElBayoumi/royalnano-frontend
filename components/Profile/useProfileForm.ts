import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/lib/validations/profileSchema";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useUpdateProfileMutation } from "@/redux/services/profileApi";
import { setProfile } from "@/redux/slices/profileSlice";

const useProfileForm = () => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { name, phoneNumber } = useSelector(
    (state: RootState) => state.profile
  );
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  interface FormValues {
    name: string;
    phoneNumber: string;
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: name ?? "",
      phoneNumber: phoneNumber ?? "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const response = await updateProfile(data);
    if ("error" in response) {
      setIsModalOpen(true);
    } else {
      // Update profile in Redux store
      dispatch(
        setProfile({
          name: response?.data?.name,
          emailAddress: response?.data?.email_address,
          phoneNumber: response?.data?.phone_number,
          role: response?.data?.role,
          profilePicture: response?.data?.profile_picture,
          permissions: response?.data?.permissions,
        })
      );
    }
  };

  return { form, onSubmit, isLoading, isModalOpen, handleModalChange };
};

export default useProfileForm;
