"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "../skelton/TableSkelton";
import CardsSkelton from "../skelton/CardsSkelton";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useState } from "react";
import { useGetSalesCustomerQuery } from "@/redux/services/dashboard/sales/salesCustomerApi";
import ReassignDialog from "./ReassignDialog";

export default function SalesCustomer() {
  const [page, setPage] = useState(1);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<number[]>([]);
  const [isReassignDialogOpen, setIsReassignDialogOpen] = useState(false);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const {
    isLoading,
    error,
    data: salesCustomers,
    refetch,
  } = useGetSalesCustomerQuery({
    search: "",
    ordering: "id",
    page,
    page_size: 10,
  });
  
  console.log(salesCustomers);
  const router = useRouter();
  console.log("Sales Customers API Response:", salesCustomers);

  const transformedData =
    salesCustomers?.results?.map(
      (customer: {
        phone_number: string;
        phone_numbers: { phone_number: string }[];
        id: number;
        customer_name: string;
        contact_person: string;
        email: string;
        address: string;
        city: string;
        country: string;
        notes: string;
        branch: { name: string };
        customer_type: string;
        tax_number: number;
        national_id: number;
      }) => ({
        id: customer.id,
        customer_name: customer.customer_name,
        contact_person: customer.contact_person,
        phone_number:
          customer.phone_number ||
          customer.contact_person ||
          customer.phone_numbers[0]?.phone_number ||
          "No Phone number",
        email: customer.email,
        address: customer.address,
        city: customer.city,
        country: customer.country,
        notes: customer.notes,
        branch_name: customer.branch?.name,
        customer_type: customer.customer_type,
        tax_number: customer.tax_number || "N/A",
        national_id: customer.national_id,
        assigned_to_name: customer.assigned_to_name,
      })
    ) || [];

  console.log("Transformed Data:", transformedData);

  const columns = [
    { field: "id", header: "ID" },
    { field: "customer_name", header: "Customer Name" },
    { field: "phone_number", header: "Phone Number" },
    { field: "email", header: "Email" },
    { field: "branch_name", header: "Branch Name" },
    { field: "assigned_to_name", header: "Assigned To" },
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

  const handleSelectionChange = (selectedIds: number[]) => {
    setSelectedCustomerIds(selectedIds);
  };

  const handleReassignClick = () => {
    setIsReassignDialogOpen(true);
  };

  const handleReassignSuccess = () => {
    setSelectedCustomerIds([]);
    refetch(); // Refresh the data
  };

  console.log("CustomTable Props in SalesCustomer:", {
    data: transformedData,
    rows: 10,
    columns,
    cardsData,
    buttonText: "Add Sales Customer",
    ButtonEvent: handleClick,
    onPageChange: handlePageChange,
    totalRecords: salesCustomers?.count || 0,
  });

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
        <>
          <CustomTable
            emptyMessage="No sales customers data found"
            editRoute="/dashboard/sales/sales-customer/edit/"
            data={transformedData}
            rows={10}
            viewRoute="/dashboard/sales/sales-customer/view"
            columns={columns}
            cardData={cardsData}
            buttonText="Add Sales Customer"
            ButtonEvent={handleClick}
            onPageChange={handlePageChange}
            totalRecords={salesCustomers?.count || 0}
            enableSelection={true}
            selectedRows={selectedCustomerIds}
            onSelectionChange={handleSelectionChange}
            onReassignClick={handleReassignClick}
            reassignButtonText="إعادة التعيين"
          />
          
          <ReassignDialog
            isOpen={isReassignDialogOpen}
            onClose={() => setIsReassignDialogOpen(false)}
            selectedCustomerIds={selectedCustomerIds}
            onSuccess={handleReassignSuccess}
          />
        </>
      )}
    </>
  );
}
