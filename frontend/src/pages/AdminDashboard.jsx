import React from "react";
import { useOutletContext } from "react-router-dom";
import { TitleBar } from "../components";
import "../styles/pages/AdminDashboard.css";

function AdminDashboard() {
  const [user, setUser] = useOutletContext();
  return (
    <main className="dashboardContainer">
      <TitleBar name={user?.admin_name} email={user?.admin_email} />
    </main>
  );
}

export default AdminDashboard;
