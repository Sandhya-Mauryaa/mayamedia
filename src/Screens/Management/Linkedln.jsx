import React from "react";

const Linkedln = () => {
  return (
    <div className="pt-32 px-6 md:px-16 lg:px-24">
      <h1 className="text-4xl font-bold text-[var(--accent-color)] mb-6">
        LinkedIn Management Services
      </h1>

      <p className="text-lg text-gray-700 mb-8">
        Build your professional brand and generate leads on LinkedIn with expert profile
        optimization, content creation, and audience engagement strategies.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Feature 1 */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-[var(--secondary-color)] mb-2">
            Profile Optimization
          </h2>
          <p className="text-gray-600">
            We craft a compelling headline, summary, and experience section that attracts
            recruiters, clients, and collaborators.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-[var(--secondary-color)] mb-2">
            Content Strategy
          </h2>
          <p className="text-gray-600">
            Professionally written posts, carousels, and videos that highlight your
            achievements, industry insights, and personal brand.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-[var(--secondary-color)] mb-2">
            Lead Generation
          </h2>
          <p className="text-gray-600">
            We use LinkedIn tools and outreach methods to connect you with potential
            clients, employers, or partners.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-[var(--secondary-color)] mb-2">
            Analytics & Reporting
          </h2>
          <p className="text-gray-600">
            Regular performance updates and analytics on post reach, engagement, and
            profile visits to track growth.
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

export default Linkedln;
