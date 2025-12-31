import React, { useState } from "react";
import { Link } from "react-router-dom";
import img from "../../../assets/Photos/about-bottom.png";
import { FaPaintBrush, FaCode, FaBullhorn, FaVideo } from "react-icons/fa";

const services = [
  {
    title: "Branding & Design",
    icon: <FaPaintBrush className="text-4xl text-indigo-500" />,
    image: img,
    link: "/services/Branding-Service", // ✅ Corrected path
  },
  {
    title: "Web Development",
    icon: <FaCode className="text-4xl text-green-500" />,
    image: img,
    link: "/services/Development-Service",
  },
  {
    title: "Digital Marketing",
    icon: <FaBullhorn className="text-4xl text-pink-500" />,
    image: img,
    link: "/services/Marketing-Service",
  },
  {
    title: "Video Production",
    icon: <FaVideo className="text-4xl text-yellow-500" />,
    image: img,
    link: "/services/Editing-Service",
  },
];

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center flex-wrap gap-6">
          <div>
            <p className="text-sm uppercase tracking-wider text-gray-500">
              Our services
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              Innovative digital solutions for your brand
            </h2>
          </div>
          <Link
            to="/services"
            className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-full hover:opacity-90 transition"
          >
            <span>Explore all services</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        {/* Services Grid */}
        <div className="mt-16 flex gap-4 overflow-hidden">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden bg-gray-100 rounded-xl shadow-md h-[340px] flex-1 transition-all duration-500 ease-in-out ${
                hoveredIndex === null
                  ? "w-full"
                  : hoveredIndex === index
                  ? "flex-[1.3] z-20"
                  : "flex-[0.8] opacity-70 blur-[1px]"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="p-6 flex flex-col items-center text-center h-full">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {service.title}
                </h3>
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-90 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition duration-300 p-6 text-black">
                <img
                  src={service.image}
                  alt="Service"
                  className="absolute inset-0 object-cover w-full h-full opacity-40 z-0"
                />
                <div className="relative z-10">
                  <div className="text-sm uppercase mb-2 whitespace-nowrap overflow-hidden">
                    <div className="animate-marquee inline-block text-white font-medium">
                      {Array(6)
                        .fill(service.title + " • ")
                        .join("")}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white relative z-10">
                    {service.title}
                  </h3>
                </div>

                {/* Explore link */}
                <Link
                  to={service.link}
                  className="self-end z-10 flex items-center gap-2 text-sm text-white underline hover:scale-105 transition"
                >
                  Explore
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Animation Style */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%) }
          100% { transform: translateX(-50%) }
        }

        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Services;
