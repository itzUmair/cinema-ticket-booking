import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// Eye and Hidden icon taken from flaticon
import Eye from "../assets/eye.png";
import Hidden from "../assets/hidden.png";
import "../styles/components/Form.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [cookies, setCookies, removeCookies] = useCookies();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.length || !password.length) {
      setError("Fields cannot be empty");
      return;
    }

    if (!email.length) {
      setError("Email cannot be empty");
      return;
    }
    if (!password.length) {
      setError("Password cannot be empty");
      return;
    }

    if (password.length < 8) {
      setError("Password must atleast be 8 character long");
      return;
    }
    if (
      password.length >= 8 &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setError("Invalid password");
      return;
    }
    if (
      email.length &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      setError("Invalid Email Address");
      return;
    }
    setIsLoading(true);
  };

  const urlChecker = () => {
    const url = window.location.href.endsWith("/user/auth")
      ? "user/auth"
      : "admin/auth";
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();
    const url = urlChecker();
    let response;
    try {
      response = await axios.post(url, {
        email,
        password,
      });
    } catch (err) {
      if (err.response.status === 400) {
        setError(err.response.data.message);
        return;
      }
      if (err.response.status === 404) {
        setError(err.response.data.message);
        return;
      }
      setIsLoading(false);
    }
    if (response.status === 200) {
      setCookies("accessToken", response.data.token);
      if (url === "user/auth") {
        navigate("/user/dashboard");
        return;
      }
      if (url === "admin/auth") {
        navigate("/admin/dashboard");
        return;
      }
    }
    setIsLoading(false);
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

      <button
        type="submit"
        className="submitBtn"
        disabled={isLoading ? true : false}
        onClick={handleSubmit}
      >
        {isLoading ? "Please Wait..." : "Login"}
      </button>
    </form>
  );
}

export default Login;
