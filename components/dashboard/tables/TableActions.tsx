"use client";
import React from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

interface TableActionsProps {
  id: number;
  status?: string;
  onView?: (id: number, e: React.MouseEvent) => void;
  onEdit?: (id: number, e: React.MouseEvent) => void;
  onSetInitialPrice?: (id: number) => void;
  t: (key: string) => string;
  showView?: boolean;
  showEdit?: boolean;
  isClientRequest?: boolean;
}

const TableActions = ({
  id,
  status,
  onView,
  onEdit,
  onSetInitialPrice,
  t,
  showView,
  showEdit,
  isClientRequest,
}: TableActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-gray-500">
          <Image
            width={30}
            height={30}
            alt="actions"
            src="/assets/icons/menuIcon.svg"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        {showView && onView && (
          <DropdownMenuItem
            className="bg-dashboardBg shadow-md py-1 cursor-pointer capitalize"
            onClick={(e) => onView(id, e)}
          >
            {t("view")}
          </DropdownMenuItem>
        )}
        {showEdit && onEdit && (
          <DropdownMenuItem
            className="bg-dashboardBg shadow-md py-1 cursor-pointer capitalize"
            onClick={(e) => onEdit(id, e)}
          >
            {t("edit")}
          </DropdownMenuItem>
        )}
        {isClientRequest && status === "pending" && onSetInitialPrice && (
          <DropdownMenuItem
            className="bg-dashboardBg shadow-md py-1 cursor-pointer capitalize"
            onClick={() => onSetInitialPrice(id)}
          >
            Set Initial Price
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableActions;
