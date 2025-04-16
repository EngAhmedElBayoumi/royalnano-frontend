import Image from "next/image";

function NoData({ message }: { message: string }) {
  return (
    <div className="flex justify-center flex-col items-center pb-10">
      <Image
        height={100}
        width={400}
        alt="img"
        src="/assets/icons/no-data.svg"
      />
      <p className="text-[30px] text-[#7F7F7F] font-[500]">{message}</p>
    </div>
  );
}

export default NoData;
