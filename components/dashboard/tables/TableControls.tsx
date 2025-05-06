/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnConfig } from "./types";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "@/components/ui/button";
import { DataTable } from "primereact/datatable";

interface TableControlsProps {
  globalFilterValue: string;
  onGlobalFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  visibleColumns: ColumnConfig[];
  columns: { field: string; header: string }[];
  onColumnToggle: (e: { value: ColumnConfig[] }) => void;
  buttonText?: string;
  ButtonEvent: React.MouseEventHandler<HTMLButtonElement>;
  t: (key: string) => string;
  tableData: Record<string, any>[];
  dataTableRef: React.RefObject<DataTable<any>>;
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
  tableData,
  dataTableRef,
}: TableControlsProps) => {
  const exportColumns = columns.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));
  const exportCSV = (selectionOnly: boolean) => {
    if (dataTableRef.current) {
      dataTableRef.current.exportCSV({ selectionOnly });
    }
  };

  const exportPdf = async () => {
    const jsPDFModule = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;
    const doc = new jsPDFModule.jsPDF();

    autoTable(doc, {
      head: [exportColumns.map((col) => col.title)],
      body: tableData.map((row) =>
        exportColumns.map((col) => row[col.dataKey as keyof typeof row])
      ),
    });

    doc.save("tableData.pdf");
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(tableData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "tableData");
    });
  };

  const saveAsExcelFile = (buffer: BlobPart, fileName: string) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        const EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };
  return (
    <div className="flex mb-4 flex-col flex-wrap gap-2">
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
      <div className="flex gap-2 items-center w-full xs:w-auto flex-wrap justify-end">
        <Button
          className="bg-primary text-white capitalize"
          onClick={() => exportCSV(false)}
        >
          export to csv
        </Button>
        <Button
          className="bg-primary text-white capitalize"
          onClick={exportExcel}
        >
          Export to Excel
        </Button>
        <Button
          className="bg-primary text-white capitalize"
          onClick={exportPdf}
        >
          Export to pdf
        </Button>
        {buttonText && (
          <Button
            className="bg-primary text-white capitalize"
            onClick={ButtonEvent}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default TableControls;
