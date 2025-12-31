// BrandingService.jsx
import React from "react";

const MarketingService = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-10">
        {/* Left Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">
              Tell compelling stories through motion and visuals.
            </h2>
            <p className="mt-4 text-gray-600">
              Ac tristique justo tincidunt euismod. Amet vitae fermentum
              euismod commodo sodales ultricies. Ac nec eget pretium ut mauris
              natoque tellus ligula libero.
            </p>
            <p className="mt-2 text-gray-600">
              Dictum enim vestibulum adipiscing urna at turpis sed facilisis.
              Non rhoncus quisque enim magna arcu egestas sagittis risus odio.
            </p>
          </div>

          <img
            src="https://cdn.prod.website-files.com/67ca9b8de16a4ec3aeba2939/67ed13da8095f8fb71b803d9_service-single-01.avif"
            alt="Service"
            className="w-full rounded-lg"
          />

          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur. At morbi at semper sit nibh
            vulputate sed. Venenatis nunc luctus commodo pulvinar massa.
          </p>

          {/* Service List */}
          <div className="grid grid-cols-2 gap-4">
            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              <li>Social media marketing</li>
              <li>SEO (Search engine optimization)</li>
              <li>PPC & Google ads</li>
            </ul>
            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              <li>Email marketing</li>
              <li>Content marketing</li>
            </ul>
          </div>

          {/* Quote Block */}
          <div className="bg-gray-100 p-6 rounded-lg flex items-start gap-4">
            <img
              src="https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67d937320bc3c6b8d0c22b39_quotes-single.svg"
              alt="quote"
              className="w-6 h-6 mt-1"
            />
            <p className="italic text-gray-700">
              “Amet dapibus volutpat risus vitae amet diam amet indens maecenas
              parturient a Quam viverra eu faucibus eget and ipsum augue
              Pulvinar facilisi amet dictumst”
            </p>
          </div>

          <p className="text-gray-600">
            That includes tens of thousands of organizations, including 100% of
            the Fortune 100. We exist to make every kind of work more
            collaborative and get the most out of their most valuable asset.
          </p>

          {/* FAQ Accordions */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Product making for friendly users
            </h3>
            <div className="space-y-3">
              {[
                { title: "Research" },
                { title: "Concept design" },
                { title: "Implementation" },
                { title: "Testing" },
              ].map((item, index) => (
                <details
                  key={index}
                  className="border rounded overflow-hidden"
                >
                  <summary className="cursor-pointer px-4 py-3 bg-gray-100 font-medium">
                    {index + 1}. {item.title}
                  </summary>
                  <p className="px-4 py-2 text-gray-600">
                    Lorem ipsum dolor sit amet consectetur. Sed malesuada
                    venenatis.
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="bg-gray-50 p-6 rounded-xl space-y-4 h-fit shadow-md">
          <h4 className="text-xl font-semibold text-gray-800">
            Have additional questions?
          </h4>
          <div>
            <a
              href="mailto:info@gmail.com"
              className="block text-indigo-600 hover:underline"
            >
              info@mysite.com
            </a>
            <a
              href="tel:1234567890"
              className="block text-indigo-600 hover:underline"
            >
              258-658-8511
            </a>
          </div>
          <a
            href="/contact-us"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500 text-indigo-600 hover:bg-indigo-100 transition"
          >
            Contact Us
            <img
              src="https://cdn.prod.website-files.com/67c940fe4acccb784784aa90/67c97cb144b2bb732a6e1f0f_up-right-arrow.svg"
              alt="arrow"
              className="w-4 h-4"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default MarketingService;
