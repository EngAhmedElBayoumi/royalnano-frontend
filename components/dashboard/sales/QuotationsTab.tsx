import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useGetSalesQuotationQuery } from "@/redux/services/dashboard/sales/salesQuotationApi";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import QuotationListItem from "./quotatioListItem";
import { useGetSalesQuotationQuery } from "@/redux/services/dashboard/sales/salesQuotationsApi";
// import QuotationListItem from "./QuotationListItem";

interface QuotationsTabProps {
  customerId: number;
}

export default function QuotationsTab({ customerId }: QuotationsTabProps) {
  const { data, isLoading, error } = useGetSalesQuotationQuery({
    customer: customerId,
    page: 1,
    page_size: 10,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Quotations</CardTitle>
        <Button size="sm" className="gap-1">
          <Plus className="h-4 w-4" />
          New Quotation
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading quotations...</p>
        ) : error ? (
          <p>Error loading quotations</p>
        ) : data?.results?.length ? (
          <div className="space-y-2">
            {data.results.map((quotation) => (
              <QuotationListItem key={quotation.id} quotation={quotation} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-60">
            <p className="text-muted-foreground">No quotations found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
