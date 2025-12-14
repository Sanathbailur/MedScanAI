import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <h3>MediScan AI</h3>
          <ul>
            <li>Smart Diagnosis</li>
            <li>Data Security</li>
            <li>AI Precision</li>
          </ul>
        </div>

        <div>
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/upload">Upload</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <p>support@mediscan.ai</p>
          <p>Bengaluru, India</p>
        </div>
      </div>
      <p className="copyright">© 2025 MediScan AI. All rights reserved.</p>
    </footer>
  );
}
