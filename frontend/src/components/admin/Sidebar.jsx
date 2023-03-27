import React from "react";
import Profile from "../../assets/user.png";
import "./../../styles/components/Sidebar.css";

function Sidebar({ setProfilePage }) {
  return (
    <nav className="sidebar">
      <ul className="menuContainer">
        <li className="menuOptions">
          <button
            className="dashboardNavBtn"
            onClick={() => setProfilePage(true)}
          >
            <img className="optionIcon" src={Profile} alt="=>" />
            Profile
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
