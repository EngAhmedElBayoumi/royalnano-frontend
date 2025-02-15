"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";

export default function ContactUs() {
  const columns = [
    { field: "Name", header: "Name" },
    { field: "Email", header: "Email" },
    { field: "Message", header: "Message" },
    { field: "Date", header: "Date" },
  ];

  const data = [
    {
      id: 1,
      Name: "Ahmed Omar",
      Email: "Cairo2@gmail.com",
      Message: "Lorem Ipsum is simply dummy.....",
      Date: "Dec. 3, 2024",
    },
    {
      id: 2,
      Name: "Ahmed Omar",
      Email: "Cairo2@gmail.com",
      Message: "Lorem Ipsum is simply dummy.....",
      Date: "Dec. 3, 2024",
    },
    {
      id: 3,
      Name: "Ahmed Omar",
      Email: "Cairo2@gmail.com",
      Message: "Lorem Ipsum is simply dummy.....",
      Date: "Dec. 3, 2024",
    },
    {
      id: 4,
      Name: "Ahmed Omar",
      Email: "Cairo2@gmail.com",
      Message: "Lorem Ipsum is simply dummy.....",
      Date: "Dec. 3, 2024",
    },
    {
      id: 5,
      Name: "Ahmed Omar",
      Email: "Cairo2@gmail.com",
      Message: "Lorem Ipsum is simply dummy.....",
      Date: "Dec. 3, 2024",
    },
    // Add more entries as needed
  ];

  const cardsData = [
    { title: "Total Messages", num: data.length },
    { title: "Unread", num: 3 }, // Example data
    { title: "Responded", num: 2 }, // Example data
  ];

  return (
    <>
      <CustomTable
        emptyMessage="no contact data found"
        data={data}
        rows={10}
        columns={columns}
        cardData={cardsData}
        buttonText={undefined} // No button for adding entries
      />
    </>
  );
}
