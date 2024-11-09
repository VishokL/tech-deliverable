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
    setIsLoading(true);
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
          <nav className="navbar navbar-expand-lg">
            <h1
              className="navbar-text"
              style={{
                display: "flex",
                alignItems: "center",
                color: "#2b2c34",
                fontWeight: "bold",
              }}
            >
              <img
                src="../img/quotebook.png"
                alt="Quote Book Icon"
                style={{ width: "40px", height: "40px", marginRight: "10px" }}
              />
              Hack at UCI Tech Deliverable
            </h1>
          </nav>

          <h2>Submit a quote</h2>
          <form onSubmit={submitForm}>
            <label htmlFor="input-name">Name</label>
            <input type="text" name="name" id="input-name" required />
            <label htmlFor="input-message">Quote</label>
            <input type="text" name="message" id="input-message" required />
            <button type="submit">Submit</button>
          </form>

          <h2>Filter Quotes</h2>
          <select
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
            aria-label="Filter quotes by age"
          >
            <option value="all">All</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>

          <h2>Previous Quotes</h2>
          <div className="messages">
            {response.length > 0 ? (
              response.map((quote, index) => (
                <div key={index}>
                  <p>
                    {quote.name}: {quote.message}
                  </p>
                  <p>{new Date(quote.time).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>No quotes available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
