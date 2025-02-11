"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();

  const columns = [
    { field: "Image", header: "Image" },
    { field: "Description", header: "Description" },
    { field: "Date", header: "Date" },
  ];

  const data = [
    {
      id: 1,
      Image: "image_url_1",
      Description: "Lorem Ipsum is simply dummy.....",
      Date: "Dec. 3, 2024",
    },
    {
      id: 2,
      Image: "image_url_2",
      Description: "Lorem Ipsum is simply dummy.....",
      Date: "Dec. 3, 2024",
    },
    {
      id: 3,
      Image: "image_url_3",
      Description: "Lorem Ipsum is simply dummy.....",
      Date: "Dec. 3, 2024",
    },
    {
      id: 4,
      Image: "image_url_4",
      Description: "Lorem Ipsum is simply dummy.....",
      Date: "Dec. 3, 2024",
    },
    {
      id: 5,
      Image: "image_url_5",
      Description: "Lorem Ipsum is simply dummy.....",
      Date: "Dec. 3, 2024",
    },
    // Add more entries as needed
  ];

  const cardsData = [
    { title: "Total Entries", num: data.length },
    { title: "Active", num: 10 },
    { title: "Pending", num: 5 },
    { title: "Archived", num: 2 },
  ];

  const handleClick = () => {
    router.push("/dashboard/website/about/create");
  };

  return (
    <div className="px-6 pb-25">
      <CustomTable
                      emptyMessage="no About data found"

        editRoute="/dashboard/website/about/edit/"
        data={data}
        rows={10}
        columns={columns}
        cardData={cardsData}
        buttonText="Add About Entry"
        ButtonEvent={handleClick}
      />
    </div>
  );
}
