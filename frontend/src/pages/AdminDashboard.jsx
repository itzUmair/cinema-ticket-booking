import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { TitleBar, Sidebar, Profile } from "../components";
import "../styles/pages/AdminDashboard.css";

function AdminDashboard() {
  const [user, setUser] = useOutletContext();
  const [profilePage, setProfilePage] = useState(false);
  return (
    <main className="dashboardContainer">
      <TitleBar
        name={user?.admin_name}
        email={user?.admin_email}
        setProfilePage={setProfilePage}
      />
      <div className="mainBody">
        <Sidebar setProfilePage={setProfilePage} />
        {profilePage && <Profile />}
      </div>
    </main>
  );
}

export default AdminDashboard;
