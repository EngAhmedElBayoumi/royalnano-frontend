import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface FollowupsTabProps {
  customerId: number;
}

export default function FollowupsTab({ customerId }: FollowupsTabProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Followups</CardTitle>
        <Button size="sm" className="gap-1">
          <Plus className="h-4 w-4" />
          Add Followup
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-60">
          <p className="text-muted-foreground">No followups recorded yet</p>
        </div>
      </CardContent>
    </Card>
  );
}
