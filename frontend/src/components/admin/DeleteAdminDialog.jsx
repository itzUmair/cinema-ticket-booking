import React, { useState } from "react";
import Caution from "../../assets/caution.png";
import { useCookies } from "react-cookie";
import axios from "../../api/axios";
import "../../styles/components/DeleteAdminDialog.css";

function DeleteAdminDialog({ record, setDeleteAdminDialog, setRefresh }) {
  const [cookies, removeCookies] = useCookies();

  const handleDelete = async () => {
    const admin_id = record[0];
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
      const response = await axios.post("admin/delete-admin", { admin_id });
      setRefresh((prev) => !prev);
      setDeleteAdminDialog(false);
    } catch (err) {
      setError(err.response.data.message);
      return;
    }
  };
  return (
    <div className="deleteAdminDialogContainer">
      <h2>Delete Admin</h2>
      <p>You are about to delete:</p>
      <span className="adminData">
        <p>ID: {record[0]}</p>
        <p>Name: {record[1]}</p>
        <p>Email: {record[2]}</p>
      </span>
      <p>Are you sure you want to delete this admin?</p>
      <p>Once deleted changes cannot be reverted.</p>
      <div className="deleteAdminBtn">
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => setDeleteAdminDialog(false)}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteAdminDialog;
