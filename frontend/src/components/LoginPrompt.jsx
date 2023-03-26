import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/components/LoginPrompt.css";

function LoginPrompt({ prompt, msg, btn, redirect }) {
  const navigate = useNavigate();
  return (
    <div className="promptContainer">
      <h1 className="promptTitle">{prompt}</h1>
      <p>{msg}</p>
      <button
        style={btn ? { display: "inline-block" } : { display: "none" }}
        onClick={() => {
          redirect === "user"
            ? navigate("/user/auth")
            : navigate("/admin/auth");
        }}
      >
        Login
      </button>
    </div>
  );
}

export default LoginPrompt;
