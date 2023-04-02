import React from "react";
import Profile from "../../assets/user.png";
import Movie from "../../assets/movie-clapper-open.png";
import Admin from "../../assets/setting.png";

import { Navbtn } from "../../components";

import "./../../styles/components/Sidebar.css";

function Sidebar({
  profilePage,
  moviesPage,
  adminsPage,
  setProfilePage,
  setMoviesPage,
  setAdminsPage,
  pageCleanup,
}) {
  return (
    <nav className="sidebar">
      <ul className="menuContainer">
        <li className="menuOptions">
          <Navbtn
            pageToggle={setMoviesPage}
            icon={Movie}
            page="Movies"
            pageCleanup={pageCleanup}
            state={moviesPage}
          />
        </li>
        <li>
          <Navbtn
            pageToggle={setProfilePage}
            icon={Profile}
            page="Profile"
            pageCleanup={pageCleanup}
            state={profilePage}
          />
        </li>
        <li>
          <Navbtn
            pageToggle={setAdminsPage}
            icon={Admin}
            page="Admins"
            pageCleanup={pageCleanup}
            state={adminsPage}
          />
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
