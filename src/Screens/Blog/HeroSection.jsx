export default function HeroSection({ headerimage }) {
  return (
    <div
      className="relative text-white pt-20 pb-24 md:pt-28 md:pb-32 bg-cover bg-center"
      style={{ backgroundImage: `url(${headerimage})` }}
    >
      {/* Subtle dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative max-w-8xl mx-auto px-6 lg:px-20 ">
        {/* Heading */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-5xl">
          Nature Is Essential For The Survival Of All Life On Earth. But It’s Diminishing, Fast.
        </h1>

        {/* Subheading */}
        <p className="mt-4 md:mt-6 text-lg md:text-xl max-w-2xl">
          Explore insights, guides, and updates from our team on technology, growth, and innovation.
        </p>

        {/* Search bar */}
        <div className="mt-6 md:mt-8 flex max-w-md md:max-w-lg">
          <input
            type="text"
            placeholder="Search blogs..."
            className="flex-1 px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
          />
          <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-r-lg hover:bg-yellow-300 transition">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
