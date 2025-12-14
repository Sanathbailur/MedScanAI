import React from "react";

export default function About() {
  return (
    <section className="white-section">
      <h2 className="section-title">About MediScan AI</h2>
      <div className="about-container">
        <p>
          MediScan AI is an innovative medical-diagnosis platform that uses
          artificial intelligence to analyze radiology images such as X-rays,
          MRI and CT scans.  
          Our goal is to help healthcare professionals make faster and more
          accurate decisions, ensuring better patient outcomes.
        </p>
        <p>
          Built with state-of-the-art deep-learning algorithms, MediScan AI
          provides secure data handling, instant insights, and accessibility
          across devices — transforming the way diagnostics are performed.
        </p>
      </div>
    </section>
  );
}
