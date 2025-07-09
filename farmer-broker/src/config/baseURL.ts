// src/config/baseUrl.ts

let baseUrl: string = "";

if (process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:8000"; // Local backend during development
} else {
  baseUrl = "https://farmer-backend-1-buqj.onrender.com"; // Your production backend URL
}
//Vercel Backend
// https://farmer-broker-connectt.vercel.app
export default baseUrl;
