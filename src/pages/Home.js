import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./pages.css";

let username = "";
let password = "";

function Home() {
  const [toggle, setToggle] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToggle(!toggle);
  };

  return (
    <div className="login-container">
      <div className="login-title">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label className="login-item">
            User:
            <input
              className="login-input"
              placeholder={"username"}
              name={username}
            />
          </label>
          <label className="login-item">
            Password:
            <input
              className="login-input"
              placeholder={"password"}
              name={password}
            />
          </label>
          <button type="submit" className="login-btn">
            Submit
          </button>
        </form>
        <p className={toggle ? "show" : "hide"}>
          <Link to={"/log"}>Go to dashboard</Link>
        </p>
      </div>
    </div>
  );
}

export default Home;
