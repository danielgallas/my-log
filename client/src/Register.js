import React, { useRef, useState, useEffect } from "react";
import { TbCircleCheck, TbInfoCircle } from "react-icons/tb";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const REGISTER_URL = "/api/v1/auth/register";

function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // to prevent button from being hacked with JS
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    // HANDLE SUCCESS
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      console.log(response.data.token);
      console.log(JSON.stringify(response));
      setSuccess(true);
      // clear input fields
    } catch (error) {
      if (!error) {
        setErrMsg("No server response");
      } else if (error.response?.status === 409) {
        setErrMsg("Username taken");
      } else {
        setErrMsg("Registration failed");
      }
      errMsg.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <div className="login-container">
            <div className="login-item">
              <h1>Success!</h1>
              <br />
              <h2>Sign in</h2>
            </div>
          </div>
        </section>
      ) : (
        <section className="login-container" style={{ height: "700px" }}>
          <div className="login-title">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
              {errMsg}
            </p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
              {/* USERNAME */}

              <label className="login-item" htmlFor="username">
                Username:
                <span className={validName ? "valid" : "hide"}>
                  <TbCircleCheck style={{ color: "green" }} />
                </span>
                <span className={validName || !user ? "hide" : "invalid"}>
                  <FaTimes style={{ color: "red" }} />
                </span>
                <input
                  className="login-input"
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  required
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p
                  className={
                    userFocus && user && !validName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <TbInfoCircle />4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </label>

              {/* PASSWORD */}

              <label className="login-item" htmlFor="password">
                Password:
                <span className={validPwd ? "valid" : "hide"}>
                  <TbCircleCheck style={{ color: "green" }} />
                </span>
                <span className={validPwd || !pwd ? "hide" : "invalid"}>
                  <FaTimes style={{ color: "red" }} />
                </span>
                <input
                  className="login-input"
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  className={
                    pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  <TbInfoCircle />4 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters: ! @ # $ %.
                </p>
              </label>

              {/* CONFIRMATION PASSWORD */}

              <label className="login-item" htmlFor="confirm_pwd">
                Confirm your password:
                <span className={validMatch && matchPwd ? "valid" : "hide"}>
                  <TbCircleCheck style={{ color: "green" }} />
                </span>
                <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                  <FaTimes style={{ color: "red" }} />
                </span>
                <input
                  className="login-input"
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  required
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  <TbInfoCircle />
                  Must match your password.
                </p>
              </label>

              <button
                type="submit"
                className="login-btn"
                style={{ width: "200px" }}
                disabled={!validName || !validPwd || !validMatch ? true : false}
              >
                Sign Up
              </button>
            </form>
            <p>Already registered? Sign in</p>
          </div>
        </section>
      )}
    </>
  );
}

export default Register;
