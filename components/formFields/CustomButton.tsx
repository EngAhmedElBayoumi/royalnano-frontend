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
}

const CustomButton: React.FC<CustomButtonProps> = ({
  className,
  variant = "default",
  text,
  type = "submit",
  onClick
}) => {
  return (
    <Button
      variant={variant}
      type={type}
      onClick={onClick}
      className={`h-fit rounded-lg ${className}`}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
