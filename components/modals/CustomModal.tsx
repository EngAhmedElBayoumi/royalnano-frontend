import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CustomModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children?: React.ReactNode;
}

function CustomModal({
  isOpen,
  onChange,
  title,
  description,
  children,
}: CustomModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="custom-modal">
        <DialogHeader>
          <DialogTitle className="text-start">{title}</DialogTitle>
          <DialogDescription className="text-start !mt-0">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default CustomModal;
