import React from "react";
import "../styles/components/ProfileOptionDialog.css";

function ProfileOptionDialog({
  visibility,
  email,
  setViewProfile,
  logout,
  pageCleanup,
}) {
  return (
    <div
      className={
        visibility ? "profileOptionDialog active" : "profileOptionDialog"
      }
    >
      <ul className="profileOptionsContainer">
        <li className="profileOptions">
          <p className="profileEmailTag">Logged in with:</p>
          <p className="profileEmail">{email}</p>
        </li>
        <li className="profileOptions">
          <button
            className="dashboardNavBtn"
            onClick={() => {
              pageCleanup();
              setViewProfile(true);
            }}
          >
            View Profile
          </button>
        </li>
        <li className="profileOptions">
          <button className="dashboardNavBtn" onClick={() => logout()}>
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ProfileOptionDialog;
