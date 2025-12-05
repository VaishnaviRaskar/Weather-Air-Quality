import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="container text-center">
        <p className="mb-1">© {new Date().getFullYear()} Atmosio</p>
        <small>
          Created & Designed by{" "}
          <a href="https://kavyainfoweb.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#0d6efd" }}>
            Kavya Info Web
          </a>
        </small>
      </div>
    </footer>
  );
};

export default Footer;
