import Image from "next/image";
import React from "react";

const Gallery = () => {
  const images = [
    "/assets/images/car1.jpg",
    "/assets/images/car2.jpg",
    "/assets/images/car3.jpg",
    "/assets/images/car4.jpg",
    "/assets/images/car5.jpg",
    "/assets/images/car6.jpg",
    "/assets/images/car7.jpg",
    "/assets/images/car8.jpg",
  ];

  return (
    <section className="py-10">
      <h2 className="text-center text-xl font-bold mb-6">Latest Shots</h2>
      <div className="flex justify-center mb-4">
        <button className="mx-2 text-gold">All</button>
        <button className="mx-2">Images</button>
        <button className="mx-2">Videos</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg">
            <Image
              width={305}
              height={310}
              src={src}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
