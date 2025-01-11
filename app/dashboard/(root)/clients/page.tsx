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
    { id: 1, name: "John Doe", country: "USA", status: "qualified", verified: true, representative: "Amy Elsner" },
    { id: 2, name: "Jane Smith", country: "Canada", status: "unqualified", verified: false, representative: "Anna Fali" },
    { id: 3, name: "Robert Brown", country: "USA", status: "qualified", verified: true, representative: "James Smith" },
    { id: 4, name: "Emily Davis", country: "Canada", status: "unqualified", verified: true, representative: "Sarah Johnson" },
    { id: 5, name: "Michael Johnson", country: "USA", status: "qualified", verified: false, representative: "Chris Lee" },
    { id: 6, name: "Lisa Williams", country: "Australia", status: "unqualified", verified: true, representative: "Laura Taylor" },
    { id: 7, name: "David Miller", country: "UK", status: "qualified", verified: true, representative: "Rebecca Green" },
    { id: 8, name: "Sarah Wilson", country: "USA", status: "unqualified", verified: false, representative: "John Walker" },
    { id: 9, name: "James Moore", country: "Canada", status: "qualified", verified: false, representative: "Grace Harris" },
    { id: 10, name: "Karen Thomas", country: "Australia", status: "unqualified", verified: true, representative: "Danielle Brown" },
    { id: 11, name: "Steven Taylor", country: "USA", status: "qualified", verified: true, representative: "Michael King" },
    { id: 12, name: "Mary Anderson", country: "UK", status: "unqualified", verified: true, representative: "Sophia Scott" },
    { id: 13, name: "Paul Jackson", country: "USA", status: "qualified", verified: false, representative: "David Adams" },
    { id: 14, name: "Anna Harris", country: "Canada", status: "unqualified", verified: true, representative: "Jennifer Clark" },
    { id: 15, name: "George Lee", country: "USA", status: "qualified", verified: true, representative: "Ethan Martin" },
    { id: 16, name: "Deborah Robinson", country: "Australia", status: "unqualified", verified: false, representative: "Andrew Lewis" },
    { id: 17, name: "Christopher Walker", country: "Canada", status: "qualified", verified: true, representative: "Jessica Young" },
    { id: 18, name: "Patricia Hall", country: "UK", status: "unqualified", verified: true, representative: "William King" },
    { id: 19, name: "Daniel Allen", country: "USA", status: "qualified", verified: false, representative: "Megan Scott" },
    { id: 20, name: "Joshua Clark", country: "Canada", status: "unqualified", verified: true, representative: "Henry Walker" },
  ];
  

  return (
    <>
      <div className="px-7 pt-7 pb-25  ">
          <CustomTable data={yourCustomerData} rows={10} columns={columns} />
      </div>
    </>
  );
}
