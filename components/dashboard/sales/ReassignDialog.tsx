"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetEmployeesQuery } from "@/redux/services/dashboard/hr/employeeApi";
import { useReassignCustomersMutation } from "@/redux/services/dashboard/sales/salesCustomerApi";

interface ReassignDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCustomerIds: number[];
  onSuccess?: () => void;
}

interface Employee {
  id: number;
  name: string;
  job_title?: {
    name?: string;
  };
}

const ReassignDialog: React.FC<ReassignDialogProps> = ({
  isOpen,
  onClose,
  selectedCustomerIds,
  onSuccess,
}) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch employees
  const {
    data: employeesData,
    isLoading: isLoadingEmployees,
    error: employeesError,
  } = useGetEmployeesQuery({
    search: "",
    ordering: "id",
    page: 1,
    page_size: 100,
  });

  // Reassign mutation
  const [reassignCustomers] = useReassignCustomersMutation();

  const handleSubmit = async () => {
    if (!selectedEmployeeId || selectedCustomerIds.length === 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      await reassignCustomers({
        customer_ids: selectedCustomerIds,
        employee_id: parseInt(selectedEmployeeId),
      }).unwrap();

      // Success
      onSuccess?.();
      onClose();
      setSelectedEmployeeId("");
    } catch (error) {
      console.error("Error reassigning customers:", error);
      // Handle error (you might want to show a toast notification)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setSelectedEmployeeId("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-right">
            إعادة تعيين العملاء ({selectedCustomerIds.length})
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="employee" className="text-right font-medium">
              اختر الموظف:
            </label>
            
            {isLoadingEmployees ? (
              <div className="text-center py-2">جاري تحميل الموظفين...</div>
            ) : employeesError ? (
              <div className="text-center py-2 text-red-500">
                خطأ في تحميل الموظفين
              </div>
            ) : (
              <Select value={selectedEmployeeId} onValueChange={setSelectedEmployeeId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر موظف..." />
                </SelectTrigger>
                <SelectContent>
                  {(employeesData?.results as Employee[])?.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id.toString()}>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{employee.name}</span>
                        <span className="text-sm text-gray-500">
                          {employee.job_title?.name || "غير محدد"}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            إلغاء
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedEmployeeId || isSubmitting || selectedCustomerIds.length === 0}
            className="bg-primary text-white"
          >
            {isSubmitting ? "جاري إعادة التعيين..." : "إعادة التعيين"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReassignDialog;

