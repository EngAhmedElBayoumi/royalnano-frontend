"use client";
import React, { useState, useEffect, MouseEventHandler } from "react";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { FilterMatchMode } from "primereact/api";
import InfoCard, { InfoCardInterface } from '../cards/InfoCard';
import IconWithTitle from '../IconWithTitle';
import { Button } from '@/components/ui/button';
import EmptyMessage from '../EmptyMessage';
import './CustomTable.css'
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
  cardData: InfoCardInterface[];
  buttonText:string;
  ButtonEvent?:MouseEventHandler<HTMLButtonElement>;
}

export default function CustomTable({ data, rows, columns,cardData, buttonText ,ButtonEvent}: CustomTableProps) {

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

  const renderHeader = () => {
    return (
      <>
      
      
      {/* <div className="flex justify-content-center items-center"> */}
        <IconField  >
         
          {/* <div className='flex justify-center items-center mb-10 gap-6'> */}
            
        
           <InfoCard data={cardData}/>
        

          {/* </div> */}
          <div className='flex mb-4 justify-between self-center'>
            
          <InputText
            className=" border bg-transparent border-[#474747] pl-2 w-[25%] py-2 rounded-[10px]"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search"

            
            />
           
            <Button className='bg-primary text-white' onClick={ButtonEvent} >{buttonText}</Button>
            </div>
           {/* <InputIcon className="pi pi-search absolute right-2 top-2.5" /> */}
        </IconField>
      {/* </div> */}
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
    return` hoverable-row ${rowIndex % 2 === 0 ? "bg-[#EAE4D1] mx-2 " : "bg-[#E9DDB1] mx-2"}`;
  }}
>
  {columns.map((col, index) => (
    <Column
      key={col.field}
      headerStyle={headerStyle}
      field={col.field}
      header={col.header}
      
      className={`m-auto py-[13px] px-[38px] text-[14px] font-[500] border-r border-white border-[2px]  `}  
      headerClassName={`text-center  text-white text-[16px] font-[500] py-[13px] px-[38px] border-r border-white border-[2px]   ${
        index === 0 ? 'first-column-header' : index === columns.length - 1 ? 'last-column-header' : ''
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
</DataTable>

    </div>
    </>
  );
}
