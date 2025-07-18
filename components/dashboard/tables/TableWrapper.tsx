import Image from "next/image";
import CustomTable from "./CustomTable";
import TableSkelton from "../skelton/TableSkelton";
import CardsSkelton from "../skelton/CardsSkelton";
import LoadingError from "../LoadingError";

interface Column {
  field: string;
  header: string;
}

interface CardData {
  title: string;
  num: number;
}

interface TableWrapperProps {
  isLoading?: boolean;
  // eslint-disable-next-line
  error: any;
  data: {
    // eslint-disable-next-line
    results: any[];
    count: number;
  };
  columns: Column[];
  cardData: CardData[];
  emptyMessage: string;
  editRoute?: string;
  viewRoute?: string;
  buttonText?: string;
  headerTitle?: string;
  headerIcon?: string;
  ButtonEvent: () => void;
  onPageChange: (page: number) => void;
  permissions: {
    canView: boolean;
    canAdd: boolean;
    canUpdate: boolean;
  };
}

export default function TableWrapper({
  isLoading,
  error,
  data,
  columns,
  cardData,
  emptyMessage,
  editRoute,
  viewRoute,
  buttonText,
  headerTitle,
  headerIcon,
  ButtonEvent,
  onPageChange,
  permissions,
}: TableWrapperProps) {
  return !permissions.canView ? (
    <div className="flex items-center flex-col">
      <Image
        alt="not authorized"
        src="/assets/icons/403.svg"
        width="400"
        height="400"
      />
    </div>
  ) : isLoading ? (
    <>
      <CardsSkelton />
      <TableSkelton />
    </>
  ) : error ? (
    <LoadingError />
  ) : (
    <CustomTable
      emptyMessage={emptyMessage}
      editRoute={permissions.canUpdate ? editRoute : undefined}
      viewRoute={viewRoute}
      data={Array.isArray(data) ? data : data.results}
      rows={10}
      columns={columns}
      cardData={cardData}
      buttonText={permissions.canAdd ? buttonText : undefined}
      ButtonEvent={ButtonEvent}
      onPageChange={onPageChange}
      totalRecords={data.count}
      headerTitle={headerTitle}
      headerIcon={headerIcon}
      headerBG="#F8F7F7"
      headerTextColor="#C8AE50"
    />
  );
}
