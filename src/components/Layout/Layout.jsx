import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Info, HelpCircle, Phone } from "lucide-react";

export default function Layout({ children }) {
  const location = useLocation();

  // ⭐ ADD THIS — Sidebar state
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // ⭐ ADD THIS — Toggle button function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="app-root d-flex flex-column min-vh-100">

      {/* ⭐ ADD THIS — MOBILE HEADER */}
      <div className="mobile-header d-flex d-md-none">
        <img src="/assets/images/logo.png" className="mobile-logo" alt="logo" />
        <div className="mobile-toggle" onClick={toggleSidebar}>☰</div>
      </div>

      <div className="d-flex flex-grow-1 main-layout">

        {/* ⭐ UPDATE THIS — ADD sidebar-open class */}
        <aside className={`sidebar glass ${sidebarOpen ? "sidebar-open" : ""}`}>
          <div className="sidebar-brand">
            <img src="/assets/images/logo.png" alt="logo" className="logo-img" />

            <div>
              <h4 className="brand-title">Atmosio</h4>
              <small className="brand-sub">Weather & AQI</small>
            </div>
          </div>

          <nav className="nav flex-column sidebar-nav">

            <Link
              to="/dashboard"
              className={`nav-link d-flex align-items-center gap-2 ${isActive("/dashboard") ? "active-nav" : ""}`}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>

            <Link
              to="/about"
              className={`nav-link d-flex align-items-center gap-2 ${isActive("/about") ? "active-nav" : ""}`}
            >
              <Info size={20} />
              About Us
            </Link>

            <Link
              to="/faq"
              className={`nav-link d-flex align-items-center gap-2 ${isActive("/faq") ? "active-nav" : ""}`}
            >
              <HelpCircle size={20} />
              FAQ
            </Link>

            <Link
              to="/contact"
              className={`nav-link d-flex align-items-center gap-2 ${isActive("/contact") ? "active-nav" : ""}`}
            >
              <Phone size={20} />
              Contact
            </Link>

          </nav>
        </aside>

        {/* ---------------- MAIN CONTENT ---------------- */}
        <main className="flex-grow-1 content-area">
          {children}
        </main>

      </div>
    </div>
  );
}
