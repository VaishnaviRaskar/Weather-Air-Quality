import React from "react";
import Layout from "../components/Layout/Layout";
import Footer from "../components/Footer/Footer";
import { MapPin, BarChart3 } from "lucide-react";

import {
  Cloud,
  Wind,
  Sun,
  Leaf,
  Globe2,
  Target,
  Users,
  ShieldCheck,
} from "lucide-react";


export default function About() {
  return (
    <>
      <Layout>
        {/* ---------------- TOPBAR (Optional – you can remove it) ---------------- */}
        <header className="topbar glass">
          <h3 className="m-0">About Atmosio</h3>
        </header>

        {/* ---------------- PAGE CONTENT ---------------- */}
        <main className="dashboard-main p-4">

          {/* ---------------- HERO SECTION ---------------- */}
          <section className="about-hero glass p-4 mb-4">
            <h1 className="fw-bold mb-2">About Atmosio</h1>
            <p className="text-muted m-0">
              <b> Atmosio brings you reliable, real-time weather and air quality insights in a clean,
    easy-to-use experience.</b> Our platform is designed to help individuals, families, and
    travelers stay informed and make smarter daily decisions based on accurate environmental data.
    We focus on simplicity, speed, and clarity — so you always know what’s happening around you..
            </p>
          </section>

          {/* ---------------- MISSION SECTION ---------------- */}
          <section className="glass about-section p-4 mb-4">
            <div className="d-flex gap-3 align-items-center mb-2">
              <Target size={34} className="icon-primary" />
              <h3 className="m-0">Our Mission</h3>
            </div>
            <p className="text-muted">
              We aim to make environmental information clear, accessible, and meaningful.
              Atmosio empowers users to understand their surroundings and make informed
              decisions—whether planning a trip, managing health, or simply staying updated
              with changing climate conditions.
            </p>
          </section>

          {/* ---------------- FEATURES GRID ---------------- */}
          <section className="mb-4">
  <h3 className="mb-3 fw-semibold">What Atmosio Offers</h3>

  <div className="about-features-grid">
    <div className="glass about-card p-4">
      <Sun size={36} className="icon-yellow mb-2" />
      <h5>Real-Time Weather</h5>
      <p className="text-muted">
        Instant temperature, humidity, wind speed, and forecasts.
      </p>
    </div>

    <div className="glass about-card p-4">
      <Wind size={36} className="icon-blue mb-2" />
      <h5>Live AQI Monitoring</h5>
      <p className="text-muted">
        Tracks air pollutants and health-based AQI ratings.
      </p>
    </div>

    <div className="glass about-card p-4">
      <Leaf size={36} className="icon-green mb-2" />
      <h5>Health Advice</h5>
      <p className="text-muted">
        Get friendly, helpful tips to stay safe during poor air conditions.
      </p>
    </div>

    <div className="glass about-card p-4">
      <Globe2 size={36} className="icon-purple mb-2" />
      <h5>Global Coverage</h5>
      <p className="text-muted">
        Check data for any city in the world using OpenWeather APIs.
      </p>
    </div>

    {/* NEW CARD 1 */}
    <div className="glass about-card p-4">
      <MapPin size={36} className="icon-red mb-2" />
      <h5>Location Auto-Detect</h5>
      <p className="text-muted">
        Automatically detects your location for instant weather & AQI updates.
      </p>
    </div>

    {/* NEW CARD 2 */}
    <div className="glass about-card p-4">
      <BarChart3 size={36} className="icon-orange mb-2" />
      <h5>Interactive Charts</h5>
      <p className="text-muted">
        Visual graphs for AQI trends, pollutant levels, and weekly forecasts.
      </p>
    </div>
  </div>
</section>
          {/* ---------------- WHY TRUST US ---------------- */}
          <section className="glass about-section p-4 mb-4">
            <div className="d-flex gap-3 align-items-center mb-2">
              <ShieldCheck size={34} className="icon-primary" />
              <h3 className="m-0">Why Trust Atmosio?</h3>
            </div>

            <ul className="about-list">
              <li>
                <Users className="list-icon" /> Uses accurate and verified environmental data.
              </li>
              <li>
                <Cloud className="list-icon" /> Backed by reliable global APIs like OpenWeather.
              </li>
              <li>
                <Wind className="list-icon" /> Continuously updated with real-time readings.
              </li>
              <li>
                <Leaf className="list-icon" /> Clean, modern UI built for ease of use.
              </li>
            </ul>
          </section>

        {/* ---------------- OUR STORY / BRAND SECTION ---------------- */}
<section className="glass about-section p-4 mb-4">
  <h3 className="mb-2">Our Story</h3>
  <p className="text-muted">
    Atmosio was created with a simple idea — to make weather and air-quality 
    information easier for everyone. Instead of complex charts and scattered data,
    we provide a clear, friendly, and reliable dashboard that helps you plan your day,
    protect your health, and stay informed about your environment.
    Whether you're a student, traveler, parent, or outdoor enthusiast,
    Atmosio is built to empower your everyday decisions.
  </p>
</section>


        </main>
      </Layout>

      <Footer />
    </>
  );
}
