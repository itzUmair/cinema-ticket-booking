import React, { useState } from "react";
import "../../styles/components/Profile.css";

function Profile({ userInfo }) {
  const [username, setUserName] = useState(userInfo?.admin_name);
  const [userId, setUserId] = useState(userInfo?.admin_id);
  const [email, setEmai] = useState(userInfo?.admin_email);
  return (
    <>
      <form className="profileForm">
        <span className="formGroup">
          <p>ID:</p>
          <p className="userid">{userId}</p>
        </span>
        <span className="formGroup">
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" id="username" value={username} />
        </span>
        <span className="formGroup">
          <label htmlFor="currentPassword">Current Password: </label>
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            value={username}
          />
        </span>
        <span className="formGroup">
          <label htmlFor="newPassword">New Password: </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={username}
          />
        </span>
      </form>
    </>
  );
}

export default Profile;
