"use client";
import { useRouter } from "next/navigation";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import { useGetBranchesQuery } from "@/redux/services/dashboard/branchesApi";

export default function Branches() {
  const router = useRouter();
  const {
    data: branchesData,
    isLoading,
    error,
  } = useGetBranchesQuery({
    search: "",
    ordering: "id",
    page: 1,
    page_size: 10,
  });

  const columns = [
    { field: "name", header: "Name" },
    { field: "branch_code", header: "Code" },
    { field: "location", header: "Location" },
    { field: "description", header: "description" },
    { field: "phone_number", header: "phone number" },
  ];

  const cardsData = [
    { title: "Customers", num: 145 },
    { title: "Orders", num: 87 },
    { title: "Revenue", num: 3200 },
    { title: "Products", num: 48 },
    { title: "Products", num: 48 },
    { title: "Products", num: 48 },
  ];
  const handleClick = () => {
    router.push("/dashboard/branches/create");
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading branches</div>;

  return (
    <>
      <div className="px-6 pt-7 pb-25  ">
        <CustomTable
        EmptyMessage="you have no branches"
          editRoute="/dashboard/branches/edit/"
          headerBG="#F8F7F7"
          headerTextColor="#C8AE50"
          headerTitle="Branches"
          headerIcon="/assets/icons/branches.svg"
          data={branchesData}
          rows={10}
          columns={columns}
          cardData={cardsData}
          buttonText="Add Branches"
          ButtonEvent={handleClick}
        />
      </div>
    </>
  );
}
