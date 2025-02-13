"use client";
import React, {
  useState,
  useEffect,
  MouseEventHandler,
  ReactNode,
} from "react";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import { FilterMatchMode } from "primereact/api";
import EmptyMessage from "@/components/dashboard/EmptyMessage";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import "./CustomTable.css";
import InfoCardsComponent, { InfoCardInterface } from "../cards/InfoCard";

export interface DataInTable {
  id: number;
  [key: string]: ReactNode;
}

interface ColumnConfig {
  field: string;
  header: string;
}

interface CustomTableProps {
  data: DataInTable[];
  rows: number;
  columns: ColumnConfig[];
  cardData: InfoCardInterface[];
  buttonText?: string;
  ButtonEvent: MouseEventHandler<HTMLButtonElement>;
  headerIcon?: string;
  headerTitle?: string;
  headerBG?: string;
  headerTextColor?: string;
  secondHeaderIcon?: string;
  secondHeaderTitle?: string;
  secondHeaderBG?: string;
  secondHeaderTextColor?: string;
  editRoute?: string;
  viewRoute?: string;
  detailsRoute?: string;
  emptyMessage: string;
}

export default function CustomTable({
  viewRoute,
  editRoute,
  detailsRoute,
  data,
  rows,
  columns,
  cardData,
  buttonText,
  ButtonEvent,
  headerBG,
  headerIcon,
  headerTextColor,
  headerTitle,
  secondHeaderBG,
  secondHeaderIcon,
  secondHeaderTextColor,
  secondHeaderTitle,
  emptyMessage,
}: CustomTableProps) {
  const router = useRouter();
  const [customers, setCustomers] = useState<DataInTable[]>(data);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  useEffect(() => {
    setCustomers(data);
  }, [data]);

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters({ global: { value, matchMode: FilterMatchMode.CONTAINS } });
    setGlobalFilterValue(value);
  };

  const handleViewClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`${viewRoute}?id=${id}`);
  };
  const handleEditClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`${editRoute}?id=${id}`);
  };

  const renderHeader = () => (
    <>
      <InfoCardsComponent data={cardData} />
      <div className="flex mb-4 justify-between self-center">
        <InputText
          className="border bg-transparent border-[#474747] pl-2 w-[25%] py-2 rounded-[10px]"
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Search"
        />
        {buttonText && (
          <Button
            className="bg-primary text-white capitalize"
            onClick={ButtonEvent}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </>
  );

  const header = renderHeader();
  const headerStyle = {
    backgroundColor: "#C8AE50",
  };

  return (
    <>
      {((headerIcon && headerTitle && headerBG && headerTextColor) ||
        (secondHeaderIcon &&
          secondHeaderTitle &&
          secondHeaderBG &&
          secondHeaderTextColor)) && (
        <div className="flex">
          {headerIcon && headerTitle && headerBG && headerTextColor && (
            <IconWithTitle
              imageSrc={headerIcon}
              title={headerTitle}
              backgroundColor={headerBG}
              textColor={headerTextColor}
            />
          )}
          {secondHeaderIcon &&
            secondHeaderTitle &&
            secondHeaderBG &&
            secondHeaderTextColor && (
              <IconWithTitle
                imageSrc={secondHeaderIcon}
                title={secondHeaderTitle}
                backgroundColor={secondHeaderBG}
                textColor={secondHeaderTextColor}
              />
            )}
        </div>
      )}
      <div className="bg-dashboardBg px-4 pt-4 pb-1 rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] card mb-5 ">
        {data && data.length > 0 ? (
          <DataTable
            value={customers}
            paginator
            rows={rows}
            filters={filters}
            globalFilterFields={columns.map((col) => col.field)}
            header={header}
            emptyMessage={<EmptyMessage  onClick={ButtonEvent}  emptyMessage={emptyMessage} />}
            dataKey="id"
            onRowClick={(e) => {
              router.push(`${detailsRoute}${e.data.id}`);
            }}
            className="rounded-tl-[10px] rounded-tr-[10px] custom-header"
            rowClassName={(data) => {
              const rowIndex = customers.findIndex(
                (item) => item.id === data.id
              );
              return `hoverable-row ${
                rowIndex % 2 === 0 ? "bg-[#EAE4D1] mx-2 " : "bg-[#E9DDB1] mx-2"
              }`;
            }}
          >
            {columns.map((col, index) => (
              <Column
                key={col.field}
                headerStyle={headerStyle}
                field={col.field}
                header={col.header}
                className={`m-auto py-[13px] px-[38px] text-[14px] font-[500] border-r border-white border-[2px]`}
                headerClassName={`text-center capitalize text-white text-[16px] font-[500] py-[13px] px-[38px] border-r border-white border-[2px] ${
                  index === 0
                    ? "first-column-header"
                    : index === columns.length - 1
                    ? ""
                    : ""
                }`}
                body={(rowData: DataInTable) => {
                  if (col.field === "verified") {
                    return (
                      <i
                        className={`pi ${
                          rowData[col.field]
                            ? "pi-check-circle hover-bg-primary"
                            : "pi-times-circle hover-bg-primary"
                        }`}
                      ></i>
                    );
                  }
                  return rowData[col.field as keyof DataInTable];
                }}
              />
            ))}

            {(viewRoute || editRoute) && (
              <Column
                body={(rowData: DataInTable) => (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-gray-500">
                        <Image
                          className="hover:fill-white"
                          width={30}
                          height={30}
                          alt="img"
                          src="/assets/icons/menuIcon.svg"
                        />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
                      {viewRoute && (
                        <DropdownMenuItem
                          className="bg-dashboardBg shadow-md py-1 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewClick(rowData.id, e);
                          }}
                        >
                          View
                        </DropdownMenuItem>
                      )}
                      {editRoute && (
                        <DropdownMenuItem
                          className="bg-dashboardBg shadow-md py-1 cursor-pointer  "
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(rowData.id, e);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                headerClassName="text-center  text-white text-[16px] font-[500] py-[13px] px-[38px] border-r border-white border-[2px] bg-primary rounded-tr-[1e0px]"
                header="     "
                style={{ width: "5rem", textAlign: "center" }}
              />
            )}
          </DataTable>
        ) : (
          <EmptyMessage onClick={ButtonEvent} emptyMessage={emptyMessage} />
        )}
      </div>
    </>
  );
}
