import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./pages.css";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // useEffect(() => {
  //   userRef.current.focus;
  // }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

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
      const token = response.data.token;
      const username = response.data.user;
      setAuth({ username, token });
      // console.log(auth.username);
      // console.log(auth.token);
      setUser("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (error) {
      if (!error.response) {
        setErrMsg("No server response");
      } else if (error.response.status === 400) {
        setErrMsg("Missing username or password");
      } else if (error.response.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
      // console.log(error);
      setUser("");
      setPassword("");
    }
  };

  return (
    <section className="login-container">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}></p>
      <div className="login-title">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label className="login-item" htmlFor="username">
            User:
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              className="login-input"
              placeholder={"username"}
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password" className="login-item">
            Password:
            <input
              type="password"
              id="password"
              className="login-input"
              placeholder={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
        <p>
          Need an account? <a href="/register">Sign in!</a>
        </p>
      </div>
    </section>
  );
};

export default Login;
