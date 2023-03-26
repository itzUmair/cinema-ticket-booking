import React from "react";
import { Login, Layout } from "../components/index";
import Logo from "../assets/logo-cropped.png";

import "../styles/pages/adminAuth.css";

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
