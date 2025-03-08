import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";

interface ExtraField {
  key: string;
  value: string;
}

interface UseExtraFieldsProps {
  defaultFields?: Record<string, string>;
  // eslint-disable-next-line
  setValue: UseFormSetValue<any>;
}

const useExtraFields = ({ defaultFields, setValue }: UseExtraFieldsProps) => {
  const [extraFields, setExtraFields] = useState<ExtraField[]>(
    defaultFields
      ? Object.entries(defaultFields).map(([key, value]) => ({
          key,
          value: String(value),
        }))
      : []
  );

  const handleAddExtraField = () => {
    setExtraFields([...extraFields, { key: "", value: "" }]);
  };

  const handleRemoveExtraField = (index: number) => {
    const newFields = extraFields.filter((_, i) => i !== index);
    setExtraFields(newFields);
    updateFormExtraFields(newFields);
  };

  const handleExtraFieldChange = (
    index: number,
    type: "key" | "value",
    newValue: string
  ) => {
    const newFields = extraFields.map((field, i) => {
      if (i === index) {
        return { ...field, [type]: newValue };
      }
      return field;
    });
    setExtraFields(newFields);
    updateFormExtraFields(newFields);
  };

  const updateFormExtraFields = (fields: ExtraField[]) => {
    const extraFieldsObject = fields.reduce((acc, field) => {
      if (field.key) acc[field.key] = field.value;
      return acc;
    }, {} as Record<string, string>);
    setValue("extra_fields", extraFieldsObject);
  };

  return {
    extraFields,
    handleAddExtraField,
    handleRemoveExtraField,
    handleExtraFieldChange,
  };
};

export default useExtraFields;
