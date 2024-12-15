import { useState } from "react";
import { Service } from "./types";

const useActiveService = (initialService: Service) => {
  const [activeService, setActiveService] = useState<Service>(initialService);

  const handleMouseEnter = (service: Service) => {
    setActiveService(service);
  };

  return { activeService, handleMouseEnter };
};

export default useActiveService;
