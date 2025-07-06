import React from "react";

const LandingPage = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center text-center bg-green-900 text-white px-4 py-10">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1646016858849-4721faea5069?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEluZGlhbiUyMGxhcmdlJTIwdmVnZXRhYmxlJTIwbWFya2V0fGVufDB8fDB8fHww')",
          }}
        ></div>

        {/* Overlay Content */}
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            Empowering the Vegetable Market
          </h2>
          <p className="text-lg mb-6 text-gray-200">
            FarmConnect bridges the gap between farmers and brokers by
            digitizing offline mandi systems with real-time pricing and direct
            communication.
          </p>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="py-16 bg-white text-gray-800 px-4">
        <h3 className="text-3xl font-bold text-center mb-10">
          Why Use FarmConnect?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: "📦",
              title: "Real-Time Offers",
              desc: "Get instant price quotes from verified brokers.",
            },
            {
              icon: "📱",
              title: "Direct Chat",
              desc: "Communicate easily with farmers and brokers.",
            },
            {
              icon: "📊",
              title: "Market Insights",
              desc: "Track pricing trends and optimize your sales.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-green-50 p-6 rounded-xl shadow hover:shadow-lg transition-all text-center"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-green-100 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-xl italic text-gray-800">
            “FarmConnect helped me get better prices for my harvest and removed
            middlemen. It’s a game changer.”
          </blockquote>
          <p className="mt-4 font-semibold text-green-700">– Ramesh, Farmer</p>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 bg-white px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { label: "Farmers", value: "1,200+" },
            { label: "Brokers", value: "450+" },
            { label: "Daily Offers", value: "3,000+" },
          ].map((stat, index) => (
            <div key={index} className="p-6 bg-green-50 rounded-lg shadow">
              <div className="text-3xl font-bold text-green-800">
                {stat.value}
              </div>
              <p className="mt-2 text-gray-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-green-900 text-white text-center py-4 text-sm">
        © {new Date().getFullYear()} FarmConnect. All rights reserved.
      </footer>
    </>
  );
};

export default LandingPage;

// import React from "react";

// const LandingPage = () => {
//   return (
//     <>
//       <section className="min-h-screen flex-1 flex-grow flex items-center justify-center text-center  mt-0 px-4 py-2 bg-green-200 ">
//         <div className="max-w-3xl">
//           <h2 className="text-4xl font-extrabold text-green-800 mb-4">
//             Digitize the Vegetable Market
//           </h2>
//           <p className="text-gray-700 mb-6">
//             FarmConnect helps farmers and brokers collaborate efficiently by
//             bringing offline mandi systems online.
//           </p>
//         </div>
//       </section>

//       <footer className="bg-white text-center py-4 text-sm text-gray-500">
//         © {new Date().getFullYear()} FarmConnect. All rights reserved.
//       </footer>
//     </>
//   );
// };

// export default LandingPage;
