import React from "react";
import { Service } from "./types";

type ServiceItemProps = {
  service: Service;
  isActive: boolean;
  onMouseEnter: () => void;
};

const ServiceItem: React.FC<ServiceItemProps> = ({
  service,
  isActive,
  onMouseEnter,
}) => (
  <li
    onMouseEnter={onMouseEnter}
    className={`flex justify-between items-center font-[500] text-sm lg:text-md border rounded-2xl px-5 py-2 cursor-pointer ${
      isActive ? "bg-primary text-white" : "border-gray text-gray"
    }`}
  >
    <span>{service.name}</span>
    <span>{service.type}</span>
  </li>
);

export default ServiceItem;
