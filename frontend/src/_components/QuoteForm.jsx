import React from "react";

function QuoteForm({ submitForm }) {
  return (
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
        className="btn"
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
  );
}

export default QuoteForm;
