// src/App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Common/Navbar";
import Footer from "./Common/Footer";
import Homepage from "./Screens/Home/Homepage";
import Services from "./Screens/Services/Services";
import About from "./Screens/About/About";
import Contact from "./Screens/Contact/Contact";
import Portfolio from "./Screens/Portfolio/Portfolio";
import PrivacyPolicy from "./Screens/Legal/PrivacyPolicy";
import Terms from "./Screens/Legal/Terms";
import RefundPolicy from "./Screens/Legal/RefundPolicy";
import Result from "./Screens/Result/Result";
import Preloader from "./Screens/Loader/Preloader";

// Blog for users
import BlogList from "./Screens/Blog/BlogList";
import BlogDetail from "./Screens/Blog/BlogDetails";

// Admin Routes
import AdminRoutes from "./admin/AdminRoutes";
import { AuthProvider } from "./context/AuthContext";

function HomePage() {
  return <Homepage />;
}

// Wrapper to hide Navbar/Footer on admin routes and show Preloader on public
function LayoutWrapper() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Preloader state
  const [ready, setReady] = useState(isAdminRoute ? true : false);

  useEffect(() => {
    if (isAdminRoute) setReady(true);     // skip loader on admin
    else setReady(false);                 // show loader on public routes
  }, [isAdminRoute]);

  return (
    <div
      className={`min-h-dvh ${
        isAdminRoute ? "bg-gray-100 text-black" : "bg-black text-white"
      }`}
    >
      {!isAdminRoute && !ready && <Preloader onDone={() => setReady(true)} />}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Public site */}
        <Route path="/" element={<HomePage />} />
        <Route path="/service" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/result" element={<Result />} />

        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />

        {/* Footer routes */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refunds" element={<RefundPolicy />} />

        {/* Admin */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Optional: 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <LayoutWrapper />
      </BrowserRouter>
    </AuthProvider>
  );
}
