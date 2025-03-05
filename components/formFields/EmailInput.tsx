import React from "react";
import { Input } from "@/components/ui/input";
import { FieldError, UseFormRegister } from "react-hook-form";

interface EmailInputProps {
  register: UseFormRegister<{ email: string }>;
  errors: { email?: FieldError };
  className?: string;
  label?: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
  register,
  errors,
  className,
  label,
}) => {
  return (
    <div className={className}>
      {/* {label && <label>{label}</label>} */}
      <Input
        type="email"
        placeholder={label}
        className="px-3 py-2 h-fit border border-primary rounded-lg bg-white xl:text-sm"
        {...register("email")}
      />
      {errors.email && (
        <span className="text-red-500">{errors.email.message}</span>
      )}
    </div>
  );
};

export default EmailInput;