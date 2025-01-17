"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import { useRouter } from "next/navigation";
import { DataInTable } from "@/components/dashboard/tables/CustomTable";
export default function Clients() {
  const router = useRouter();

  const columns = [
    { field: "name", header: "Name" },
    { field: "country", header: "Country" },
    { field: "representative", header: "Representative" },
    { field: "status", header: "Status" },
    { field: "verified", header: "Verified" },
  ];

  const yourCustomerData: DataInTable[] = [];

  const cardsData = [
    { title: "Customers", num: 145 },
    { title: "Orders", num: 87 },
    { title: "Revenue", num: 3200 },
    { title: "Products", num: 48 },
    { title: "Products", num: 48 },
    { title: "Products", num: 48 },
  ];
  const handleClick = () => {
    router.push("/dashboard/clients/create");
  };
  return (
    <>
      <div className="px-6 pt-7 pb-25  ">
        <CustomTable
          editRoute="/dashboard/clients/edit/"
          secondHeaderBG="transparent"
          secondHeaderTitle="Import Customer List"
          secondHeaderIcon="/assets/icons/importCustomerList.svg"
          secondHeaderTextColor="#C8AE50"
          headerBG="#F8F7F7"
          headerTextColor="#C8AE50"
          headerTitle="Client"
          headerIcon="/assets/icons/client.svg"
          data={yourCustomerData}
          rows={10}
          columns={columns}
          cardData={cardsData}
          buttonText="Add Client"
          ButtonEvent={handleClick}
        />
      </div>
    </>
  );
}
