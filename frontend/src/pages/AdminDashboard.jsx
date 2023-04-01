import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { TitleBar, Sidebar, Profile, Movies } from "../components";
import "../styles/pages/AdminDashboard.css";

function AdminDashboard() {
  const [user, setUser] = useOutletContext();
  const [profilePage, setProfilePage] = useState(false);
  const [moviesPage, setMoviesPage] = useState(false);

  const pageCleanup = () => {
    setProfilePage(false);
    setMoviesPage(false);
  };

  return (
    <main className="dashboardContainer">
      <TitleBar
        name={user?.admin_name}
        email={user?.admin_email}
        setProfilePage={setProfilePage}
        pageCleanup={pageCleanup}
      />
      <div className="mainBody">
        <Sidebar
          profilePage={profilePage}
          moviesPage={moviesPage}
          setProfilePage={setProfilePage}
          setMoviesPage={setMoviesPage}
          pageCleanup={pageCleanup}
        />
        {profilePage && <Profile userInfo={user} />}
        {moviesPage && <Movies />}
      </div>
    </main>
  );
}

export default AdminDashboard;
