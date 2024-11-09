import React from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [response, setResponse] = React.useState("");
  const [maxAge, setMaxAge] = React.useState("all");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getQuotebook();
  }, [maxAge]);

  const getQuotebook = () => {
    axios
      .get(`/api/quotebook?max_age=${maxAge}`)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.error("Error fetching quotes:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    axios
      .post("/api/quote", formData)
      .then(() => {
        getQuotebook();
        e.target.reset();
      })
      .catch((err) => {
        console.error("Error submitting quote:", err);
      });
  };

  return (
    <div className="App">
      {isLoading ? (
        <div className="loading-screen">
          <h2>Loading quotes...</h2>
        </div>
      ) : (
        <div>
          <nav
            className="navbar navbar-expand-lg"
            style={{
              marginBottom: "12px",
              paddingLeft: "10px",
              border: "2px solid lightgray",
              height: "8vh",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src="../img/quotebook.png"
              alt="Quote Book Icon"
              style={{ width: "32px", height: "32px", marginRight: "16px" }}
            />
            <h4
              className="navbar-text"
              style={{
                color: "#2b2c34",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              Hack at UCI Tech Deliverable
            </h4>
          </nav>
          <div style={{ paddingLeft: "12px", paddingRight: "12px" }}>
            <form
              onSubmit={submitForm}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <input
                type="text"
                name="name"
                id="input-name"
                placeholder="Name"
                className="form-control"
                required
                style={{
                  borderRadius: "8px 8px 0 0",
                }}
              />
              <textarea
                name="message"
                id="input-message"
                placeholder="Quote"
                className="form-control"
                style={{
                  maxHeight: "320px",
                  minHeight: "128px",
                  borderRadius: "0 0 8px 8px",
                }}
                required
              />
              <button
                type="submit"
                class="btn"
                style={{
                  backgroundColor: "#383d42",
                  color: "#faf9f6",
                  fontWeight: "bold",
                  marginTop: "16px",
                }}
              >
                Submit
              </button>
            </form>

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
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
