import CustomTable from "@/components/dashboard/tables/CustomTable";

export default function Clients() {
  const columns = [
    { field: "name", header: "Name" },
    { field: "country", header: "Country" },
    { field: "representative", header: "Representative" },
    { field: "status", header: "Status" },
    { field: "verified", header: "Verified" },
  ];
  const yourCustomerData = [
    {
      id: 1,
      name: "John Doe",
      country: "USA",
      status: "qualified",
      verified: true,
      representative: "Amy Elsner",
    },
    {
      id: 2,
      name: "Jane Smith",
      country: "Canada",
      status: "unqualified",
      verified: false,
      representative: "Anna Fali",
    },
  ];

  return (
    <>
      <div className="px-7 pt-7 pb-25 ">
        <div className="bg-[#F8F7F7] py-4 pt-4 pb-1 rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px]">
          <CustomTable data={yourCustomerData} rows={10} columns={columns} />
        </div>
      </div>
    </>
  );
}
