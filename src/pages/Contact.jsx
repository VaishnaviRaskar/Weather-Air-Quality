import React from "react";
import Layout from "../components/Layout/Layout";
import Footer from "../components/Footer/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <>
      <Layout>
        <header className="topbar glass">
          <h3 className="m-0">Contact Us</h3>
        </header>

        <main className="dashboard-main p-4">
          <section className="glass p-4 rounded-3 mb-4">
            <h1 className="page-title mb-4">Get in Touch</h1>

            <p className="lead">
              Have a question, suggestion, or need help? We're here for you!
            </p>

            <div className="row mt-4 gy-4">
             {/* Phone */}
<div className="col-md-4">
  <a href="tel:9876543210" className="text-decoration-none text-dark">
    <div className="glass p-3 rounded-3 text-center">
      <Phone size={35} className="text-primary mb-2" />
      <h5>Phone</h5>
      <p>+91 98765 43210</p>
    </div>
  </a>
</div>

{/* Email */}
<div className="col-md-4">
  <a href="mailto:support@weather-aqi.com" className="text-decoration-none text-dark">
    <div className="glass p-3 rounded-3 text-center">
      <Mail size={35} className="text-danger mb-2" />
      <h5>Email</h5>
      <p>support@weather-aqi.com</p>
    </div>
  </a>
</div>


              {/* Location */}
              <div className="col-md-4">
                <div className="glass p-3 rounded-3 text-center">
                  <MapPin size={35} className="text-success mb-2" />
                  <h5>Location</h5>
                  <p>Pune, Maharashtra, India</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form className="mt-4">
              <div className="mb-3">
                <label className="form-label">Your Name</label>
                <input className="form-control glass-input" type="text" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Your Email</label>
                <input className="form-control glass-input" type="email" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control glass-input" rows="4" required></textarea>
              </div>

              <button className="btn btn-primary d-flex align-items-center gap-2" type="submit">
                <Send size={18} />
                Send Message
              </button>
            </form>
          </section>
        </main>
      </Layout>

      <Footer />
    </>
  );
}
