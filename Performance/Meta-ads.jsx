import React from "react";
import { FaFacebookF, FaInstagram, FaBullhorn } from "react-icons/fa";

const MetaAds = () => {
  return (
    <section className="bg-gradient-to-br from-[#e8f0fe] to-[#ffffff] py-16 px-6 lg:px-32">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">Meta Ads Campaigns</h2>
        <p className="text-lg text-gray-600 mt-2">
          Reach the right people at the right time with powerful <span className="font-semibold">Facebook & Instagram Ads</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Facebook */}
        <div className="bg-white shadow-xl rounded-2xl p-8 hover:scale-105 transition">
          <FaFacebookF className="text-[#1877f2] text-4xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">Facebook Ads</h3>
          <p className="text-gray-600 mt-2">
            Target custom audiences with laser-precision using Facebook’s smart AI algorithm.
          </p>
        </div>

        {/* Instagram */}
        <div className="bg-white shadow-xl rounded-2xl p-8 hover:scale-105 transition">
          <FaInstagram className="text-[#e1306c] text-4xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">Instagram Ads</h3>
          <p className="text-gray-600 mt-2">
            Build brand visibility and conversions with scroll-stopping visuals and reels.
          </p>
        </div>

        {/* Campaign Strategy */}
        <div className="bg-white shadow-xl rounded-2xl p-8 hover:scale-105 transition">
          <FaBullhorn className="text-[#f59e0b] text-4xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">Ad Strategy</h3>
          <p className="text-gray-600 mt-2">
            From audience research to retargeting funnels, we create full-funnel Meta ad strategies.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button className="bg-[#1877f2] hover:bg-[#165dc1] text-white px-6 py-3 rounded-full font-semibold shadow-lg">
          Get Free Ad Audit
        </button>
      </div>
    </section>
  );
};

export default MetaAds;
