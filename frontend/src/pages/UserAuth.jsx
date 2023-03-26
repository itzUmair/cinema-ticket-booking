import React, { useState } from "react";
import { Login, Signup, Layout } from "../components/index";
import Logo from "../assets/logo-cropped.png";
import "../styles/pages/auth.css";

function UserAuth() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <main className="authMain">
      <img src={Logo} alt="granplex" className="logo" />
      <div className="formSwitcher">
        <button
          className={isLogin ? "login active" : "login"}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={isLogin ? "signup" : "signup active"}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>
      {isLogin ? <Login /> : <Signup />}
    </main>
  );
}

export default UserAuth;
