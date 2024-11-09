import React from "react";

function Quotebook({ response, maxAge, setMaxAge }) {
  return (
    <>
      <div
        style={{
          textAlign: "right",
          marginTop: "24px",
          marginBottom: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <h4
          style={{
            color: "#2b2c34",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          Quotebook
        </h4>
        <select
          className="form-select"
          value={maxAge}
          onChange={(e) => setMaxAge(e.target.value)}
          aria-label="Filter quotes by age"
          style={{
            width: "128px",
            display: "inline-block",
            marginTop: "8px",
            marginBottom: "8px",
          }}
        >
          <option value="all">All</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <div
        className="messages"
        style={{
          columnCount: 4,
          columnGap: "12px",
        }}
      >
        {response.length > 0 ? (
          response.map((quote, index) => {
            const colors = [
              "#966b9d",
              "#0090C1",
              "#4fc73a",
              "#F29559",
              "#ED474A",
            ];
            const color = colors[index % colors.length];
            return (
              <div
                key={index}
                style={{
                  backgroundColor: color,
                  borderRadius: "10px",
                  padding: "16px 20px 8px 20px",
                  marginBottom: "12px",
                  color: "#faf9f6",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  breakInside: "avoid",
                  overflowWrap: "break-word",
                }}
              >
                <p>
                  <strong>{quote.name}</strong>: {quote.message}
                </p>
                <p style={{ fontStyle: "italic" }}>
                  {new Date(quote.time).toLocaleString()}
                </p>
              </div>
            );
          })
        ) : (
          <p>No quotes available.</p>
        )}
      </div>
    </>
  );
}

export default Quotebook;
