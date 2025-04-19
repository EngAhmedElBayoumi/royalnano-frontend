import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddFollowUpModal from "@/components/dashboard/sales/AddFollowUpModal";
import EditFollowUpModal from "@/components/dashboard/sales/EditFollowUpModal";
import { useTranslations } from "next-intl";
import { useGetFollowUpQuery } from "@/redux/services/dashboard/sales/followUpApi";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { FollowUp } from "@/types/FollowUp";

interface FollowupsTabProps {
  customerId: number;
}

export default function FollowupsTab({ customerId }: FollowupsTabProps) {
  const t = useTranslations("follow_up");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(
    null
  );
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const { data, isLoading, error, refetch } = useGetFollowUpQuery({
    search: customerId.toString(),
    page: page + 1, // PrimeReact uses 0-based indexing, API uses 1-based
    page_size: pageSize,
    customer: customerId,
  });

  const followUps = data?.results || [];
  const totalRecords = data?.count || 0;

  const handleEdit = (followUp: FollowUp) => {
    setSelectedFollowUp(followUp);
    setIsEditModalOpen(true);
  };

  const actionBodyTemplate = (rowData: FollowUp) => {
    return (
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleEdit(rowData)}
        className="text-primary"
      >
        {t("edit")}
      </Button>
    );
  };

  return (
    <div className="px-6 pb-[10px]">
      <div className="flex flex-row justify-between items-center">
        <h1>{t("followups")}</h1>
        <Button
          size="sm"
          className="gap-1"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="h-4 w-4" />
          {t("add_follow_up")}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-60">
          <p className="text-muted-foreground">{t("loading")}</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-60">
          <p className="text-muted-foreground">{t("error_loading")}</p>
        </div>
      ) : followUps.length === 0 ? (
        <div className="flex items-center justify-center h-60">
          <p className="text-muted-foreground">{t("no_followups")}</p>
        </div>
      ) : (
        <div>
          <DataTable
            value={followUps}
            paginator={false}
            className="mt-4"
            responsiveLayout="scroll"
          >
            <Column
              field="follow_up_type"
              header={t("type")}
              body={(rowData) => t(rowData.follow_up_type)}
            />
            <Column
              field="comment"
              header={t("comment")}
              body={(rowData) => rowData.comment || t("no_comment")}
            />
            <Column
              field="created_at"
              header={t("date")}
              body={(rowData) =>
                new Date(rowData.created_at).toLocaleDateString()
              }
            />
            <Column
              header={t("actions")}
              body={actionBodyTemplate}
              style={{ textAlign: "center", width: "150px" }}
            />
          </DataTable>

          <Paginator
            first={page * pageSize}
            rows={pageSize}
            totalRecords={totalRecords}
            onPageChange={(e) => setPage(e.page)}
            className="mt-4"
          />
        </div>
      )}

      <AddFollowUpModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        customerId={customerId}
        refetch={refetch}
      />
      {selectedFollowUp && (
        <EditFollowUpModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          followUp={selectedFollowUp}
          refetch={refetch}
        />
      )}
    </div>
  );
}
