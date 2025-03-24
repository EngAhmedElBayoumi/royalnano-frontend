"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetGalleryQuery } from "@/redux/services/galleryApi";
import GalleryItemModal from "./GalleryItemModal";
import { useTranslations } from "next-intl";
import { Paginator } from "primereact/paginator";
import LoadingError from "@/components/dashboard/LoadingError";
import GallerySkeleton from "./GallerySkeleton";

interface GalleryItem {
  id: number;
  title: string;
  item_type: 'image' | 'video';
  image: string | null;
  video: string | null;
  created_at: string;
}

const Gallery = () => {
  const t = useTranslations("website.gallery");
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetGalleryQuery({
    search: "",
    ordering: "id",
    page,
    page_size: 12
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const handleOpenModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  if (isLoading) {
    return (
      <section className="py-10">
        <h2 className="text-center text-md xl:text-lg font-[600] mb-6 text-primary">
          {t('title')}
        </h2>
        <GallerySkeleton />
      </section>
    );
  }

  if (error) {
    return <LoadingError />;
  }

  const galleryItems = Array.isArray(data) ? data : [];
  const totalRecords = galleryItems.length;

  const filteredItems = activeTab === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.item_type === activeTab);

  return (
    <section className="py-10">
      <h2 className="text-center text-md xl:text-lg font-[600] mb-6 text-primary">
        {t('title')}
      </h2>
      <Tabs 
        defaultValue="all" 
        className="w-full"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="text-center w-full bg-transparent mb-5">
          <TabsTrigger value="all" className="mx-2 text-md xl:text-lg font-[600]">
            {t('tabs.all')}
          </TabsTrigger>
          <TabsTrigger value="image" className="mx-2 text-md xl:text-lg font-[600]">
            {t('tabs.images')}
          </TabsTrigger>
          <TabsTrigger value="video" className="mx-2 text-md xl:text-lg font-[600]">
            {t('tabs.videos')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <section className="flex justify-center flex-col items-center">
            <main className="main-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
                    onClick={() => handleOpenModal(item)}
                  >
                    {item.item_type === 'video' ? (
                      <video
                        src={item.video || ''}
                        className="w-full h-auto"
                        controls={false}
                      />
                    ) : (
                      <Image
                        width={305}
                        height={310}
                        src={item.image || ''}
                        alt={item.title}
                        className="w-full h-auto"
                      />
                    )}
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center">{t('noData')}</p>
              )}
            </main>
            {totalRecords > 12 && (
              <div className="mt-6">
                <Paginator
                  first={(page - 1) * 12}
                  rows={12}
                  totalRecords={totalRecords}
                  onPageChange={(e) => setPage(e.page + 1)}
                />
              </div>
            )}
          </section>
        </TabsContent>
      </Tabs>

      {selectedItem && (
        <GalleryItemModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          item={selectedItem}
        />
      )}
    </section>
  );
};

export default Gallery;
