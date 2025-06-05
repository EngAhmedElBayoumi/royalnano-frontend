"use client";
import { useTranslations } from "next-intl";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import Image from "next/image";

interface ExtraFieldsProps {
  extraFields: { key: string; value: string }[];
  onAddField: () => void;
  onRemoveField: (index: number) => void;
  onFieldChange: (
    index: number,
    type: "key" | "value",
    newValue: string
  ) => void;
}

const ExtraFields = ({
  extraFields,
  onAddField,
  onRemoveField,
  onFieldChange,
}: ExtraFieldsProps) => {
  const globalTranslate = useTranslations();

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">
          {globalTranslate("extraFields")}
        </h3>
        <CustomButton
          variant="outline"
          type="button"
          onClick={onAddField}
          text={globalTranslate("addField")}
          className="text-white rounded-lg bg-primary px-4 py-2"
        />
      </div>

      {extraFields.map((field, index) => (
        <div
          key={index}
          className="grid grid-cols-2 gap-4 my-10 items-start relative"
        >
          <TextInput
            value={field.key}
            onChange={(e) => onFieldChange(index, "key", e.target.value)}
            placeholder={globalTranslate("fieldName")}
            className="w-full"
          />
          <TextInput
            value={field.value}
            onChange={(e) => onFieldChange(index, "value", e.target.value)}
            placeholder={globalTranslate("fieldValue")}
            className="w-full"
          />
          <button
            type="button"
            onClick={() => onRemoveField(index)}
            className="absolute -top-7 right-1 bg-red-500 rounded-full p-2"
          >
            <Image
              src="/assets/icons/dashboard/close.svg"
              alt="remove"
              width="10"
              height="10"
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExtraFields;
