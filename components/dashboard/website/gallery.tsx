"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import { useRouter } from "next/navigation";

export default function Gallery() {
  const router = useRouter();

  const columns = [
    { field: "file", header: "File" },
    { field: "type", header: "Type" },
    { field: "Date", header: "Date" },
  ];

  const data = [
    {
      id: 1,
      file: "image_url_1",
      type: "Image",
      Date: "Dec. 3, 2024",
    },
    {
      id: 2,
      file: "image_url_2",
      type: "Video",
      Date: "Dec. 3, 2024",
    },
    {
      id: 3,
      file: "image_url_3",
      type: "Image",
      Date: "Dec. 3, 2024",
    },
    {
      id: 4,
      file: "image_url_4",
      type: "Video",
      Date: "Dec. 3, 2024",
    },
    {
      id: 5,
      file: "image_url_5",
      type: "Image",
      Date: "Dec. 3, 2024",
    },
    {
      id: 6,
      file: "image_url_6",
      type: "Video",
      Date: "Dec. 3, 2024",
    },
    // Add more entries as needed
  ];

  const cardsData = [
    { title: "Total Entries", num: data.length },
    {
      title: "Images",
      num: data.filter((item) => item.type === "Image").length,
    },
    {
      title: "Videos",
      num: data.filter((item) => item.type === "Video").length,
    },
  ];

  const handleClick = () => {
    router.push("/dashboard/website/gallery/create");
  };

  return (
    <div className="px-6 pb-25">
      <CustomTable
                      EmptyMessage="no gallery data found"

        editRoute="/dashboard/website/gallery/edit/"
        data={data}
        rows={10}
        columns={columns}
        cardData={cardsData}
        buttonText="Add Gallery Entry"
        ButtonEvent={handleClick}
      />
    </div>
  );
}
