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
      <DropdownMenuContent
        className="bg-dashboardBg shadow-md rounded-lg px-4"
        align="start"
        sideOffset={5}
      >
        {showView && onView && (
          <DropdownMenuItem
            className="py-1 cursor-pointer capitalize flex items-center gap-2"
            onClick={(e) => onView(id, e)}
          >
            <Image
              src="/assets/icons/eye.svg"
              alt="view"
              width={18}
              height={18}
              className="saturate-0 hover:saturate-100 transition"
            />
            {t("view")}
          </DropdownMenuItem>
        )}
        {showEdit && onEdit && (
          <DropdownMenuItem
            className="py-1 cursor-pointer capitalize flex items-center gap-2"
            onClick={(e) => onEdit(id, e)}
          >
            {t("edit")}
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={18}
              height={18}
              className="saturate-0 hover:saturate-100 transition"
            />
          </DropdownMenuItem>
        )}
        {isClientRequest && status === "pending" && onSetInitialPrice && (
          <DropdownMenuItem
            className="py-1 cursor-pointer capitalize"
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
