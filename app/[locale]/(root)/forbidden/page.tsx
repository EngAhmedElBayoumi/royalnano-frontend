import CustomButton from "@/components/formFields/CustomButton";
import Image from "next/image";
import Link from "next/link";

export default function Forbidden() {
  return (
    <div className="flex items-center flex-col mb-10">
      <Image
        alt="not authorized"
        src="/assets/icons/403.svg"
        width="400"
        height="400"
      />
      <Link href="/">
        <CustomButton
          text="Return Home"
          className="text-white rounded-lg bg-secondary min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
        />
      </Link>
    </div>
  );
}
