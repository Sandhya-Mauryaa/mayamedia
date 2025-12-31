import { Link } from "react-router-dom";

export default function SidebarBlogs({ blogs }) {
  return (
    <div className="space-y-6 max-h-[600px] overflow-y-auto ">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="flex items-start gap-4 bg-[#000000] rounded-xl shadow-md hover:shadow-lg p-5 border border-gray-800"
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="h-30 object-cover rounded-lg"
          />
          <div>
            <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded">
              {blog.category}
            </span>
            <h4 className="text-lg font-semibold mt-2">{blog.title}</h4>
            <Link
              to={`/blog/${blog.id}`}
              className="text-yellow-400 text-sm hover:underline mt-3 inline-block"
            >
              Read →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}