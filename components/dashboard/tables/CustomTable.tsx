"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Paginator } from "primereact/paginator";
import "./CustomTable.css";
import TableControls from "./TableControls";
import TableIconHeader from "./TableIconHeader";
import { renderColumnBody } from "./TableColumnBody";
import TableActions from "./TableActions";
import EmptyMessage from "@/components/dashboard/EmptyMessage";

import type { DataInTable, CustomTableProps, ColumnConfig } from "./types";

const CustomTable = ({
  data,
  rows,
  columns,
  buttonText,
  ButtonEvent,
  headerIcon,
  headerTitle,
  headerBG,
  headerTextColor,
  secondHeaderIcon,
  secondHeaderTitle,
  secondHeaderBG,
  secondHeaderTextColor,
  viewRoute,
  editRoute,
  emptyMessage,
  onPageChange,
  totalRecords,
  isClientRequest,
  onSetInitialPrice,
}: CustomTableProps) => {
  const router = useRouter();
  const t = useTranslations();

  const [tableData, setTableData] = useState<DataInTable[]>(data);
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
    setTableData(data);
  }, [data]);

  const handleGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const dataTableRef = useRef<DataTable<DataInTable[]>>(null);
  const header = (
    <TableControls
      globalFilterValue={globalFilterValue}
      onGlobalFilterChange={handleGlobalFilterChange}
      visibleColumns={visibleColumns}
      columns={columns}
      onColumnToggle={(e) => {
        const selected = columns.filter((col) =>
          e.value.some((s: ColumnConfig) => s.field === col.field)
        );
        setVisibleColumns(selected);
      }}
      buttonText={buttonText}
      ButtonEvent={ButtonEvent}
      t={t}
      tableData={tableData}
      dataTableRef={dataTableRef}
    />
  );

  return (
    <>
      <TableIconHeader
        headerIcon={headerIcon}
        headerTitle={headerTitle}
        headerBG={headerBG}
        headerTextColor={headerTextColor}
        secondHeaderIcon={secondHeaderIcon}
        secondHeaderTitle={secondHeaderTitle}
        secondHeaderBG={secondHeaderBG}
        secondHeaderTextColor={secondHeaderTextColor}
      />

      {data.length ? (
        <div className="mb-5 bg-dashboardBg p-4 rounded-[20px]">
          <DataTable
            ref={dataTableRef}
            value={tableData}
            rows={rows}
            filters={filters}
            globalFilterFields={columns.map((c) => c.field)}
            header={header}
            dataKey="id"
            emptyMessage={
              <EmptyMessage onClick={ButtonEvent} emptyMessage={emptyMessage} />
            }
            rowClassName={(data) =>
              `hoverable-row ${
                tableData.findIndex((item) => item.id === data.id) % 2 === 0
                  ? "bg-[#EAE4D1] mx-2"
                  : "bg-[#E9DDB1] mx-2"
              }`
            }
          >
            {visibleColumns.map((col) => (
              // <Column
              //   key={col.field}
              //   field={col.field}
              //   header={col.header}
              //   headerStyle={{ backgroundColor: "#C8AE50" }}
              //   className="rtl:text-right m-auto py-[13px] px-[38px] text-[14px] font-[500] border-r border-white border-[2px]"
              //   headerClassName="text-center capitalize text-white text-[16px] font-[500] py-[13px] px-[38px] border-r border-white border-[2px]"
              //   body={(rowData) =>
              //     renderColumnBody({ col, rowData, expandedRows, toggleExpand })
              //   }
              // />
              <Column
                key={col.field}
                field={col.field}
                header={col.header}
                headerStyle={{ backgroundColor: "#C8AE50" }}
                className="rtl:text-right m-auto py-[13px] px-[38px] text-[14px] font-[500] border-r border-white border-[2px]"
                headerClassName="text-center capitalize text-white text-[16px] font-[500] py-[13px] px-[38px] border-r border-white border-[2px]"
                body={(rowData) =>
                  col.render
                    ? col.render(rowData)
                    : renderColumnBody({
                        col,
                        rowData,
                        expandedRows,
                        toggleExpand,
                      })
                }
              />
            ))}

            {(viewRoute || editRoute || isClientRequest) && (
              <Column
                header="Actions"
                headerClassName="text-center text-white text-[16px] font-[500] py-[13px] px-[38px] border-r border-white border-[2px] bg-primary rounded-tr-[10px]"
                style={{ width: "5rem", textAlign: "center" }}
                body={(rowData: DataInTable) => (
                  <TableActions
                    id={rowData.id}
                    status={rowData.status as string}
                    onView={viewRoute ? handleViewClick : undefined}
                    onEdit={editRoute ? handleEditClick : undefined}
                    onSetInitialPrice={onSetInitialPrice}
                    isClientRequest={isClientRequest}
                    t={t}
                    showView={!!viewRoute}
                    showEdit={!!editRoute}
                  />
                )}
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
                onPageChange?.(e.page + 1);
              }}
            />
          )}
        </div>
      ) : (
        <EmptyMessage onClick={ButtonEvent} emptyMessage={emptyMessage} />
      )}
    </>
  );
};

export default CustomTable;
