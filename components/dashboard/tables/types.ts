import { MouseEventHandler, ReactNode } from "react";
import { InfoCardInterface } from "../cards/InfoCard";

export interface DataInTable {
  id: number;
  [key: string]: ReactNode;
}

export interface ColumnConfig {
  field: string;
  header: string;
}

export interface CustomTableProps {
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
