import React from "react";

function NavBar() {
  return (
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
  );
}

export default NavBar;
