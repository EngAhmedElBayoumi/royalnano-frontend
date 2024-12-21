import React from "react";
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
}

const CustomButton: React.FC<CustomButtonProps> = ({
  className,
  variant = "default",
  text,
  type = "submit",
}) => {
  return (
    <Button
      variant={variant}
      type={type}
      className={`h-fit ${className} rounded-lg `}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
