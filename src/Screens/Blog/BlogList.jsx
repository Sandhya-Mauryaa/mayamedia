import HeroSection from "./HeroSection";
import FeaturedBlog from "./FeaturedBlog";
import SidebarBlogs from "./SidebarBlogs";
import { getBlogs } from "./blogService";
import headerimage from "../../assets/blog1.avif";

export default function BlogListPage() {
  const blogs = getBlogs();
  const [featured, ...others] = blogs;

  return (
    <div className="min-h-screen bg-[#292E38] text-white">
      {/* Hero Section */}
      <HeroSection headerimage={headerimage} />

      {/* Blog Section */}
      <div className="max-w-8xl mx-auto px-6 lg:px-20 py-16">
        <h2 className="text-3xl font-bold mb-10 text-white">Popular Articles</h2>

        <div className="grid lg:grid-cols-12 gap-10 mx-auto">
          {/* FeaturedBlog — take 5 columns */}
          <div className="lg:col-span-7 px-2">
            <FeaturedBlog blog={featured} />
          </div>

          {/* SidebarBlogs — take 7 columns */}
          <div className="lg:col-span-5 px-2">
            <SidebarBlogs blogs={others} />
          </div>
        </div>

      </div>
    </div>
  );
}
