import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddFollowUpModal from "@/components/dashboard/sales/AddFollowUpModal";
import { useTranslations } from "next-intl";

interface FollowupsTabProps {
  customerId: number;
}

export default function FollowupsTab({ customerId }: FollowupsTabProps) {
  const t = useTranslations("follow_up");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="px-6 pb-[10px]">
      <div className="flex flex-row justify-between items-center">
        <h1>{t("followups")}</h1>
        <Button
          size="sm"
          className="gap-1"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4" />
          {t("add_follow_up")}
        </Button>
      </div>
      <div className="flex items-center justify-center h-60">
        <p className="text-muted-foreground">{t("no_followups")}</p>
      </div>
      <AddFollowUpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customerId={customerId}
      />
    </div>
  );
}
