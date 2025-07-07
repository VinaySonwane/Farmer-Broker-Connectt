// src/config/baseUrl.ts

let baseUrl: string = "";

if (process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:8000"; // Local backend during development
} else {
  baseUrl = "https://farmer-broker-connectt.vercel.app"; // Your production backend URL
}

export default baseUrl;
