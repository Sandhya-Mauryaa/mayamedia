import blogimage from "../../assets/blog1.avif";

const blogs = [
  {
    id: 1,
    title: "Getting Started with React",
    description: "Learn the basics of React and how to set up your first project.",
    category: "React",
    content: "React is a JavaScript library for building UIs...",
    image: blogimage,
  },
  {
    id: 2,
    title: "Understanding useState and useEffect",
    description: "A deep dive into React hooks: useState and useEffect.",
    category: "React Hooks",
    content: "Hooks let you use state and lifecycle features...",
    image: blogimage,
  },
  {
    id: 3,
    title: "Dark Mode in Tailwind CSS",
    description: "How to implement dark mode with Tailwind in your projects.",
    category: "Tailwind",
    content: "Tailwind makes it super easy to toggle dark mode...",
    image: blogimage,
  }
];

export function getBlogs() {
  return blogs;
}
