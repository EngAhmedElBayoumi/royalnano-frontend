async function urlToFile(url: string, filename: string): Promise<File> {
  try {
    // Fetch the file from the URL
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    // Convert the response to a Blob
    const blob = await response.blob();

    // Create a File object from the Blob
    return new File([blob], filename, { type: blob.type });
  } catch (error) {
    console.error("Error converting URL to File:", error);
    throw error;
  }
}
export default urlToFile;
