import Image from "next/image";

const MyMapComponent = () => {
  return (
    <Image
      width={100}
      height={643}
      src="/assets/images/map.png"
      alt="map"
      // width={"100%"}
      className="  h-[643px] w-[100%] z-0 rounded-lg border border-primary"
    />
  );
};

export default MyMapComponent;
