import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { TitleBar, Sidebar, Profile, Movies, Admins } from "../components";
import "../styles/pages/AdminDashboard.css";

function AdminDashboard() {
  const [user, setUser] = useOutletContext();
  const [profilePage, setProfilePage] = useState(false);
  const [moviesPage, setMoviesPage] = useState(false);
  const [adminsPage, setAdminsPage] = useState(false);

  const pageCleanup = () => {
    setProfilePage(false);
    setMoviesPage(false);
    setAdminsPage(false);
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
          adminsPage={adminsPage}
          setProfilePage={setProfilePage}
          setMoviesPage={setMoviesPage}
          setAdminsPage={setAdminsPage}
          pageCleanup={pageCleanup}
        />
        {profilePage && <Profile userInfo={user} />}
        {moviesPage && <Movies />}
        {adminsPage && <Admins />}
      </div>
    </main>
  );
}

export default AdminDashboard;
