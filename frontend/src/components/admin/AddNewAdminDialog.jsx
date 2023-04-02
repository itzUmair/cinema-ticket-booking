import React, { useState } from "react";
import "../../styles/components/AddAdminDialog.css";
import axios from "../../api/axios";
import { useCookies } from "react-cookie";

import Eye from "../../assets/eye.png";
import Hidden from "../../assets/hidden.png";

function AddNewAdminDialog({ setAddAdminDialog, setRefresh }) {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [cookies] = useCookies();
  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    if (e.target.id === "admin_name") {
      setUserName(e.target.value);
    }
    if (e.target.id === "admin_email") {
      setEmail(e.target.value);
    }
    if (e.target.id === "admin_password") {
      setPassword(e.target.value);
    }
    if (e.target.id === "admin_confirm_password") {
      setConfirmPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !email.length ||
      !username.length ||
      !password.length ||
      !confirmPassword.length
    ) {
      setError("Fields cannot be empty");
      return;
    }
    if (
      !/^(?=[a-zA-Z ]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(username) ||
      username.endsWith(" ") ||
      username.startsWith(" ")
    ) {
      setError("Invalid characters in name");
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError("Invalid email address");
      return;
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      );
      return;
    }
    if (confirmPassword.length > 0 && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length && !confirmPassword.length) {
      setError("Confirm your password");
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
        window.location.reload();
        return;
      }
      return;
    }
    try {
      const response = await axios.post(
        "admin/add-admin",
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies?.accessToken}}`,
          },
        }
      );
      setSuccess("Admin created successfully!");
      setRefresh((prev) => !prev);
    } catch (err) {
      setError(err.response.data.message);
      return;
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setAddAdminDialog(false);
  };

  return (
    <>
      <form className="addNewAdminForm">
        <h1 className="pageHeader">Add New Admin</h1>
        <span className="formGroup">
          <label htmlFor="admin_name">Username: </label>
          <input
            type="text"
            id="admin_name"
            placeholder="Enter name"
            value={username}
            onChange={handleChange}
          />
        </span>
        <span className="formGroup">
          <label htmlFor="admin_email">Email: </label>
          <input
            type="text"
            id="admin_email"
            name="admin_email"
            placeholder="Enter email"
            value={email}
            onChange={handleChange}
          />
        </span>
        <span className="formGroup">
          <label htmlFor="admin_password">Password: </label>
          <input
            type={showPassword ? "text" : "password"}
            id="admin_password"
            placeholder="Enter password"
            value={password}
            onChange={handleChange}
          />
          <span
            role="button"
            className="showPassBtn"
            onClick={() => setShowPassword(!showPassword)}
          >
            <img src={showPassword ? Hidden : Eye} alt="show password" />
          </span>
        </span>
        <span className="formGroup">
          <label htmlFor="admin_confirm_password">Confirm Password: </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="admin_confirm_password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={handleChange}
          />
          <span
            role="button"
            className="showPassBtn"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <img src={showConfirmPassword ? Hidden : Eye} alt="show password" />
          </span>
        </span>
        {error && <p>{error}</p>}
        {!error && success && (
          <span className="successContainer">
            <p>{success}</p>
          </span>
        )}
        <span className="formBtns">
          <button onClick={(e) => handleSubmit(e)}>Save</button>
          <button onClick={(e) => handleCancel(e)}>Cancel</button>
        </span>
      </form>
    </>
  );
}

export default AddNewAdminDialog;
