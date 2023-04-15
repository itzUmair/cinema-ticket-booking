import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import "../../styles/components/Movies.css";
import { DisplayDetail, AddNewMovieDialog } from "../index";
import Plus from "../../assets/plus.png";

function Movies() {
  const [records, setRecords] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [displayDetailsDialog, setDisplayDetailsDialog] = useState(false);
  const [displayDetailsDialogData, setDisplayDetailsDialogData] = useState({});
  const [addNewMovieDialog, setAddNewMovieDialog] = useState(false);
  const dateConverter = (date) => {
    const newDate = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "PST",
    };
    return newDate.toLocaleString(newDate, options);
  };

  const handleDelete = () => {};

  const displayDetails = (details) => {
    setDisplayDetailsDialog(true);
    setDisplayDetailsDialogData(details);
  };

  useEffect(() => {
    const getAllMovies = async () => {
      const result = await axios.get("/admin/all-movies");
      setRecords(result.data.result);
    };
    getAllMovies();
  }, [refresh]);
  return (
    <>
      <h1 className="pageHeader">Movies</h1>
      <button
        className="addNewMovieBtn"
        onClick={() => setAddNewMovieDialog(true)}
      >
        <img src={Plus} alt="" />
        New Movie
      </button>
      <table className="moviesContainer">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Hall ID</th>
            <th>Start time</th>
            <th>End time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.movie_id}>
              <td>{record.movie_id}</td>
              <td>{record.movie_title}</td>
              <td>{record.hall_id}</td>
              <td>{dateConverter(record.start_time)}</td>
              <td>{dateConverter(record.end_time)}</td>
              <td className="actions">
                <button onClick={() => displayDetails(record)}>details</button>
                <button onClick={() => handleDelete}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {displayDetailsDialog && (
        <DisplayDetail
          setDisplayDetailsDialog={setDisplayDetailsDialog}
          data={displayDetailsDialogData}
        />
      )}
      {addNewMovieDialog && (
        <AddNewMovieDialog
          setAddNewMovieDialog={setAddNewMovieDialog}
          setRefresh={setRefresh}
        />
      )}
    </>
  );
}

export default Movies;
