import { useState } from "react";
import { Service } from "./types";

const useActiveService = (initialService: Service | null) => {
  const [activeService, setActiveService] = useState<Service | null>(
    initialService
  );

  const handleMouseEnter = (service: Service) => {
    setActiveService(service);
  };

  return { activeService, setActiveService, handleMouseEnter };
};

export default useActiveService;
