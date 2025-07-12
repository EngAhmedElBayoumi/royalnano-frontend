"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import {
  useGetEmployeeByIdQuery,
  useUploadEmployeeAttachmentsMutation,
} from "@/redux/services/dashboard/hr/employeeApi";
import {
  useGetEmployeeAttachmentsQuery,
  useDeleteEmployeeAttachmentMutation,
} from "@/redux/services/dashboard/hr/employeeAttachmentApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Edit, ArrowLeft, Plus, Download, ExternalLink, Trash2 } from "lucide-react";
import AttachmentUploadModal from "@/components/dashboard/modals/AttachmentUploadModal";
import { handleApiError } from "@/lib/utils/handleApiError";

export default function ViewEmployee() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const t = useTranslations("hr.employees");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const { data: employee, isLoading, error } = useGetEmployeeByIdQuery(id);
  const { data: attachments, isLoading: attachmentsLoading, refetch: refetchAttachments } = 
    useGetEmployeeAttachmentsQuery(id, { skip: !id });
  const [uploadAttachments, { isLoading: uploading }] = useUploadEmployeeAttachmentsMutation();
  const [deleteAttachment] = useDeleteEmployeeAttachmentMutation();

  // Debug logging
  useEffect(() => {
    console.log("🔍 DEBUG - Employee ID:", id);
    console.log("🔍 DEBUG - Attachments loading:", attachmentsLoading);
    console.log("🔍 DEBUG - Attachments data:", attachments);
    console.log("🔍 DEBUG - Attachments results:", attachments?.results);
    console.log("🔍 DEBUG - Attachments length:", attachments?.results?.length);
  }, [id, attachments, attachmentsLoading]);

  const handleEdit = () => {
    router.push(`/dashboard/hr/employees/edit?id=${id}`);
  };

  const handleBack = () => {
    router.push("/dashboard/hr?tab=employees");
  };

  const handleUploadAttachments = async (files: File[], names: string[], descriptions: string[]) => {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));
      names.forEach((name) => formData.append('names', name));
      descriptions.forEach((description) => formData.append('descriptions', description));

      console.log("🔍 DEBUG - Upload attempt with:", { files, names, descriptions });

      const response = await uploadAttachments({ id, formData });
      console.log("🔍 DEBUG - Upload response:", response);
      
      if (response.error) {
        handleApiError(response.error);
      } else {
        toast.success("Attachments uploaded successfully");
        refetchAttachments();
        setIsUploadModalOpen(false);
      }
    } catch (error) {
      console.log("🔍 DEBUG - Upload error:", error);
      toast.error("Failed to upload attachments");
    }
  };

  const handleDownload = (attachment: any) => {
    const link = document.createElement('a');
    link.href = `${process.env.NEXT_PUBLIC_BASE_URL}hr/employee-attachments/${attachment.id}/download/`;
    link.download = attachment.file_name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = (attachment: any) => {
    window.open(attachment.file_url, '_blank');
  };

  const handleDeleteAttachment = async (attachmentId: number) => {
    try {
      const response = await deleteAttachment(attachmentId);
      if (response.error) {
        handleApiError(response.error);
      } else {
        toast.success("Attachment deleted successfully");
        refetchAttachments();
      }
    } catch (error) {
      toast.error("Failed to delete attachment");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Error loading employee data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginTop: '60px' }}>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">{employee?.name}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button onClick={() => setIsUploadModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Attachment
          </Button>
        </div>
      </div>

      {/* Employee Details */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Name</label>
              <p className="text-sm">{employee?.name}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-sm">{employee?.email_address}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Phone</label>
              <p className="text-sm">{employee?.phone}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Address</label>
              <p className="text-sm">{employee?.address}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Salary</label>
              <p className="text-sm">{employee?.salary}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Branch</label>
              <p className="text-sm">{employee?.branch?.name}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Department</label>
              <p className="text-sm">{employee?.department?.name || "N/A"}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Job Title</label>
              <p className="text-sm">{employee?.job_title?.name || "N/A"}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Leader</label>
              <p className="text-sm">{employee?.leader?.name || "N/A"}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Is User</label>
              <Badge variant={employee?.is_user ? "default" : "secondary"}>
                {employee?.is_user ? "Yes" : "No"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Attachments Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Attachments</CardTitle>
            <Button size="sm" onClick={() => setIsUploadModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Attachment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-4 bg-yellow-100 border border-yellow-300 rounded">
            <h4 className="font-bold">DEBUG INFO:</h4>
            <p>Loading: {attachmentsLoading ? 'true' : 'false'}</p>
            <p>Data: {JSON.stringify(attachments)}</p>
            <p>Results: {JSON.stringify(attachments?.results)}</p>
            <p>Length: {attachments?.results?.length}</p>
          </div>
          
          {attachmentsLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : attachments?.results?.length > 0 ? (
            <div className="space-y-4">
              {attachments.results.map((attachment: any) => (
                <div
                  key={attachment.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{attachment.name}</h4>
                    {attachment.description && (
                      <p className="text-sm text-gray-500 mt-1">{attachment.description}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      Uploaded: {new Date(attachment.uploaded_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload(attachment)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenInNewTab(attachment)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteAttachment(attachment.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No attachments found</p>
          )}
        </CardContent>
      </Card>

      {/* Upload Modal */}
      <AttachmentUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUploadAttachments}
        isLoading={uploading}
      />
    </div>
  );
}

