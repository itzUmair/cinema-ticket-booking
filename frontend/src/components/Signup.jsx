import React, { useState } from "react";
import axios from "../api/axios";

// Eye and Hidden icon taken from flaticon
import Eye from "../assets/eye.png";
import Hidden from "../assets/hidden.png";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !/^(?=[a-zA-Z ]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(name) ||
      name.endsWith(" ") ||
      name.startsWith(" ")
    ) {
      setError("Invalid characters in name");
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError("Invalid email address");
      return;
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      );
      return;
    }
    if (confirmPassword.length > 0 && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length && !confirmPassword.length) {
      setError("Confirm your password");
      return;
    }

    let response;
    try {
      response = await axios.post("user/auth/signup", {
        name,
        email,
        password,
      });
    } catch (err) {
      if (err.response.status === 400) {
        setError(err.response.data.message);
        return;
      }
    }
    if (response.status === 201) {
      setSuccess("Account created successfully! You can log in now...");
    }
  };

  const handleChange = (e) => {
    setError("");
    setSuccess("");
    if (e.target.id === "name") {
      setName(e.target.value);
    }
    if (e.target.id === "email") {
      setEmail(e.target.value);
    }
    if (e.target.id === "password") {
      setPassword(e.target.value);
    }
    if (e.target.id === "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <form className="signupForm" noValidate={true}>
      <span className="formGroup">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleChange}
          autoComplete="off"
          placeholder="Enter Your Name"
          required
        />
      </span>
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
      <span className="formGroup password">
        <label htmlFor="confirmPassword">Confirm Password: </label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          autoComplete="off"
          placeholder="Re-enter Your Password"
          required
        />
        <span
          role="button"
          className="showPassword"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <img src={showConfirmPassword ? Hidden : Eye} alt="show password" />
        </span>
      </span>

      {error && (
        <span className="errorContainer">
          <p>{error}</p>
        </span>
      )}
      {!error && success && (
        <span className="successContainer">
          <p>{success}</p>
        </span>
      )}

      <button type="submit" className="submitBtn" onClick={handleSubmit}>
        Sign Up
      </button>
    </form>
  );
}

export default Signup;
