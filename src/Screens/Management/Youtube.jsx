import React from "react";

const Youtube = () => {
  return (
    <div className="pt-32 px-6 md:px-16 lg:px-24">
      <h1 className="text-4xl font-bold text-[var(--accent-color)] mb-6">
        YouTube Management Services
      </h1>

      <p className="text-lg text-gray-700 mb-8">
        We help you grow your brand on YouTube with data-driven content strategies,
        engaging thumbnails, and SEO-optimized videos that reach the right audience.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Feature 1 */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-[var(--secondary-color)] mb-2">
            Channel Strategy
          </h2>
          <p className="text-gray-600">
            We audit your channel, optimize your content plan, and ensure you're aligned
            with trends and audience interests.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-[var(--secondary-color)] mb-2">
            Thumbnail & Title Design
          </h2>
          <p className="text-gray-600">
            Eye-catching thumbnails and powerful titles to increase CTR and make your
            videos stand out.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-[var(--secondary-color)] mb-2">
            SEO & Metadata Optimization
          </h2>
          <p className="text-gray-600">
            We research the right keywords, tags, and descriptions to help your content
            rank higher on YouTube.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-[var(--secondary-color)] mb-2">
            Performance Reports
          </h2>
          <p className="text-gray-600">
            Monthly reports with insights on what's working and what can be improved,
            based on analytics.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <a
          href="/free-consultancy"
          className="inline-block bg-[var(--accent-color)] text-white px-6 py-3 rounded-full font-medium hover:bg-[var(--secondary-color)] transition-all"
        >
          Book a Free Consultation
        </a>
      </div>
    </div>
  );
};

export default Youtube;
