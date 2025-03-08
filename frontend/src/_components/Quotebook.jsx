import React from "react";
import Quote from "./Quote";
import "./Quotebook.css";

function getColorByName(name) {
  const colors = ["#966b9d", "#0090C1", "#4fc73a", "#F29559", "#ED474A"];
  let hash = 0;
  // Multiply hash by 31 before each letter is added.
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

function Quotebook({ response, maxAge, setMaxAge }) {
  const columnCount = 4;
  let columns = [];

  if (response.length > 0) {
    columns = Array.from({ length: columnCount }, () => []);
    response.forEach((quote, index) => {
      columns[index % columnCount].push(quote);
    });
  }

  return (
    <>
      <div className="quotebook-header">
        <h4>Quotebook</h4>
        <select
          className="form-select"
          value={maxAge}
          onChange={(e) => setMaxAge(e.target.value)}
          aria-label="Filter quotes by age"
        >
          <option value="all">All</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {response.length > 0 ? (
        <div className="quote-columns">
          {columns.map((col, colIndex) => (
            <div key={colIndex} className="quote-column">
              {col.map((quote, index) => (
                <Quote
                  key={index}
                  quote={quote}
                  getColorByName={getColorByName}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p className="no-quotes">No quotes available.</p>
      )}
    </>
  );
}

export default Quotebook;
