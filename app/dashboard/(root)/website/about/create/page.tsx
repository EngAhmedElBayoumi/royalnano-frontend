"use client";
import AboutForm, {
  AboutFormValues,
} from "@/components/dashboard/forms/website/AboutForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useCreateAboutMutation } from "@/redux/about/WebsiteApi";

export default function CreateAbout() {
  // const [createAbout] = useCreateAboutMutation();

  const handleSubmit = async (data: AboutFormValues) => {
    console.log(data);
    // await createAbout(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/add.svg"
          title="Add About"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <AboutForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
