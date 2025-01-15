"use client";
import React, { useState, useEffect, MouseEventHandler } from "react";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation"; 
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import { FilterMatchMode } from "primereact/api";
import EmptyMessage from "@/components/dashboard/EmptyMessage";
import Image from "next/image";

interface DataInTable {
  id: number;
  [key: string]: any;
}

interface ColumnConfig {
  field: string;
  header: string;
}

interface CustomTableProps {
  data: DataInTable[];
  rows: number;
  columns: ColumnConfig[];
  cardData: any[];
  buttonText: string;
  ButtonEvent?: MouseEventHandler<HTMLButtonElement>;
  headerIcon: string;
  headerTitle: string;
  headerBG: string;
  headerTextColor: string;
  secondHeaderIcon?: string;
  secondHeaderTitle?: string;
  secondHeaderBG?: string;
  secondHeaderTextColor?: string;
  editRoute:string
}

export default function CustomTable({
  editRoute,
  data, rows, columns, cardData, buttonText, ButtonEvent, headerBG, headerIcon, headerTextColor, headerTitle,
  secondHeaderBG, secondHeaderIcon, secondHeaderTextColor, secondHeaderTitle
}: CustomTableProps) {
  const router = useRouter();
  const [customers, setCustomers] = useState<DataInTable[]>(data);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [dropdownVisibility, setDropdownVisibility] = useState<{ [key: number]: boolean }>({}); 

  useEffect(() => {
    setCustomers(data);
  }, [data]);

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters({ global: { value, matchMode: FilterMatchMode.CONTAINS } });
    setGlobalFilterValue(value);
  };

  const handleDropdownToggle = (id: number) => {
    setDropdownVisibility((prevState) => ({
      ...prevState,
      [id]: !prevState[id], 
    }));
  };

  const handleEditClick = (id: number) => {
    router.push(`${editRoute}?id=${id}`);
    console.log(editRoute)
  };

  const renderHeader = () => (
    <div className="flex mb-4 justify-between self-center">
      <InputText
        className="border bg-transparent border-[#474747] pl-2 w-[25%] py-2 rounded-[10px]"
        value={globalFilterValue}
        onChange={onGlobalFilterChange}
        placeholder="Search"
      />
      <Button className="bg-primary text-white" onClick={ButtonEvent}>
        {buttonText}
      </Button>
    </div>
  );

  const header = renderHeader();
  const headerStyle = {
    backgroundColor: "#C8AE50",
  };

  return (
    <>
      <div className="flex">
        <IconWithTitle imageSrc={headerIcon} title={headerTitle} backgroundColor={headerBG} textColor={headerTextColor} />
        {secondHeaderIcon && secondHeaderTitle && secondHeaderBG && secondHeaderTextColor && (
          <IconWithTitle imageSrc={secondHeaderIcon} title={secondHeaderTitle} backgroundColor={secondHeaderBG} textColor={secondHeaderTextColor} />
        )}
      </div>
      <div className="bg-[#F8F7F7] px-4 pt-4 pb-1 rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] card mb-5 ">
        <DataTable
          value={customers}
          paginator
          rows={rows}
          filters={filters}
          globalFilterFields={columns.map((col) => col.field)}
          header={header}
          emptyMessage={<EmptyMessage />}
          dataKey="id"
          className="rounded-tl-[10px] rounded-tr-[10px] custom-header"
          rowClassName={(data) => {
            const rowIndex = customers.findIndex((item) => item.id === data.id);
            return `hoverable-row ${rowIndex % 2 === 0 ? "bg-[#EAE4D1] mx-2 " : "bg-[#E9DDB1] mx-2"}`;
          }}
        >
          {columns.map((col, index) => (
            <Column
              key={col.field}
              headerStyle={headerStyle}
              field={col.field}
              header={col.header}
              className={`m-auto py-[13px] px-[38px] text-[14px] font-[500] border-r border-white border-[2px]`}
              headerClassName={`text-center  text-white text-[16px] font-[500] py-[13px] px-[38px] border-r border-white border-[2px] ${
                index === 0 ? "first-column-header" : index === columns.length - 1 ? "last-column-header" : ""
              }`}
              style={{ minWidth: "12rem" }}
              body={(rowData: DataInTable) => {
                if (col.field === "verified") {
                  return (
                    <i
                      className={`pi ${
                        rowData[col.field] ? "pi-check-circle hover-bg-primary" : "pi-times-circle hover-bg-primary"
                      }`}
                    ></i>
                  );
                }
                return rowData[col.field as keyof DataInTable];
              }}
            />
          ))}
          <Column
            body={(rowData: DataInTable) => (
              <div className="relative">
                <button onClick={() => handleDropdownToggle(rowData.id)} className="text-gray-500">
                <Image width={30} height={30} alt="img" src="/assets/icons/menuIcon.svg"/>
                </button>
                {dropdownVisibility[rowData.id] && (
                  <div className="absolute right-0 bg-white shadow-lg rounded-md mt-2 w-40 p-2">
                    <button
                      onClick={() => {
                        handleEditClick(rowData.id);
                        setDropdownVisibility((prevState) => ({ ...prevState, [rowData.id]: false })); 
                      }}
                      className="w-full text-left px-3 py-1 text-gray-700 hover:bg-gray-200 rounded-md"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            )}
            header=""
            style={{ width: "5rem", textAlign: "center" }}
          />
        </DataTable>
      </div>
    </>
  );
}
