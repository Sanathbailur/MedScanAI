import React from "react";

export default function TestimonialCard({ quote, author }) {
  return (
    <div className="testimonial">
      <p>“{quote}”</p>
      <div className="author">— {author}</div>
    </div>
  );
}
