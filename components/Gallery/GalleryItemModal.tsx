import React from "react";
import Modal from "@/components/ui/modal"; // Assuming you have a modal component
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles

const GalleryItemModal = ({ isOpen, onClose, item }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {item.type === "image" ? (
        <Swiper spaceBetween={10} slidesPerView={1}>
          {item.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Gallery Image ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <video controls>
          <source src={item.videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </Modal>
  );
};

export default GalleryItemModal;
