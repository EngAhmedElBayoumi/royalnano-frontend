import React, { useRef } from "react";
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
import type { Swiper as SwiperType } from "swiper";

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
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] h-[100vh] bg-[transparent] border-none">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>
              {item.type === "image" ? "Image Gallery" : "Video"}
            </DialogTitle>
          </VisuallyHidden>
        </DialogHeader>
        {item.type === "image" ? (
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
              <div className="swiper-button-prev" />
              <div className="swiper-button-next" />
            </Swiper>
            <div className="flex justify-center mt-4">
              {item.images.map((image, index) => (
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
            <source src={item.videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GalleryItemModal;
