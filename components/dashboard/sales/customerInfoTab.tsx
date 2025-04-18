import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CustomerInfoTabProps {
  customerData: any;
}

export default function CustomerInfoTab({
  customerData,
}: CustomerInfoTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic Info */}
          <div className="space-y-2">
            <h3 className="font-medium">Basic Information</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-muted-foreground">Customer Name</p>
                <p>{customerData.customer_name}</p>
              </div>
              {/* Add all other fields similarly */}
            </div>
          </div>

          {/* Other sections... */}
        </div>
      </CardContent>
    </Card>
  );
}
