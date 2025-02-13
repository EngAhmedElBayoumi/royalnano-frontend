"use client";
import AboutForm, {
  AboutFormValues,
} from "@/components/dashboard/forms/website/AboutForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useUpdateAboutMutation } from "@/redux/about/WebsiteApi";

export default function EditAbout() {
  // const [updateAbout] = useUpdateAboutMutation();
  const defaultValues: AboutFormValues = {
    image: new File([], "sample.png"),
    description: "<p>Hello World!</p>",
  };

  const handleSubmit = async (data: AboutFormValues) => {
    console.log(data);
    // await updateAbout(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/edit.svg"
          title="Edit About"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <AboutForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </div>
    </main>
  );
}
