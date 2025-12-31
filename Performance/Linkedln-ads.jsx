import React from "react";

const linkedlnAds = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 py-16 px-6 md:px-20">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">LinkedIn Ads Services</h1>
      <p className="text-lg mb-6 max-w-3xl">
        🎯 Connect with key decision-makers, professionals, and industry leaders using powerful LinkedIn ad campaigns. Perfect for B2B brands and high-value services.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Sponsored content and InMail campaigns</li>
            <li>Audience targeting by job title, industry & company size</li>
            <li>Lead generation forms with CRM integration</li>
            <li>Campaign analytics and A/B testing</li>
            <li>Retargeting & account-based marketing</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Why LinkedIn Ads?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Ideal for B2B marketing & recruitment</li>
            <li>Professional and verified user base</li>
            <li>High-quality leads with intent</li>
            <li>Trusted platform for career & business</li>
            <li>Advanced targeting like no other platform</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition">
          Schedule a Free Strategy Call
        </button>
      </div>
    </div>
  );
};

export default linkedlnAds;
