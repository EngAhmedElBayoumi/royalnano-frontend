import { financeRow } from "./finance";

import React, { useState } from "react";
import { NewAccountDialog } from "./new-account-dialog";
import { useGetFinanceByIdQuery } from "@/redux/services/dashboard/finance/financeApi";
import { Skeleton } from "@/components/ui/skeleton";
type FinanceRowWithChildren = financeRow & { children?: financeRow[] };

type Finance = FinanceRowWithChildren[];
interface FinanceCardProps {
  finance: Finance;
}

interface FinanceCardProps {
  finance: Finance;
}

export default function FinanceCard({ finance }: FinanceCardProps) {
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(
    null
  );
  const { data: accountDetails, isLoading: loading } = useGetFinanceByIdQuery(
    selectedAccountId,
    {
      skip: selectedAccountId === null,
    }
  );

  const getAccount = (id: number) => {
    setSelectedAccountId(id);
  };

  return (
    <div className="flex gap-6">
      <div className="w-[179px] h-[334px] overflow-y-auto flex flex-col justify-start items-start p-[16px_20px] border border-[#DDDCDF] rounded-[10px] bg-[#F9F9F9]">
        <p className="text-[#D9B44A] text-[13px] mb-1">شجره الحساب</p>

        {finance?.map((item: financeRow) => (
          <div
            key={item.id}
            className="flex w-full items-center gap-2 cursor-pointer"
            onClick={() => console.log(item.id)} // Replace with your function to get account
          >
            <div className="lick-shape">
              <div className="line"></div>
              <div className="curve"></div>
            </div>
            <p
              className="text-[#888888] text-[12px]"
              onClick={() => getAccount(item.id)}
            >
              {item?.name}
            </p>
          </div>
        ))}
        <div className="flex h-full items-end ">
          {/* Add New Account Button */}
          <NewAccountDialog />
        </div>
      </div>
      {/* tree child */}
      {loading ? (
        <div className="w-[179px] h-[334px] overflow-y-auto flex flex-col justify-center items-center gap-6 p-[16px_20px] border border-[#DDDCDF] rounded-[10px] bg-[#F9F9F9]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton className="h-[20px] w-full rounded-md" key={index} />
          ))}
        </div>
      ) : accountDetails?.children && accountDetails?.children.length > 0 ? (
        <div className="w-[179px] h-[334px] flex flex-col justify-start items-start p-[16px_20px] border border-[#DDDCDF] rounded-[10px] bg-[#F9F9F9]">
          <p className="text-[#D9B44A] text-[13px] mb-1">شجره الحساب</p>
          {accountDetails?.children?.map((item: financeRow) => (
            <div
              key={item.id}
              className="flex w-full items-center gap-2 cursor-pointer"
              onClick={() => console.log(item.id)} // Replace with your function to get account
            >
              <div className="lick-shape">
                <div className="line"></div>
                <div className="curve"></div>
              </div>
              <p className="text-[#888888] text-[12px]">{item?.name}</p>
            </div>
          ))}

          <div className="flex h-full items-end gap-2 cursor-pointer">
            <NewAccountDialog id={selectedAccountId !== null ? selectedAccountId : undefined}/>
          </div>
        </div>
      ) : (
        <div className="w-[179px] h-[334px] flex flex-col justify-center items-center p-[16px_20px] border border-[#DDDCDF] rounded-[10px] bg-[#F9F9F9]">
          <p className="text-[#888888] text-[12px]">
            No child accounts available
          </p>
        </div>
      )}
      {/* <AddAccountDialog open={open} handleClose={handleClose} /> */}
    </div>
  );
}
