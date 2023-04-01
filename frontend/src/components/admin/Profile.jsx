import React, { useState } from "react";
import axios from "../../api/axios";
import { useCookies } from "react-cookie";
import "../../styles/components/Profile.css";

// Eye and Hidden icon taken from flaticon
import Eye from "../../assets/eye.png";
import Hidden from "../../assets/hidden.png";
import { useNavigate } from "react-router-dom";

function Profile({ userInfo }) {
  const [username, setUserName] = useState(userInfo?.admin_name);
  const [userId, setUserId] = useState(userInfo?.admin_id);
  const [email, setEmai] = useState(userInfo?.admin_email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [cookies, setCookies, removeCookies] = useCookies();
  const [changePassword, setChangePassword] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const navigate = useNavigate();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (
      !/^(?=[a-zA-Z ]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(username) ||
      username.endsWith(" ") ||
      username.startsWith(" ")
    ) {
      setError("Invalid characters in username");
      return;
    }
    if (
      !currentPassword.length &&
      newPassword.length &&
      confirmNewPassword.length
    ) {
      setError("Password cannot be empty");
      return;
    }

    if (
      currentPassword.length < 8 &&
      newPassword.length &&
      confirmNewPassword.length
    ) {
      setError("Password must atleast be 8 character long");
      return;
    }
    if (
      currentPassword.length >= 8 &&
      newPassword.length &&
      confirmNewPassword.length &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        currentPassword
      )
    ) {
      setError("Invalid password");
      return;
    }
    if (currentPassword.length && !newPassword.length) {
      setError("Password cannot be empty");
      return;
    }

    if (currentPassword.length && newPassword.length < 8) {
      setError("Password must atleast be 8 character long");
      return;
    }
    if (
      currentPassword.length &&
      newPassword.length >= 8 &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        newPassword
      )
    ) {
      setError("Invalid password");
      return;
    }
    if (currentPassword.length && !confirmNewPassword.length) {
      setError("Password cannot be empty");
      return;
    }

    if (currentPassword.length && confirmNewPassword.length < 8) {
      setError("Password must atleast be 8 character long");
      return;
    }
    if (
      currentPassword.length &&
      confirmNewPassword.length >= 8 &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        confirmNewPassword
      )
    ) {
      setError("Invalid password");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      return;
    }
    const token = cookies?.accessToken;
    try {
      const response = await axios.post(
        "verifyToken",
        { message: "token verification" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      if (err.response.status === 401) {
        removeCookies("accessToken");
        return;
      }
    }

    if (error.length === 0) {
      if (currentPassword === undefined && username === userInfo?.admin_name) {
        return;
      }

      try {
        const result = await axios.post(
          "admin/update-profile",
          {
            username,
            currentPassword,
            newPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookies?.accessToken}`,
            },
          }
        );
        if (result.status === 200) {
          setCookies("accessToken", result.data);
          navigate("/admin/auth");
          return;
        }
      } catch (err) {
        if (err.response.status === 401) {
          setError("Current password is incorrect");
        } else {
          setError("Something went wrong! Please try again later");
        }
      }
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
        <span className="formGroup">
          <label htmlFor="password">Password: </label>
          <button
            className="changePassBtn"
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
              <label htmlFor="confirmNnewPassword">Confirm New Password:</label>
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
          </>
        )}
        {error && (
          <span className="errorContainer">
            <p>{error}</p>
          </span>
        )}
        <p className="warning">
          You need to login again to make changes effective
        </p>
        <button
          className="saveChangesBtn"
          onClick={(e) => handleUpdateProfile(e)}
        >
          Save changes
        </button>
      </form>
    </>
  );
}

export default Profile;
