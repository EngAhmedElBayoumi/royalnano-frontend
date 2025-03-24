import { useTranslations } from "next-intl";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import useProfileForm from "@/components/Profile/useProfileForm";
import PhoneInputField from "../formFields/PhoneInputField";
import CustomModal from "../modals/CustomModal";

const ProfileForm = () => {
  const { form, onSubmit, isLoading, isModalOpen, handleModalChange } =
    useProfileForm();
  const t = useTranslations("website.profile.form");
  const globalTranslate = useTranslations();

  return (
    <>
      <CustomModal
        isOpen={isModalOpen}
        onChange={handleModalChange}
        title="Error!"
        description="Your Request wasn't processed successfully.."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-10 mb-5 w-[90vw] md:w-fit">
            <TextInput
              control={form.control}
              name="name"
              label={t("fullName")}
              placeholder={t("fullName")}
              className="md:min-w-[40vw] lg:min-w-[25vw]"
            />

            <PhoneInputField
              control={form.control}
              name="phone_number"
              label={t("phoneNumber")}
            />
          </div>
          <CustomButton
            text={
              isLoading ? globalTranslate("saving") : globalTranslate("save")
            }
            className="text-white rounded-lg bg-primaryDark shadow-lg min-w-[150px] xl:min-w-[175px] font-bold text-sm xl:text-[20px] py-1 xl:py-2"
          />
        </form>
      </Form>
    </>
  );
};

export default ProfileForm;
