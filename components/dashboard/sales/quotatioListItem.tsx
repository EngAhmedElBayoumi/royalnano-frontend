import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eye, FileEdit } from "lucide-react";

interface QuotationListItemProps {
  quotation: any;
}

export default function QuotationListItem({
  quotation,
}: QuotationListItemProps) {
  return (
    <Card className="p-4 hover:bg-accent transition-colors">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">Quotation #{quotation.id}</h3>
          <p className="text-sm text-muted-foreground">
            Created: {formatDate(quotation.created_at)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button variant="outline" size="sm">
            <FileEdit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>
    </Card>
  );
}
