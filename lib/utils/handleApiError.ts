import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export function handleApiError(
  error:
    | FetchBaseQueryError
    | { status: number; message: string }
    | SerializedError
): never {
  if (
    "data" in error &&
    typeof error.data === "object" &&
    error.data !== null
  ) {
    const errorData = error.data as Record<string, string[]>;
    const errorMessage = Object.values(errorData).flat().join(", "); // Combine all error messages into a single string
    throw new Error(errorMessage || "An error occurred");
  } else if ("message" in error) {
    throw new Error(error.message);
  } else if ("status" in error && typeof error.status === "string") {
    // Handle cases where status is a string (e.g., "FETCH_ERROR")
    throw new Error(`Error: ${error.status}`);
  } else {
    throw new Error("An unknown error occurred");
  }
}
