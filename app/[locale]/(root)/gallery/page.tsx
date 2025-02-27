import Gallery from "@/components/Gallery/Gallery";
import Hero from "@/components/Hero";

export const metadata = {
  title: "Gallery | Royal Nano",
  description: "Learn more Gallery our Royal Nano and team.",
};
export default function GalleryPage() {
  return (
    <>
      <Hero />
      <div className="relative top-[-130px]">
        <Gallery />
      </div>
    </>
  );
}
