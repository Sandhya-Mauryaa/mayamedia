import React from "react";

const GoogleAds = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 py-16 px-6 md:px-20">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">Google Ads Services</h1>
      <p className="text-lg mb-6 max-w-3xl">
        📈 Reach customers when they search for what you offer — right on Google.
        Our Google Ads experts create and manage effective ad campaigns that drive real results.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Keyword research and targeting</li>
            <li>Search, Display & Shopping Ads setup</li>
            <li>Conversion tracking & performance optimization</li>
            <li>Retargeting & audience segmentation</li>
            <li>Monthly reports with clear ROI</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Why Choose Us?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Certified Google Ads professionals</li>
            <li>Tailored ad strategy for your business goals</li>
            <li>Transparent budget handling</li>
            <li>Proven track record of ROI</li>
            <li>Ongoing optimization & A/B testing</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center">
        <button className="bg-blue-700 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-800 transition">
          Get a Free Google Ads Audit
        </button>
      </div>
    </div>
  );
};

export default GoogleAds;
