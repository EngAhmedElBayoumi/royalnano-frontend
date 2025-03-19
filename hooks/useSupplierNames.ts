import { useGetSupplierByIdQuery } from "@/redux/services/dashboard/purchase/supplierApi";
import { useEffect, useState } from "react";
// import { useGetSupplierByIdQuery } from "@/redux/services/dashboard/purchase/supplierApi";

export const useSupplierNames = (supplierIds: number[]) => {
  const [supplierNames, setSupplierNames] = useState<Record<number, string>>({});

  useEffect(() => {
    supplierIds.forEach((id) => {
      const { data: supplier } = useGetSupplierByIdQuery(id);
      if (supplier) {
        setSupplierNames((prev) => ({
          ...prev,
          [id]: supplier.supplier_name,
        }));
      }
    });
  }, [supplierIds]);

  return supplierNames;
};