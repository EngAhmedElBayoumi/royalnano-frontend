import { useTranslations } from "next-intl";
import Image from "next/image";

const LoadingError = () => {
  const t = useTranslations();
  return (
    <div className="flex justify-center flex-col items-center pb-10">
      <Image
        src="/assets/icons/dashboard/loading-error.svg"
        alt="loading error"
        width="400"
        height="300"
      />
      {t("loadingError")}
    </div>
  );
};

export default LoadingError;
