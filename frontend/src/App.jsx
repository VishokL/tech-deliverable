import React from "react";
import axios from "axios";
import "./App.css";
import Quotebook from "./_components/Quotebook";
import QuoteForm from "./_components/QuoteForm";
import NavBar from "./_components/NavBar";

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
        <div>
          <h2>Loading quotes...</h2>
        </div>
      ) : (
        <div>
          <NavBar />
          <div style={{ paddingLeft: "12px", paddingRight: "12px" }}>
            <QuoteForm submitForm={submitForm} />

            <Quotebook
              response={response}
              maxAge={maxAge}
              setMaxAge={setMaxAge}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
