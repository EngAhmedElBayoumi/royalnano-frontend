"use client";
import React, {
  useState,
  useEffect,
  MouseEventHandler,
  ReactNode,
} from "react";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { MultiSelect } from "primereact/multiselect";
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
import { InfoCardInterface } from "../cards/InfoCard";
import { useTranslations } from "next-intl";
import { Paginator } from "primereact/paginator";

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
  emptyMessage: string;
  onPageChange?: (page: number) => void;
  totalRecords?: number;
  isClientRequest?: boolean;
  onSetInitialPrice?: (requestId: number) => void; // Add this prop
}

export default function CustomTable({
  viewRoute,
  editRoute,
  data,
  rows,
  columns,
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
  onPageChange,
  totalRecords,
  isClientRequest,
  onSetInitialPrice, // Add this prop
}: CustomTableProps) {
  const router = useRouter();
  const t = useTranslations();
  const [customers, setCustomers] = useState<DataInTable[]>(data);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [page, setPage] = useState(0);
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [visibleColumns, setVisibleColumns] = useState(columns);

  useEffect(() => {
    setCustomers(data);
  }, [data]);

  const onColumnToggle = (event: { value: ColumnConfig[] }) => {
    const selectedColumns = event.value;
    const orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol: ColumnConfig) => sCol.field === col.field)
    );
    setVisibleColumns(orderedSelectedColumns);
  };

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

  const toggleExpand = (id: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderHeader = () => (
    <>
      {/* <InfoCardsComponent data={cardData} /> */}
      <div className="flex mb-4 justify-between items-center flex-wrap gap-2">
        <div className="flex gap-2 items-center w-full xs:flex-1 flex-wrap">
          <InputText
            className="border bg-transparent border-[#474747] px-2 w-[100%] xs:w-[25rem] py-[0.42rem] rounded-[10px] text-sm"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder={t("search")}
          />
          <MultiSelect
            value={visibleColumns}
            options={columns}
            optionLabel="header"
            onChange={onColumnToggle}
            className="w-full xs:w-[25rem] border border-[#474747] bg-transparent rounded-[10px]"
            display="chip"
          />
        </div>
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
      {data && data.length > 0 ? (
        <div className="mb-5 bg-dashboardBg p-4 ltr:rounded-tr-[20px] rtl:rounded-tl-[20px] rounded-b-[20px]">
          <DataTable
            value={customers}
            rows={rows}
            filters={filters}
            globalFilterFields={columns.map((col) => col.field)}
            header={header}
            emptyMessage={
              <EmptyMessage onClick={ButtonEvent} emptyMessage={emptyMessage} />
            }
            dataKey="id"
            className="custom-header"
            rowClassName={(data) => {
              const rowIndex = customers.findIndex(
                (item) => item.id === data.id
              );
              return `hoverable-row ${
                rowIndex % 2 === 0 ? "bg-[#EAE4D1] mx-2 " : "bg-[#E9DDB1] mx-2"
              }`;
            }}
          >
            {visibleColumns.map((col) => (
              <Column
                key={col.field}
                headerStyle={headerStyle}
                field={col.field}
                header={col.header}
                className="m-auto py-[13px] px-[38px] text-[14px] font-[500] border-r border-white border-[2px]"
                headerClassName="text-center capitalize text-white text-[16px] font-[500] py-[13px] px-[38px] border-r border-white border-[2px]"
                body={(rowData: DataInTable) => {
                  const fieldValue = rowData[col.field];

                  if (
                    col.field === "gallery_images" &&
                    Array.isArray(fieldValue)
                  ) {
                    return (
                      // eslint-disable-next-line
                      <img
                        src={fieldValue?.[0]?.image as string}
                        alt={`${col.header} image`}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                    );
                  }
                  if (Array.isArray(fieldValue)) {
                    const isExpanded = expandedRows[rowData.id] || false;
                    const itemsToShow = isExpanded
                      ? fieldValue
                      : fieldValue.slice(0, 3);

                    return (
                      <div>
                        {itemsToShow.map((item, index) => (
                          <div key={index}>
                            {item.item_name ||
                              item.name ||
                              JSON.stringify(item)}
                            {index < itemsToShow.length - 1 && (
                              <hr className="border-black border-2 my-2" />
                            )}
                          </div>
                        ))}
                        {fieldValue.length > 3 && (
                          <Button
                            className="text-white mt-2 border border-white"
                            onClick={() => toggleExpand(rowData.id)}
                          >
                            {isExpanded ? "View Less" : "View More"}
                          </Button>
                        )}
                      </div>
                    );
                  }

                  if (col.field === "image" && fieldValue !== null) {
                    return (
                      // eslint-disable-next-line
                      <img
                        src={fieldValue as string}
                        alt={`${col.header} image`}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                    );
                  }

                  if (col.field === "video" && fieldValue !== null) {
                    return (
                      <video
                        controls
                        className="rounded-md object-cover"
                        width="200"
                        height="200"
                      >
                        <source src={fieldValue as string} />
                        Your browser does not support the video tag.
                      </video>
                    );
                  }
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
                  if (col.field === "email")
                    return (
                      <a href={`mailto:${rowData[col.field]}`}>
                        {rowData[col.field]}
                      </a>
                    );
                  return rowData[col.field as keyof DataInTable];
                }}
              />
            ))}

            {(viewRoute || editRoute || isClientRequest) && (
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
                          className="bg-dashboardBg shadow-md py-1 cursor-pointer capitalize"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewClick(rowData.id, e);
                          }}
                        >
                          {t("view")}
                        </DropdownMenuItem>
                      )}
                      {editRoute && (
                        <DropdownMenuItem
                          className="bg-dashboardBg shadow-md py-1 cursor-pointer capitalize"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(rowData.id, e);
                          }}
                        >
                          {t("edit")}
                        </DropdownMenuItem>
                      )}
                      {isClientRequest &&
                        rowData?.status === "pending" &&
                        onSetInitialPrice && (
                          <DropdownMenuItem
                            className="bg-dashboardBg shadow-md py-1 cursor-pointer capitalize"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSetInitialPrice(rowData.id);
                            }}
                          >
                            Set Initial Price
                          </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                headerClassName="text-center text-white text-[16px] font-[500] py-[13px] px-[38px] border-r border-white border-[2px] bg-primary rounded-tr-[10px]"
                header="Actions"
                style={{ width: "5rem", textAlign: "center" }}
              />
            )}
          </DataTable>

          {totalRecords && totalRecords > rows && (
            <Paginator
              first={page}
              rows={rows}
              totalRecords={totalRecords}
              onPageChange={(e) => {
                setPage(e.first);
                if (onPageChange) onPageChange(e.page + 1);
              }}
            />
          )}
        </div>
      ) : (
        <EmptyMessage onClick={ButtonEvent} emptyMessage={emptyMessage} />
      )}
    </>
  );
}
