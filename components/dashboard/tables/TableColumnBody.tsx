/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { ColumnConfig } from "./types";

export const renderColumnBody = ({
  col,
  rowData,
  expandedRows,
  toggleExpand,
}: {
  col: ColumnConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowData: any;
  expandedRows: Record<number, boolean>;
  toggleExpand: (id: number) => void;
}) => {
  const fieldValue = rowData[col.field];

  if (col.field === "gallery_images" && Array.isArray(fieldValue)) {
    return (
      <img
        src={fieldValue?.[0]?.image}
        alt={`${col.header} image`}
        width={50}
        height={50}
        className="rounded-md object-cover"
      />
    );
  }

  if (Array.isArray(fieldValue)) {
    const isExpanded = expandedRows[rowData.id] || false;
    const itemsToShow = isExpanded ? fieldValue : fieldValue.slice(0, 3);

    return (
      <div>
        {itemsToShow.map((item, index) => (
          <div key={index}>
            {item.item_name || item.name || JSON.stringify(item)}
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

  if (col.field === "image" && fieldValue) {
    return (
      <img
        src={fieldValue}
        alt={`${col.header} image`}
        width={50}
        height={50}
        className="rounded-md object-cover"
      />
    );
  }

  if (col.field === "video" && fieldValue) {
    return (
      <video
        controls
        className="rounded-md object-cover"
        width="200"
        height="200"
      >
        <source src={fieldValue} />
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
      />
    );
  }

  if (col.field === "email") {
    return <a href={`mailto:${rowData[col.field]}`}>{rowData[col.field]}</a>;
  }

  return rowData[col.field];
};
