// Helper function to check if preview is a video
export const isVideoUrl = (url: string) => {
  return /\.(mp4|webm|ogg|mov)$/i.test(url);
};
