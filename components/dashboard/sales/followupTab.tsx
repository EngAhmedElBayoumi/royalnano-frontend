import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddFollowUpModal from "@/components/dashboard/sales/AddFollowUpModal";

interface FollowupsTabProps {
  customerId: number;
}

export default function FollowupsTab({ customerId }: FollowupsTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="px-6 pb-[10px]">
      <div className="flex flex-row justify-between items-center">
        <h1>Followups</h1>
        <Button
          size="sm"
          className="gap-1"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add Followup
        </Button>
      </div>
      <div className="flex items-center justify-center h-60">
        <p className="text-muted-foreground">No followups recorded yet</p>
      </div>
      <AddFollowUpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customerId={customerId}
      />
    </div>
  );
}
