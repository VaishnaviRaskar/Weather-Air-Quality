import React from "react";
import Layout from "../components/Layout/Layout";
import Footer from "../components/Footer/Footer";
import { HelpCircle, ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      q: "How does the Weather & AQI Dashboard get data?",
      a: "We use the OpenWeather API for real-time weather and air quality updates.",
    },
    {
      q: "Is the AQI data accurate?",
      a: "Yes, AQI is calculated using official OpenWeather's air pollution index.",
    },
    {
      q: "Can I search any city?",
      a: "Absolutely! Our global search supports all major cities and coordinates.",
    },
    {
      q: "Why is my city not showing AQI?",
      a: "Some remote locations may not have monitoring stations. Try nearby cities.",
    },
    {
      q: "Is this dashboard free to use?",
      a: "Yes! All features are free. Just use your own API key from OpenWeather.",
    },
  ];

  return (
    <>
      <Layout>
        <header className="topbar glass">
          <h3 className="m-0">FAQs</h3>
        </header>

        <main className="dashboard-main p-4">
          <section className="glass p-4 rounded-3 mb-4">
            <h1 className="page-title mb-4">Frequently Asked Questions</h1>

            <div>
              {faqs.map((item, index) => (
                <details key={index} className="faq-item mb-3">
                  <summary className="d-flex align-items-center gap-2">
                    <HelpCircle size={20} />
                    <strong>{item.q}</strong>
                    <ChevronDown className="ms-auto" size={18} />
                  </summary>
                  <p className="mt-2">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        </main>
      </Layout>

      <Footer />
    </>
  );
}
