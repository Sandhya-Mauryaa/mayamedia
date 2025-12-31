import { useParams, Link } from "react-router-dom";
import { getBlogs } from "./blogService";

export default function BlogDetail() {
  const { id } = useParams();
  const blogs = getBlogs(); // Get the blogs array
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return <p className="text-center mt-10">Blog not found!</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Blog Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 pt-24 pb-12 text-center text-white">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full rounded-lg shadow mb-6"
        />
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {blog.content}
        </p>

        <Link
          to="/blog"
          className="text-blue-600 font-medium hover:underline block mt-8"
        >
          ← Back to Blogs
        </Link>
      </div>
    </div>
  );
}
