import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./pages.css";
import axios from "axios";
import useAuth from "../hooks/useAuth";

function Home() {
  const { setAuth } = useAuth();
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        {
          username: user,
          password: password,
        }
      );
      setAuth(response.data.token);
      setToggle(!toggle);
    } catch (error) {
      console.log(error);
    }
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
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </label>
          <label className="login-item">
            Password:
            <input
              className="login-input"
              placeholder={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
