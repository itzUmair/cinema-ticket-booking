import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import "../../styles/components/Admins.css";
import Plus from "../../assets/plus.png";
import { AddNewAdminDialog, DeleteAdminDialog } from "../../components";

function Admins({ userInfo }) {
  const [addAdminDialog, setAddAdminDialog] = useState(false);
  const [deleteAdminDialog, setDeleteAdminDialog] = useState(false);
  const [deleteAdminRecord, setDeleteAdminRecord] = useState();
  const [records, setRecords] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const getAllAdmins = async () => {
      const result = await axios.get("/admin/all-admins");
      setRecords([result.data][0]);
    };
    getAllAdmins();
  }, [refresh]);

  const handleDelete = async (e) => {
    setDeleteAdminRecord([
      e.target.dataset.id,
      e.target.dataset.name,
      e.target.dataset.email,
    ]);
    setDeleteAdminDialog(true);
  };

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
                {userInfo.admin_id !== record.admin_id && (
                  <button
                    data-id={record.admin_id}
                    data-name={record.username}
                    data-email={record.email}
                    onClick={(e) => handleDelete(e)}
                  >
                    Delete
                  </button>
                )}
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
      {deleteAdminDialog && (
        <DeleteAdminDialog
          setDeleteAdminDialog={setDeleteAdminDialog}
          record={deleteAdminRecord}
          setRefresh={setRefresh}
        />
      )}
    </>
  );
}

export default Admins;
