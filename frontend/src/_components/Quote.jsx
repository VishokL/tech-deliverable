import React from "react";

function Quote({ quote, getColorByName }) {
  const accentColor = getColorByName(quote.name);
  return (
    <div
      className="quote-card"
      style={{ borderLeft: `4px solid ${accentColor}` }}
    >
      <div className="quote-header">
        <strong>{quote.name}</strong>: {quote.message}
      </div>
      <div className="quote-footer">
        {new Date(quote.time).toLocaleString()}
      </div>
    </div>
  );
}

export default Quote;
