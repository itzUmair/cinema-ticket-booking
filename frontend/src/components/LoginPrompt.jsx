import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/components/LoginPrompt.css";

function LoginPrompt({ prompt }) {
  const navigate = useNavigate();
  return (
    <div className="promptContainer">
      <h1 className="promptTitle">{prompt}</h1>
      <p>Please login to continue...</p>
      <button onClick={() => navigate("/user/auth")}>Login</button>
    </div>
  );
}

export default LoginPrompt;
