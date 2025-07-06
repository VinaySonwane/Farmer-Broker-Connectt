"use client";

import BrokerRegistration from "@/components/Authentication/BrokerRegistration";
import FarmerRegistration from "@/components/Authentication/FarmerRegistration";
import { useState } from "react";

const Authentication = () => {
  const [IsBroker, setIsBroker] = useState<boolean>(true);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 🌿 Animated Background */}
      <div className="floating-bg" />

      {/* 🌟 Card Container */}
      <div className="relative z-10 w-full max-w-5xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg px-6 py-10 mx-4 animate-pop">
        <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
          {/* 📸 Illustration */}
          <img
            className="w-64 md:w-80 rounded-lg shadow-md"
            src="https://agronicfood.com/wp-content/uploads/2020/02/0-4.png.webp"
            alt="Farm Banner"
          />

          {/* 🔁 Toggle + Form */}
          <div className="flex flex-col w-full max-w-md space-y-6">
            {/* Toggle Buttons */}
            <div className="flex justify-center gap-4 mt-0">
              <button
                onClick={() => setIsBroker(true)}
                className={`px-5 py-2 rounded-full font-semibold transition ${
                  IsBroker
                    ? "bg-green-600 text-white shadow"
                    : "bg-white text-green-800 border border-green-300"
                }`}
              >
                Farmer Registration
              </button>
              <button
                onClick={() => setIsBroker(false)}
                className={`px-5 mt-0 py-2 rounded-full font-semibold transition ${
                  !IsBroker
                    ? "bg-green-600 text-white shadow"
                    : "bg-white text-green-800 border border-green-300"
                }`}
              >
                Broker Registration
              </button>
            </div>

            {/* Registration Form */}
            <div className="bg-white/60 p-2  mt-0 rounded-xl shadow-inner">
              {IsBroker ? <FarmerRegistration /> : <BrokerRegistration />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
