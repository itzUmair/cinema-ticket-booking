import React, { useEffect, useState } from "react";
import axios from "axios";
// Eye and Hidden icon taken from flaticon
import Eye from "../assets/eye.png";
import Hidden from "../assets/hidden.png";
import "../styles/components/Form.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.length) {
      setError("Email cannot be empty");
    }
    if (!password.length) {
      setError("Password cannot be empty");
    }

    if (password.length < 8) {
      setError("Password must atleast be 8 character long");
    }
    if (
      password.length >= 8 &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setError("Invalid password");
    }
    if (
      email.length &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      setError("Invalid Email Address");
    }
  };

  const handleChange = (e) => {
    setError("");
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
    <form className="loginForm" noValidate={true}>
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
      <span className="formGroup password">
        <label htmlFor="password">Password: </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={handleChange}
          autoComplete="off"
          placeholder="Enter Your Password"
          required
        />
        <span
          role="button"
          className="showPassword"
          onClick={() => setShowPassword(!showPassword)}
        >
          <img src={showPassword ? Hidden : Eye} alt="show password" />
        </span>
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
