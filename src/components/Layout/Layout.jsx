import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Info, HelpCircle, Phone } from "lucide-react";

export default function Layout({ children }) {
  const location = useLocation();

  // Make active route detection reusable
  const isActive = (path) => location.pathname === path;

  return (
    <div className="app-root d-flex flex-column min-vh-100">

      <div className="d-flex flex-grow-1 main-layout">

        {/* ---------------- SIDEBAR ---------------- */}
        <aside className="sidebar glass">
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
