// ts-ignore-next-line
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractChangedFields<T extends Record<string, any>>(
  data: T,
  defaultValues: T | undefined
): Partial<T> {
  if (!defaultValues) return data; // If no default values, return all data

  return Object.keys(data).reduce((acc, key) => {
    if (JSON.stringify(data[key]) !== JSON.stringify(defaultValues[key])) {
      // ts-ignore-next-line
      // @ts-expect-error: TypeScript doesn't recognize that key is a valid key of ItemFormValues
      acc[key] = data[key];
    }
    return acc;
  }, {} as Partial<T>);
}
