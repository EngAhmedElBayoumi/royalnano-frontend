"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetGalleryQuery } from "@/redux/services/galleryApi";
// import GalleryItemModal from "./GalleryItemModal";

const Gallery = () => {
  const { data, isLoading, error } = useGetGalleryQuery();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  const images = [
    "/assets/images/gallery/gallryTop1.png",
    "/assets/images/gallery/gallryTop2.png",
    "/assets/images/gallery/gallryTop5.png",
    "/assets/images/gallery/gallryTop1.png",
    "/assets/images/gallery/gallryTop2.png",
    "/assets/images/gallery/gallryTop5.png",
    "/assets/images/gallery/gallryTop1.png",
    "/assets/images/gallery/gallryTop2.png",
    "/assets/images/gallery/gallryTop5.png",
  ];

  const galleryItems = images.map((src, index) => ({
    type: "image",
    images: [src],
    videoSrc: "",
  }));

  return (
    <section className="py-10">
      <h2 className="text-center text-[30px] font-[600] mb-6 text-primary">
        Latest Shots
      </h2>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="text-center w-full bg-transparent mb-5">
          <TabsTrigger value="all" className="mx-2 text-[30px] font-[600]">
            All
          </TabsTrigger>
          <TabsTrigger value="images" className="mx-2 text-[30px] font-[600]">
            Images
          </TabsTrigger>
          <TabsTrigger value="videos" className="mx-2 text-[30px] font-[600]">
            Videos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <section className="flex justify-center">
            <main className="main-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryItems.map((item, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
                  onClick={() => handleOpenModal(item)}
                >
                  <Image
                    width={305}
                    height={310}
                    src={item.images[0]}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </main>
          </section>
        </TabsContent>
        <TabsContent value="images">
          <section className="flex justify-center">
            <main className="main-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryItems.map((item, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
                  onClick={() => handleOpenModal(item)}
                >
                  <Image
                    width={305}
                    height={310}
                    src={item.images[0]}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </main>
          </section>
        </TabsContent>
        <TabsContent value="videos">
          <p className="text-center">No videos available.</p>
        </TabsContent>
      </Tabs>
      {/* <GalleryItemModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        item={selectedItem}
      /> */}
    </section>
  );
};

export default Gallery;
