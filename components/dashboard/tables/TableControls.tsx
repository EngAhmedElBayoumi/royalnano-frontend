"use client";
import React from "react";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "@/components/ui/button";
import { ColumnConfig } from "./types";

interface TableControlsProps {
  globalFilterValue: string;
  onGlobalFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  visibleColumns: ColumnConfig[];
  columns: { field: string; header: string }[];
  onColumnToggle: (e: { value: ColumnConfig[] }) => void;
  buttonText?: string;
  ButtonEvent: React.MouseEventHandler<HTMLButtonElement>;
  t: (key: string) => string;
}

const TableControls = ({
  globalFilterValue,
  onGlobalFilterChange,
  visibleColumns,
  columns,
  onColumnToggle,
  buttonText,
  ButtonEvent,
  t,
}: TableControlsProps) => (
  <div className="flex mb-4 justify-between items-center flex-wrap gap-2">
    <div className="flex gap-2 items-center w-full xs:flex-1 flex-wrap">
      <InputText
        className="shadow-none border bg-transparent border-[#474747] px-2 w-[100%] xs:w-[25rem] py-[0.42rem] rounded-[10px] text-sm"
        value={globalFilterValue}
        onChange={onGlobalFilterChange}
        placeholder={t("search")}
      />
      <MultiSelect
        value={visibleColumns}
        options={columns}
        optionLabel="header"
        onChange={onColumnToggle}
        className="shadow-none w-full xs:w-[25rem] border border-[#474747] bg-transparent rounded-[10px]"
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
);

export default TableControls;
