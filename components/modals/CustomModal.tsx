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
  className?: string;
}

function CustomModal({
  isOpen,
  onChange,
  title,
  description,
  children,
  className,
}: CustomModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent
        className={`custom-modal w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] ${className}`}
      >
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
