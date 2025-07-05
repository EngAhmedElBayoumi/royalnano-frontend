const config = {
  apiUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/",
  mapKey:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    "AIzaSyCgSayz4HQZIlbe2AjBYaxktcxK-9H64do",
};

export default config;
