import { Link } from "react-router-dom";

export default function FeaturedBlog({ blog }) {
  if (!blog) return null;

  return (
    <div className="bg-[#000000] rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-800">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-80 object-cover"
      />
      <div className="p-8">
        <span className="text-sm bg-yellow-400 text-black px-3 py-1 rounded">
          {blog.category}
        </span>
        <h3 className="text-2xl font-semibold mt-4">{blog.title}</h3>
        <p className="text-gray-300 mt-3">{blog.description}</p>
        <Link
          to={`/blog/${blog.id}`}
          className="text-yellow-400 font-medium hover:underline mt-6 inline-block"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
