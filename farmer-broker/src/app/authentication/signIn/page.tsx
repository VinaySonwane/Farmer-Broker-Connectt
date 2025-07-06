"use client";

import { useState } from "react";
import BrokerSign from "@/components/Authentication/BrokerSign";
import FarmerSign from "@/components/Authentication/FarmerSign";

export default function LoginPage() {
  const [isFarmer, setIsFarmer] = useState(true);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 🌿 Background Gradient Animation */}
      <div className="floating-bg" />

      {/* 🌟 Glassy Login Card */}
      <div className="relative z-10 w-full max-w-4xl bg-white/100 backdrop-blur-lg rounded-3xl shadow-lg px-8 py-10 mx-4 md:mx-8 lg:mx-0 animate-pop">
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {/* 🍀 Left Illustration */}
          <img
            src="https://agronicfood.com/wp-content/uploads/2020/02/0-4.png.webp"
            className="w-64 md:w-80 rounded-lg shadow-md"
            alt="Farm Illustration"
          />

          {/* 🌽 Right Login Area */}
          <div className="flex flex-col w-full max-w-md space-y-6">
            {/* Toggle Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsFarmer(true)}
                className={`px-5 py-2 rounded-full font-semibold transition ${
                  isFarmer
                    ? "bg-green-600 text-white shadow"
                    : "bg-white text-green-800 border border-green-300"
                }`}
              >
                Farmer Login
              </button>
              <button
                onClick={() => setIsFarmer(false)}
                className={`px-5 py-2 rounded-full font-semibold transition ${
                  !isFarmer
                    ? "bg-green-600 text-white shadow"
                    : "bg-white text-green-800 border border-green-300"
                }`}
              >
                Broker Login
              </button>
            </div>

            {/* Form Component */}
            {/* <div className="bg-white/60 p-6 rounded-xl shadow-inner"> */}
            <div className="transition-opacity duration-500 ease-in-out">
              {isFarmer ? <FarmerSign /> : <BrokerSign />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
