import React from "react";
import { Login } from "../components/index";
import Logo from "../assets/logo-cropped.png";

function AdminAuth() {
  return (
    <main className="authMain">
      <img src={Logo} alt="granplex" className="logo" />
      <div className="adminPrompt">Admin Login</div>
      <Login />
    </main>
  );
}

export default AdminAuth;
