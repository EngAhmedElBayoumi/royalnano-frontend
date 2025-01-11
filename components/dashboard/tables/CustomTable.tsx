"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { FilterMatchMode } from "primereact/api";

interface Customer {
  id: number;
  name: string;
  country: string;
  status: string;
  verified: boolean;
  representative: string;
}

interface ColumnConfig {
  field: string;
  header: string;
}

interface CustomTableProps {
  data: Customer[];
  rows: number;
  columns: ColumnConfig[];
}

export default function CustomTable({ data, rows, columns }: CustomTableProps) {
  const [customers, setCustomers] = useState<Customer[]>(data);
  const [filters, setFilters] = useState<any>({
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

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            className="mb-4 border border-[#474747] px-2 py-3 rounded-[10px]"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search"
          />
        </IconField>
      </div>
    );
  };

  const header = renderHeader();
  const headerStyle = { backgroundColor: "#C8AE50" };

  return (
    <div className="card">
      <DataTable
        // lazy
        value={customers}
        paginator
        rows={rows}
        filters={filters}
        globalFilterFields={columns.map((col) => col.field)}
        header={header}
        emptyMessage="No customers found."
        dataKey="id"
        className="rounded-tl-[10px] rounded-tr-[10px]"
        rowClassName={(data) => {
          const rowIndex = customers.findIndex((item) => item.id === data.id);
          return rowIndex % 2 === 0 ? "bg-[#EAE4D1] mx-2" : "bg-[#E9DDB1] mx-2";
        }}
      >
        {columns.map((col) => (
          <Column
            key={col.field}
            headerStyle={headerStyle}
            field={col.field}
            header={col.header}
            style={{ minWidth: "12rem" }}
            body={(rowData: Customer) => {
              if (col.field === "verified") {
                return (
                  <i
                    className={`pi ${
                      rowData[col.field] ? "pi-check-circle" : "pi-times-circle"
                    }`}
                  ></i>
                );
              }
              return rowData[col.field];
            }}
          />
        ))}
      </DataTable>
    </div>
  );
}
