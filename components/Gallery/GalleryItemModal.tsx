import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Navigation } from "swiper/modules";

interface GalleryItem {
  type: string;
  images: string[];
  videoSrc: string;
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
      <DialogContent className="sm:max-w-[800px] h-[80vh] bg-[transparent] border-none">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>
              {item.type === "image" ? "Image Gallery" : "Video"}
            </DialogTitle>
          </VisuallyHidden>
        </DialogHeader>
        {item.type === "image" ? (
          <Swiper
            className="w-full h-full"
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Navigation]}
          >
            {item.images.map((image, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center w-full h-full"
              >
                <Image
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover rounded-lg"
                />
              </SwiperSlide>
            ))}
            <div className="swiper-button-prev border-primary" />
            <div className="swiper-button-next border-primary" />
          </Swiper>
        ) : (
          <video controls className="w-full h-full">
            <source src={item.videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GalleryItemModal;
