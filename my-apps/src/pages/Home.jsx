import React from "react";
import hero from "../assets/hero-illustration.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* ---------- HERO SECTION ---------- */}
      <section className="hero">
        <div className="hero-left">
          <h1 className="hero-title">
            Smarter <span className="highlight">Medical Diagnosis</span> with MediScan AI
          </h1>
          <p className="hero-desc">
            AI-powered health diagnostics for faster and accurate results.
          </p>
          <div className="hero-cta">
            <Link to="/login" className="btn btn-primary big">
              Login
            </Link>
            <Link to="/login" className="btn btn-secondary big">
              Register
            </Link>
          </div>
        </div>

        <div className="hero-right">
          <img src={hero} alt="MediScan AI Illustration" />
        </div>
      </section>

      {/* ---------- WHY CHOOSE SECTION ---------- */}
      <section className="white-section">
        <h2 className="section-title">Why Choose MediScan AI?</h2>
        <div className="features-row">
          <div className="feature-card">
            <div className="icon">✅</div>
            <h4>Accurate AI Diagnosis</h4>
            <p>
              Advanced machine learning algorithms ensure precise medical analysis.
            </p>
          </div>
          <div className="feature-card">
            <div className="icon">⚡</div>
            <h4>Faster Results</h4>
            <p>Get diagnostic results in minutes, not days.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🔒</div>
            <h4>Secure Data</h4>
            <p>Enterprise-grade encryption protects your medical information.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🌐</div>
            <h4>Global Access</h4>
            <p>Access your results anywhere, anytime, from any device.</p>
          </div>
        </div>
      </section>

      {/* ---------- ABOUT SECTION ---------- */}
      <section className="about-section">
        <h2 className="section-title">About This Site</h2>
        <p className="about-text">
          MediScan AI is an intelligent medical diagnosis platform using AI to analyze scans like X-rays, MRI, and CT.
          It enhances accuracy, saves time, and ensures privacy. Designed for doctors, hospitals, and patients to make
          healthcare smarter and more efficient. Our cutting-edge technology combines deep learning with medical
          expertise to provide reliable diagnostic support, helping healthcare professionals make informed decisions
          faster while maintaining the highest standards of data security and patient confidentiality.
        </p>
      </section>

      {/* ---------- TESTIMONIAL SECTION ---------- */}
      <section className="white-section">
        <h2 className="section-title">Trusted by Professionals</h2>
        <div className="testimonials-row">
          <div className="testimonial">
            <p>“MediScan AI transformed how we analyze X-rays — quick and reliable.”</p>
            <div className="author">— Dr. Sanath</div>
          </div>
          <div className="testimonial">
            <p>“I got faster results than ever before. Amazing technology.”</p>
            <div className="author">— Prathwin</div>
          </div>
        </div>
      </section>

      {/* ---------- CTA SECTION ---------- */}
      <section className="journey">
        <h2 className="section-title">Start Your Journey with MediScan AI</h2>
        <h3>Empowering doctors with intelligent AI diagnostics.
Faster, smarter, and more accurate medical insights.</h3>
        <Link to="/upload" className="btn btn-primary big">
          Upload Scan
        </Link>
      </section>
    </>
  );
}
