"use client";
import { useTranslations } from "next-intl";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";

interface ExtraFieldsProps {
  extraFields: { key: string; value: string }[];
  onAddField: () => void;
  onRemoveField: (index: number) => void;
  onFieldChange: (index: number, type: "key" | "value", newValue: string) => void;
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
          type="button"
          onClick={onAddField}
          text={globalTranslate("addField")}
          className="text-white rounded-lg bg-primary px-4 py-2"
        />
      </div>

      {extraFields.map((field, index) => (
        <div
          key={index}
          className="grid grid-cols-2 gap-4 mb-4 items-start"
        >
          <TextInput
            value={field.key}
            onChange={(e) =>
              onFieldChange(index, "key", e.target.value)
            }
            placeholder={globalTranslate("fieldName")}
            className="w-full"
          />
          <div className="flex gap-2">
            <TextInput
              value={field.value}
              onChange={(e) =>
                onFieldChange(index, "value", e.target.value)
              }
              placeholder={globalTranslate("fieldValue")}
              className="w-full"
            />
            <button
              type="button"
              onClick={() => onRemoveField(index)}
              className="p-2 text-red-500 hover:text-red-700"
            >
              {globalTranslate("removeField")}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExtraFields;