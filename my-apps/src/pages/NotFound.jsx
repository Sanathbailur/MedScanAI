import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="white-section">
      <h2 className="section-title">404 — Page Not Found</h2>
      <Link to="/" className="btn btn-primary big">Go Home</Link>
    </section>
  );
}
