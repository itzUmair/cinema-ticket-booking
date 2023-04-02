import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import "../../styles/components/Admins.css";
import Plus from "../../assets/plus.png";
import { AddNewAdminDialog } from "../../components";

function Admins() {
  const [addAdminDialog, setAddAdminDialog] = useState(false);
  const [records, setRecords] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const getAllAdmins = async () => {
      const result = await axios.get("/admin/all-admins");
      setRecords([result.data][0]);
    };
    getAllAdmins();
  }, [refresh]);

  return (
    <>
      <h1 className="pageHeader">Admins</h1>
      <div className="addNewAdminContainer">
        <button
          className="addNewAdminBtn"
          onClick={() => setAddAdminDialog(true)}
        >
          <img src={Plus} alt="+" />
          New Admin
        </button>
      </div>
      <table className="dataContainer">
        <thead>
          <tr className="headers">
            <th className="id">ID</th>
            <th className="name">Name</th>
            <th className="email">Email</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.admin_id}>
              <td>{record.admin_id}</td>
              <td>{record.username}</td>
              <td>{record.email}</td>
              <td className="actions">
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {addAdminDialog && (
        <AddNewAdminDialog
          setAddAdminDialog={setAddAdminDialog}
          setRefresh={setRefresh}
        />
      )}
    </>
  );
}

export default Admins;
