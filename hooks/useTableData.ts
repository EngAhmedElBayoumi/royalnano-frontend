import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface UseTableDataParams {
  permissionKey: string;
  // eslint-disable-next-line
  useQueryHook: any;
  pageSize?: number;
}

export const useTableData = ({
  permissionKey,
  useQueryHook,
  pageSize = 10,
}: UseTableDataParams) => {
  const [page, setPage] = useState(1);

  const permissions = useSelector(
    (state: RootState) => state.profile.permissions
  );

  const canView = permissions[permissionKey]?.view || false;
  const canAdd = permissions[permissionKey]?.add || false;
  const canUpdate = permissions[permissionKey]?.change || false;

  const { data, isLoading, error, refetch } = useQueryHook({
    search: "",
    ordering: "id",
    page,
    page_size: pageSize,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    page,
    data: data || { results: [], count: 0 },
    isLoading,
    error,
    permissions: {
      canView,
      canAdd,
      canUpdate,
    },
    handlePageChange,
  };
};
