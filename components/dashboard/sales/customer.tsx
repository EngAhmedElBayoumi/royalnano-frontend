"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "../skelton/TableSkelton";
import CardsSkelton from "../skelton/CardsSkelton";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useState } from "react";
import { useGetSalesCustomerQuery } from "@/redux/services/dashboard/sales/salesCustomerApi";

interface Customer {
  id: number;
  customer_name: string;
  contact_person: string;
  phone_number: string;
  email: string;
  address: string;
  city: string;
  country: string;
  notes: string;
  branch: {
    id: number;
    name: string;
    branch_code: string;
    location: string;
    description: string;
    phone_number: string;
    email: string;
    address: string;
    latitude: number | null;
    longitude: number | null;
    balance: string;
    extra_fields: Record<string, unknown>;
    manager: null | any;
  };
  customer_type: string;
  tax_number: string | null;
  national_id: string;
}

export default function SalesCustomer() {
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const {
    isLoading,
    error,
    data: salesCustomers,
  } = useGetSalesCustomerQuery({
    search: "",
    ordering: "id",
    page,
    page_size: 10,
  });

  const router = useRouter();

  console.log(salesCustomers);

  const transformedData =
    salesCustomers?.results?.map((customer: Customer) => ({
      id: customer.id,
      customer_name: customer.customer_name,
      contact_person: customer.contact_person,
      phone_number: customer.phone_number,
      email: customer.email,
      address: customer.address,
      city: customer.city,
      country: customer.country,
      notes: customer.notes,
      branch_name: customer.branch.name,
      customer_type: customer.customer_type,
      tax_number: customer.tax_number || "N/A",
      national_id: customer.national_id,
    })) || [];

  const columns = [
    { field: "id", header: "ID" },
    { field: "customer_name", header: "Customer Name" },
    { field: "contact_person", header: "Contact Person" },
    { field: "phone_number", header: "Phone Number" },
    { field: "email", header: "Email" },
    { field: "address", header: "Address" },
    // { field: "city", header: "City" },
    // { field: "country", header: "Country" },
    // { field: "notes", header: "Notes" },
    { field: "branch_name", header: "Branch Name" },
    // { field: "customer_type", header: "Customer Type" },
    // { field: "tax_number", header: "Tax Number" },
    // { field: "national_id", header: "National ID" },
  ];

  const cardsData = [
    { title: "New requests", num: 145 },
    { title: "Complete", num: 87 },
    { title: "Pending", num: 3200 },
    { title: "Failed", num: 48 },
    { title: "Paid", num: 48 },
  ];

  const handleClick = () => {
    router.push("/dashboard/sales/sales-customer/create");
  };

  return (
    <>
      {isLoading ? (
        <>
          <CardsSkelton />
          <TableSkelton />
        </>
      ) : error ? (
        <div className="flex justify-center flex-col items-center pb-10">
          <Image
            src="/assets/icons/dashboard/loading-error.svg"
            alt="loading error"
            width="400"
            height="300"
          />
          Error loading data
        </div>
      ) : (
        <CustomTable
          emptyMessage="No sales customers data found"
          editRoute="/dashboard/sales/sales-customer/edit/"
          data={transformedData}
          rows={10}
          columns={columns}
          cardData={cardsData}
          buttonText="Add Sales Customer"
          ButtonEvent={handleClick}
          onPageChange={handlePageChange}
          totalRecords={salesCustomers?.count || 0}
        />
      )}
    </>
  );
}