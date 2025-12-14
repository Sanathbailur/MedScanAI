import React from "react";

export default function FeatureCard({ icon, title, text }) {
  return (
    <div className="feature-card">
      <div className="icon">{icon}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}
