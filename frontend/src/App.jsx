import React from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [response, setResponse] = React.useState("");
  const [maxAge, setMaxAge] = React.useState("all");

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
      {/* TODO: include an icon for the quote book */}
      <h1>Hack at UCI Tech Deliverable</h1>

      <h2>Submit a quote</h2>
      {/* TODO: implement custom form submission logic to not refresh the page */}
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
      {/* TODO: Display the actual quotes from the database */}
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
  );
}

export default App;
