"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "../skelton/TableSkelton";
import CardsSkelton from "../skelton/CardsSkelton";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { useGetClientRequestQuery } from "@/redux/services/clientRequestApi";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";

export default function ClientRequest() {
  const [page, setPage] = useState(1);
  const [branchNames, setBranchNames] = useState<{ [key: number]: string }>({}); 

  const handlePageChange = (newPage: number) => {
    console.log("Page changed to:", newPage); 
    setPage(newPage);
  };

  const {
    isLoading: isClientRequestsLoading,
    error: clientRequestsError,
    data: clientRequests,
  } = useGetClientRequestQuery({
    search: "",
    ordering: "id",
    page,
    page_size: 10,
  });

  const {
    data: branchesData,
    isLoading: isBranchesLoading,
    error: branchesError,
  } = useGetBranchesQuery({});

  const router = useRouter();
  console.log("Client Requests API Response:", clientRequests);


  useEffect(() => {
    if (branchesData?.results) {
      const branchMap = branchesData.results.reduce((acc: { [x: string]: string; }, branch: { id: string | number; name: string; }) => {
        acc[branch.id] = branch.name;
        return acc;
      }, {} as { [key: number]: string });
      setBranchNames(branchMap);
    }
  }, [branchesData]);

  const transformedData =
    clientRequests?.results?.map((request: { id: number; full_name: string; phone_number: number; car_type: string; car_model: string; status: string; description: string; order_note: string; service: string; branch:   number; }) => ({
      id: request.id,
      full_name: request.full_name,
      phone_number: request.phone_number,
      car_type: request.car_type,
      car_model: request.car_model,
      status: request.status,
      description: request.description,
      order_note: request.order_note,
      service: request.service,
      branch_name: branchNames[request.branch] || "Loading...", 
    })) || [];

  console.log("Transformed Data:", transformedData);

  const columns = [
    { field: "id", header: "ID" },
    { field: "full_name", header: "Full Name" },
    { field: "phone_number", header: "Phone Number" },
    // { field: "car_type", header: "Car Type" },
    { field: "car_model", header: "Car Model" },
    // { field: "status", header: "Status" },
    { field: "branch_name", header: "Branch Name" },
  ];

  const cardsData = [
    { title: "New Requests", num: 145 },
    { title: "Completed", num: 87 },
    { title: "Pending", num: 3200 },
    { title: "Failed", num: 48 },
  ];

  const handleClick = () => {
    router.push("/dashboard/sales/client-requests/create");
  };

  console.log("CustomTable Props in ClientRequest:", {
    data: transformedData,
    rows: 10,
    columns,
    cardsData,
    buttonText: "Add Client Request",
    ButtonEvent: handleClick,
    onPageChange: handlePageChange,
    totalRecords: clientRequests?.count || 0,
  });

  return (
    <>
      {isClientRequestsLoading || isBranchesLoading ? (
        <>
          <CardsSkelton />
          <TableSkelton />
        </>
      ) : clientRequestsError || branchesError ? (
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
          emptyMessage="No client requests data found"
          editRoute="/dashboard/sales/client-requests/edit/"
          data={transformedData}
          rows={10}
          columns={columns}
          cardData={cardsData}
          buttonText="Add Client Request"
          ButtonEvent={handleClick}
          onPageChange={handlePageChange}
          totalRecords={clientRequests?.count || 0}
        />
      )}
    </>
  );
}