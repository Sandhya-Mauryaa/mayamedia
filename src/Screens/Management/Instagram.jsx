import React from "react";

const Instagram = () => {
  return (
    <div className="pt-32 px-6 md:px-16 lg:px-24">
      <h1 className="text-4xl font-bold text-[var(--accent-color)] mb-6">
        Instagram Management Services
      </h1>

      <p className="text-lg text-gray-700 mb-8">
        We help you grow your presence on Instagram with a strong content strategy,
        eye-catching visuals, and proven engagement techniques to increase reach and followers.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Feature 1 */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-[var(--secondary-color)] mb-2">
            Content Planning
          </h2>
          <p className="text-gray-600">
            Strategically planned content calendar with reels, posts, carousels, and stories
            to keep your feed active and aligned with trends.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-[var(--secondary-color)] mb-2">
            Creative Design
          </h2>
          <p className="text-gray-600">
            High-quality creatives designed for engagement, including branded visuals,
            quote posts, and storytelling carousels.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-[var(--secondary-color)] mb-2">
            Hashtag Strategy
          </h2>
          <p className="text-gray-600">
            Research-based hashtag sets for each post to maximize discoverability
            and reach targeted audiences.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-[var(--secondary-color)] mb-2">
            Analytics & Insights
          </h2>
          <p className="text-gray-600">
            Monthly performance reports on follower growth, post reach, engagement rate,
            and audience behavior.
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

export default Instagram;
