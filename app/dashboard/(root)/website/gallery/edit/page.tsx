"use client";
import GalleryForm, {
  GalleryFormValues,
} from "@/components/dashboard/forms/website/GalleryForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useUpdateGalleryMutation } from "@/redux/gallery/WebsiteApi";

export default function EditGallery() {
  // const [updateGallery] = useUpdateGalleryMutation();
  const defaultValues: GalleryFormValues = {
    title: "Sample Gallery",
    item_type: "image",
    file: new File([], "sample.png"),
  };

  const handleSubmit = async (data: GalleryFormValues) => {
    console.log(data);
    // await updateGallery(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/edit.svg"
          title="Edit Gallery"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <GalleryForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </div>
    </main>
  );
}
