"use client";
import React, { useState, useEffect } from "react";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { FilterMatchMode } from "primereact/api";
import InfoCard from './cards/InfoCard';
import IconWithTitle from './IconWithTitle';
import { Button } from '@/components/ui/button';
import EmptyMessage from './EmptyMessage';

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
  
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const cardsData = [
    { title: 'Customers', num: 145 },
    { title: 'Orders', num: 87 },
    { title: 'Revenue', num: 3200 },
    { title: 'Products', num: 48 },
  ];
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
      <>
      
      
      <div className="flex justify-content-center items-center">
        <IconField  >
          <InputIcon className="pi pi-search" />
          <div className='flex justify-center items-center mb-10 gap-6'>
            
          {
            cardsData.map((data)=><InfoCard key={data.num} num={data.num} title={data.title} />)
          }

          </div>
          <div className='flex justify-between self-center'>
            
          <InputText
            className="mb-4 border border-[#474747] px-2 py-3 rounded-[10px]"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search"
            
            />
            <Button className='bg-primary text-white' >Add Client</Button>
            </div>
           {/* <InputIcon className="pi pi-search absolute right-2 top-2.5" /> */}
        </IconField>
      </div>
      </>
    );
  };

  const header = renderHeader();
  const headerStyle = {
    backgroundColor: "#C8AE50",
    // borderTopLeftRadius: "10px", 
    // borderTopRightRadius: "10px", 
  };
  

  return (
    <>
    <div className='flex '>

<IconWithTitle imageSrc='/assets/icons/client.svg' title='Client' backgroundColor='#F8F7F7' textColor='#C8AE50' />
<IconWithTitle imageSrc='/assets/icons/importCustomerList.svg' title='Import Customer List' backgroundColor='transparent' textColor='#C8AE50' />
    </div>
    <div className="bg-[#F8F7F7] px-4 pt-4 pb-1 rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] card">

      <DataTable
  
        value={customers}
        paginator
        rows={rows}
        filters={filters}
        globalFilterFields={columns.map((col) => col.field)}
        header={header}
        emptyMessage=<EmptyMessage/>
        dataKey="id"
        className="rounded-tl-[10px] rounded-tr-[10px]"
        rowClassName={(data) => {

          const rowIndex = customers.findIndex((item) => item.id === data.id);

          return rowIndex % 2 === 0 ? "bg-[#EAE4D1] mx-2 " : "bg-[#E9DDB1] mx-2";
        }}
        // Remove scrollbar by not setting scrollable property
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
              return rowData[col.field as keyof Customer];
            }}
          />
        ))}
      </DataTable>
    </div>
    </>
  );
}
