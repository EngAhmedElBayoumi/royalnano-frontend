// Support nested/array field names like "additionalFiles.0"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFormValueByPath = (obj: any, path: string) => {
  return path.split(".").reduce((acc, key) => {
    // Convert numeric keys to array indices
    const idx = Number(key);
    if (!isNaN(idx) && Array.isArray(acc)) {
      return acc[idx];
    }
    return acc ? acc[key] : undefined;
  }, obj);
};
