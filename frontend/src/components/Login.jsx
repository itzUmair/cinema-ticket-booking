import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/components/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    }
    if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  };

  const urlChecker = () => {
    const url = window.location.href.endsWith("/user/auth")
      ? "http://localhost:8080/api/v1/user/auth"
      : "http://localhost:8080/api/v1/admin/auth";
    return url;
  };

  return (
    <form className="loginForm">
      <span className="formGroup">
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleChange}
          autoComplete="off"
          placeholder="Enter Your Email"
          required
        />
      </span>
      <span className="formGroup">
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handleChange}
          autoComplete="off"
          placeholder="Enter Your Password"
          required
        />
      </span>

      {error && (
        <span className="errorContainer">
          <p>{error}</p>
        </span>
      )}

      <button type="submit" className="submitBtn" onClick={handleSubmit}>
        Login
      </button>
    </form>
  );
}

export default Login;
