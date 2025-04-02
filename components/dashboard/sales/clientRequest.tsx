"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "../skelton/TableSkelton";
import CardsSkelton from "../skelton/CardsSkelton";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { useGetClientRequestQuery } from "@/redux/services/clientRequestApi";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";
import CustomModal from "@/components/modals/CustomModal";
import TextInput from "@/components/formFields/TextInput";
import { usePostSetPriceMutation } from "@/redux/services/dashboard/sales/setPriceApi";

export default function ClientRequest() {
  const [page, setPage] = useState(1);
  const [branchNames, setBranchNames] = useState<{ [key: number]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null
  );
  const [price, setPrice] = useState<number>(0);
  const [postSetPrice, { isLoading }] = usePostSetPriceMutation();

  const handlePageChange = (newPage: number) => {
    console.log("Page changed to:", newPage);
    setPage(newPage);
  };

  const handleSetInitialPrice = (requestId: number) => {
    setSelectedRequestId(requestId);
    setIsModalOpen(true);
  };

  const handleSubmitPrice = async () => {
    if (selectedRequestId && price) {
      try {
        await postSetPrice({
          request_id: selectedRequestId,
          data: { initial_price: price },
        }).unwrap();
        setIsModalOpen(false);
        setPrice(0);
        refetch();
      } catch (error) {
        console.error("Failed to set price:", error);
      }
    }
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
    refetch,
  } = useGetBranchesQuery({});

  const router = useRouter();

  useEffect(() => {
    if (branchesData?.results) {
      const branchMap = branchesData.results.reduce(
        (
          acc: { [x: string]: string },
          branch: { id: string | number; name: string }
        ) => {
          acc[branch.id] = branch.name;
          return acc;
        },
        {} as { [key: number]: string }
      );
      setBranchNames(branchMap);
    }
  }, [branchesData]);

  useEffect(() => {
    refetch();
  }, [refetch]);
  const transformedData =
    clientRequests?.results?.map(
      (request: {
        id: number;
        full_name: string;
        phone_number: number;
        car_type: string;
        car_model: string;
        status: string;
        description: string;
        order_note: string;
        service: string;
        branch: number;
      }) => ({
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
      })
    ) || [];

  const columns = [
    { field: "id", header: "ID" },
    { field: "full_name", header: "Full Name" },
    { field: "phone_number", header: "Phone Number" },
    { field: "car_model", header: "Car Model" },
    { field: "branch_name", header: "Branch Name" },
    { field: "status", header: "Status" },
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

  return (
    <>
      <CustomModal
        isOpen={isModalOpen}
        onChange={setIsModalOpen}
        title="Set Initial Price"
        description="Enter the initial price for the request."
      >
        <div className="space-y-4">
          <TextInput
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            type="number"
          />
          <button
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={handleSubmitPrice}
            disabled={isLoading || !price}
          >
            Submit
          </button>
        </div>
      </CustomModal>

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
          isClientRequest={true}
          onSetInitialPrice={handleSetInitialPrice} // Pass the handler
        />
      )}
    </>
  );
}
