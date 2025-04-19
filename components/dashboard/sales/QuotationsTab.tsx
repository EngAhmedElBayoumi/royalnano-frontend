import SalesQuotation from "./salesQuotation";

interface QuotationsTabProps {
  customerId: number;
}

export default function QuotationsTab({ customerId }: QuotationsTabProps) {
  return (
    <div className="px-6 pb-[10px]">
      <SalesQuotation customerId={customerId} />
    </div>
  );
}
