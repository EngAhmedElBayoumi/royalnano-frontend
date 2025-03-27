import React, { MouseEventHandler } from "react";
import { Button } from "@/components/ui/button";

interface CustomButtonProps {
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  className,
  variant = "default",
  text,
  type = "submit",
  onClick,
  isDisabled = false,
}) => {
  return (
    <Button
      variant={variant}
      type={type}
      onClick={onClick}
      className={`h-fit ${
        variant === "default"
          ? "text-white rounded-lg min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          : variant === "secondary"
          ? "text-white rounded-lg bg-secondary min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          : ""
      } ${className}`}
      disabled={isDisabled}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
