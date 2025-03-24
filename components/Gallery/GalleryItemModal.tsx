import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface GalleryItem {
  id: number;
  title: string;
  item_type: 'image' | 'video';
  image: string | null;
  video: string | null;
  created_at: string;
}

interface GalleryItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: GalleryItem;
}

const GalleryItemModal: React.FC<GalleryItemModalProps> = ({
  isOpen,
  onClose,
  item,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] h-[90vh] bg-[transparent] border-none">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>
              {item.item_type === "image" ? "Image Gallery" : "Video"}
            </DialogTitle>
          </VisuallyHidden>
        </DialogHeader>
        {item.item_type === "image" ? (
          <div className="flex justify-center w-full h-full">
            <Image
              src={item.image || ''}
              alt={item.title}
              width={400}
              height={400}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ) : (
          <video controls className="w-full h-full">
            <source src={item.video || ''} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GalleryItemModal;
