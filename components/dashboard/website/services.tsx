"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import { useRouter } from "next/navigation";

export default function Services() {
  const router = useRouter();

  const columns = [
    { field: "ServiceName", header: "Services Name" },
    { field: "Type", header: "Type" },
    { field: "Image", header: "Image" },
    { field: "price", header: "Price" },
    { field: "date", header: "Date" },
  ];

  const data = [
    {
      id: 1,
      ServiceName: "Max Pro",
      Type: "Paint Protection",
      Image: "image_url_1",
      price: "10,000 LE",
      date: "Dec. 3, 2024",
    },
    {
      id: 2,
      ServiceName: "Max Pro",
      Type: "Paint Protection",
      Image: "image_url_2",
      price: "10,000 LE",
      date: "Dec. 3, 2024",
    },
    {
      id: 3,
      ServiceName: "Max Pro",
      Type: "Paint Protection",
      Image: "image_url_3",
      price: "10,000 LE",
      date: "Dec. 3, 2024",
    },
    {
      id: 4,
      ServiceName: "Max Pro",
      Type: "Paint Protection",
      Image: "image_url_4",
      price: "10,000 LE",
      date: "Dec. 3, 2024",
    },
    {
      id: 5,
      ServiceName: "Max Pro",
      Type: "Paint Protection",
      Image: "image_url_5",
      price: "10,000 LE",
      date: "Dec. 3, 2024",
    },
    {
      id: 6,
      ServiceName: "Max Pro",
      Type: "Paint Protection",
      Image: "image_url_6",
      price: "10,000 LE",
      date: "Dec. 3, 2024",
    },
    {
      id: 7,
      ServiceName: "Max Pro",
      Type: "Paint Protection",
      Image: "image_url_7",
      price: "10,000 LE",
      date: "Dec. 3, 2024",
    },
    {
      id: 8,
      ServiceName: "Max Pro",
      Type: "Paint Protection",
      Image: "image_url_8",
      price: "10,000 LE",
      date: "Dec. 3, 2024",
    },
    {
      id: 9,
      ServiceName: "Max Pro",
      Type: "Paint Protection",
      Image: "image_url_9",
      price: "10,000 LE",
      date: "Dec. 3, 2024",
    },
    {
      id: 10,
      ServiceName: "Max Pro",
      Type: "Paint Protection",
      Image: "image_url_10",
      price: "10,000 LE",
      date: "Dec. 3, 2024",
    },
  ];

  const cardsData = [
    { title: "New requests", num: 145 },
    { title: "Complete", num: 87 },
    { title: "Pending", num: 3200 },
    { title: "Failed", num: 48 },
    { title: "Paid", num: 48 },
  ];
  const handleClick = () => {
    router.push("/dashboard/website/services/create");
  };
  return (
    <div className="px-6 pb-25">
      <CustomTable
                      emptyMessage="no services data found"

        editRoute="/dashboard/website/services/edit/"
        data={data}
        rows={10}
        columns={columns}
        cardData={cardsData}
        buttonText="Add Service"
        ButtonEvent={handleClick}
      />
    </div>
  );
}
