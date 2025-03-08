import React from "react";

function Quote({ quote, getColorByName }) {
  const color = getColorByName(quote.name);
  return (
    <div className="quote-card" style={{ backgroundColor: color }}>
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
