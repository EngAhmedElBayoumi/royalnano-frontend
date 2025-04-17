import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

interface GalleryItem {
  id: number;
  title: string;
  item_type: "image" | "video";
  gallery_images: string[];
  video: string | null;
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] h-[90vh] bg-[transparent] border-none">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>
              {item.item_type === "image" ? "Image Gallery" : "Video"}
            </DialogTitle>
          </DialogHeader>
        </VisuallyHidden>
        {item.item_type === "image" ? (
          <>
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)} // Assign swiper instance
              className="w-full h-full"
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
              modules={[Navigation]}
            >
              {item.gallery_images.map((image, index) => (
                <SwiperSlide
                  key={index}
                  className="flex justify-center w-full h-full"
                >
                  <Image
                    src={image}
                    alt={item.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
              <div className="swiper-button-prev" />
              <div className="swiper-button-next" />
            </Swiper>
            <div className="flex justify-center mt-4">
              {item.gallery_images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className={`cursor-pointer rounded-lg mx-1 ${
                    selectedIndex === index ? "border-2 border-primary" : ""
                  }`}
                  onClick={() => {
                    setSelectedIndex(index);
                    swiperRef.current?.slideTo(index); // Use the swiper instance to slide
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <video controls className="w-full h-full">
            <source src={item.video || ""} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GalleryItemModal;
