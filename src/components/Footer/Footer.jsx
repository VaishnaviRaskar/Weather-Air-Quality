import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="d-flex justify-content-between align-items-center w-100 px-3">

        {/* LEFT SIDE */}
        <p className="mb-0">© {new Date().getFullYear()} Atmosio</p>

        {/* RIGHT SIDE */}
        <small className="mb-0">
          Designed & Developed by{" "}
          <a
            href="https://kavyainfoweb.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0d6efd" }}
          >
            Kavya Info Web
          </a>
        </small>

      </div>
    </footer>
  );
};

export default Footer;
