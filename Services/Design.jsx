import React from "react";

const Design = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 py-16 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-indigo-600 mb-6">Creative Design Services</h1>
      <p className="text-lg mb-8 max-w-3xl">
        🎨 We bring imagination to life through modern, impactful, and functional design. Whether it’s for web, mobile, print, or social, our creative team delivers designs that speak your brand’s language.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-2">What We Design</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>UI/UX for Websites & Apps</li>
            <li>Infographics & Custom Illustrations</li>
            <li>Social Media Creatives</li>
            <li>Pitch Decks & Presentations</li>
            <li>Printables: Brochures, Posters, Flyers</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Design Tools We Use</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Figma & Adobe XD</li>
            <li>Photoshop & Illustrator</li>
            <li>Canva for Fast Delivery</li>
            <li>After Effects (Motion Design)</li>
            <li>Blender (3D Concepts)</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-indigo-700 transition">
          Let's Design Something Awesome
        </button>
      </div>
    </div>
  );
};

export default Design;
