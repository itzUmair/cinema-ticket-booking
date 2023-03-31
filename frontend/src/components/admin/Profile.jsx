import React, { useState } from "react";
import "../../styles/components/Profile.css";
// Eye and Hidden icon taken from flaticon
import Eye from "../../assets/eye.png";
import Hidden from "../../assets/hidden.png";

function Profile({ userInfo }) {
  const [username, setUserName] = useState(userInfo?.admin_name);
  const [userId, setUserId] = useState(userInfo?.admin_id);
  const [email, setEmai] = useState(userInfo?.admin_email);
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();
  const [error, setError] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [changePassword, setChangePassword] = useState(false);

  const validateForm = () => {
    if (!currentPassword.length) {
      setError("Password cannot be empty");
      return;
    }

    if (currentPassword.length < 8) {
      setError("Password must atleast be 8 character long");
      return;
    }
    if (
      currentPassword.length >= 8 &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        currentPassword
      )
    ) {
      setError("Invalid password");
      return;
    }
    if (!newPassword.length) {
      setError("Password cannot be empty");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must atleast be 8 character long");
      return;
    }
    if (
      newPassword.length >= 8 &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        newPassword
      )
    ) {
      setError("Invalid password");
      return;
    }
    if (!confirmNewPassword.length) {
      setError("Password cannot be empty");
      return;
    }

    if (confirmNewPassword.length < 8) {
      setError("Password must atleast be 8 character long");
      return;
    }
    if (
      confirmNewPassword.length >= 8 &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        confirmNewPassword
      )
    ) {
      setError("Invalid password");
      return;
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    validateForm();
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
    }
  };

  const handleChange = (e) => {
    setError("");
    if (e.target.id === "username") {
      setUserName(e.target.value);
    }
    if (e.target.id === "currentPassword") {
      setCurrentPassword(e.target.value);
    }
    if (e.target.id === "newPassword") {
      setNewPassword(e.target.value);
    }
    if (e.target.id === "confirmNewPassword") {
      setConfirmNewPassword(e.target.value);
    }
  };

  return (
    <>
      <form className="profileForm">
        <span className="formGroup">
          <p>ID:</p>
          <p className="userid">{userId}</p>
        </span>
        <span className="formGroup">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleChange}
          />
        </span>
        <span className="formGroup">
          <label htmlFor="email">Email: </label>
          <p id="email">{email}</p>
        </span>
        <span>
          <label htmlFor="password">Password: </label>
          <button
            onClick={(e) => {
              e.preventDefault();
              setChangePassword(!changePassword);
            }}
          >
            Change password
          </button>
        </span>
        {changePassword && (
          <>
            <span className="formGroup">
              <label htmlFor="currentPassword">Current Password: </label>
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                id="currentPassword"
                value={currentPassword}
                onChange={handleChange}
              />
              <span
                role="button"
                className="showPassBtn"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <img
                  src={showCurrentPassword ? Hidden : Eye}
                  alt="show password"
                />
              </span>
            </span>
            <span className="formGroup">
              <label htmlFor="newPassword">New Password: </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                value={newPassword}
                onChange={handleChange}
              />
              <span
                role="button"
                className="showPassBtn"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                <img src={showNewPassword ? Hidden : Eye} alt="show password" />
              </span>
            </span>
            <span className="formGroup">
              <label htmlFor="confirmNnewPassword">
                Confirm New Password:{" "}
              </label>
              <input
                type={showConfirmNewPassword ? "text" : "password"}
                name="confirmNewPassword"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={handleChange}
              />
              <span
                role="button"
                className="showPassBtn"
                onClick={() =>
                  setShowConfirmNewPassword(!showConfirmNewPassword)
                }
              >
                <img
                  src={showConfirmNewPassword ? Hidden : Eye}
                  alt="show password"
                />
              </span>
            </span>
            {error && (
              <span className="errorContainer">
                <p>{error}</p>
              </span>
            )}
            <button onClick={(e) => handleChangePassword(e)}>Confirm</button>
          </>
        )}
      </form>
    </>
  );
}

export default Profile;
