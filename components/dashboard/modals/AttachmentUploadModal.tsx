"use client";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Upload } from "lucide-react";
import { toast } from "sonner";

interface AttachmentItem {
  file: File | null;
  name: string;
  description: string;
}

interface AttachmentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[], names: string[], descriptions: string[]) => Promise<void>;
  isLoading: boolean;
}

export default function AttachmentUploadModal({
  isOpen,
  onClose,
  onUpload,
  isLoading,
}: AttachmentUploadModalProps) {
  const [attachments, setAttachments] = useState<AttachmentItem[]>([
    { file: null, name: "", description: "" },
  ]);

  const addAttachment = useCallback(() => {
    setAttachments((prev) => [...prev, { file: null, name: "", description: "" }]);
  }, []);

  const removeAttachment = useCallback((index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateAttachment = useCallback(
    (index: number, field: keyof AttachmentItem, value: any) => {
      setAttachments((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [field]: value };
        return updated;
      });
    },
    [setAttachments],
  );

  const handleFileChange = useCallback(
    (index: number, file: File | null) => {
      setAttachments((prevAttachments) => {
        const updated = [...prevAttachments];
        updated[index] = { ...updated[index], file: file };
        if (file && !updated[index].name) {
          updated[index].name = file.name.split(".")[0];
        }
        return updated;
      });
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    const filesToUpload: File[] = [];
    const namesToUpload: string[] = [];
    const descriptionsToUpload: string[] = [];

    let hasError = false;
    attachments.forEach((attachment, index) => {
      if (!attachment.file) {
        toast.error(`Attachment ${index + 1}: Please select a file.`);
        hasError = true;
      }
      if (!attachment.name.trim()) {
        toast.error(`Attachment ${index + 1}: Please enter a name.`);
        hasError = true;
      }
      if (attachment.file && attachment.name.trim()) {
        filesToUpload.push(attachment.file);
        namesToUpload.push(attachment.name.trim());
        descriptionsToUpload.push(attachment.description.trim());
      }
    });

    if (hasError) {
      return;
    }

    if (filesToUpload.length === 0) {
      toast.info("No valid attachments to upload.");
      return;
    }

    try {
      await onUpload(filesToUpload, namesToUpload, descriptionsToUpload);
      toast.success("Attachments uploaded successfully!");
      handleClose();
    } catch (error) {
      console.error("Modal: handleSubmit - upload failed:", error);
      toast.error("Failed to upload attachments.");
    }
  }, [attachments, onUpload, onClose]);

  const handleClose = useCallback(() => {
    setAttachments([{ file: null, name: "", description: "" }]);
    onClose();
  }, [onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Attachments</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {attachments.map((attachment, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Attachment {index + 1}</h4>
                {attachments.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAttachment(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor={`file-${index}`}>File *</Label>
                  <Input
                    id={`file-${index}`}
                    type="file"
                    onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor={`name-${index}`}>Name *</Label>
                  <Input
                    id={`name-${index}`}
                    value={attachment.name}
                    onChange={(e) => updateAttachment(index, "name", e.target.value)}
                    placeholder="Enter attachment name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Textarea
                    id={`description-${index}`}
                    value={attachment.description}
                    onChange={(e) => updateAttachment(index, "description", e.target.value)}
                    placeholder="Enter description (optional)"
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addAttachment}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Attachment
          </Button>
        </div>

        <DialogFooter>
          <Button onClick={handleClose} disabled={isLoading} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              "Uploading..."
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


