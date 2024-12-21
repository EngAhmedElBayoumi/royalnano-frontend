import React from "react";
import { Input } from "@/components/ui/input";
import { FieldError, UseFormRegister } from "react-hook-form";
import "./EmailInput.css";

interface EmailInputProps {
  register: UseFormRegister<{ email: string }>;
  errors: { email?: FieldError };
  className?: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
  register,
  errors,
  className,
}) => {
  return (
    <div className={className}>
      <Input
        type="email"
        placeholder="Enter your email address"
        className="px-3 py-2 h-fit border border-primary rounded-lg bg-white"
        {...register("email")}
      />
      {errors.email && (
        <span className="text-red-500">{errors.email.message}</span>
      )}
    </div>
  );
};

export default EmailInput;
