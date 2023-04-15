import React, { useState } from "react";
import "../../styles/components/AddNewMovieDialog.css";

function AddNewMovieDialog({ setAddNewMovieDialog, setRefresh }) {
  const [movieId, setMovieId] = useState(0);
  const [movieTitle, setMovieTitle] = useState("");
  const [movieDesc, setMovieDesc] = useState("");
  const [movieRating, setMovieRating] = useState(0);
  const [movieHallId, setMovieHallId] = useState(0);
  const [movieStartTime, setMovieStartTime] = useState("");
  const [movieEndTime, setMovieEndTime] = useState("");

  const handleChange = (e) => {
    if (e.target.id === "movieID") {
      setMovieId(e.target.value);
    }
    if (e.target.id === "movieTitle") {
      setMovieTitle(e.target.value);
    }
    if (e.target.id === "movieDesc") {
      setMovieDesc(e.target.value);
    }
    if (e.target.id === "movieRating") {
      setMovieRating(e.target.value);
    }
    if (e.target.id === "movieHallID") {
      setMovieHallId(e.target.value);
    }
    if (e.target.id === "movieStartTime") {
      setMovieStartTime(e.target.value);
    }
    if (e.target.id === "movieEndTime") {
      setMovieEndTime(e.target.value);
    }
  };

  return (
    <form className="addNewMovieForm">
      <h1 className="pageHeader">Add New Movie</h1>
      <span className="formGroup">
        <label htmlFor="movieID">ID:</label>
        <input
          required
          type="number"
          name="movieID"
          id="movieID"
          value={movieId}
          min="0"
          onChange={(e) => handleChange(e)}
        />
      </span>
      <span className="formGroup">
        <label htmlFor="movieTitle">Title:</label>
        <input
          required
          type="text"
          name="movieTitle"
          id="movieTitle"
          maxLength="30"
          value={movieTitle}
          onChange={(e) => handleChange(e)}
        />
      </span>
      <span className="formGroup">
        <label htmlFor="movieDesc">Description:</label>
        <input
          required
          type="text"
          name="movieDesc"
          id="movieDesc"
          maxLength="200"
          value={movieDesc}
          onChange={(e) => handleChange(e)}
        />
      </span>
      <span className="formGroup">
        <label htmlFor="moviePoster">Poster:</label>
        <input
          required
          type="file"
          name="moviePoster"
          id="moviePoster"
          accept=".jpeg, .jpg"
        />
      </span>
      <span className="formGroup">
        <label htmlFor="movieRating">Rating:</label>
        <input
          required
          type="number"
          name="movieRating"
          id="movieRating"
          min="0"
          max="5"
          step="0.1"
          value={movieRating}
          onChange={(e) => handleChange(e)}
        />
      </span>
      <span className="formGroup">
        <label htmlFor="movieHallID">Hall ID:</label>
        <input
          required
          type="number"
          name="hallID"
          id="movieHallID"
          min="0"
          value={movieHallId}
          onChange={(e) => handleChange(e)}
        />
      </span>
      <span className="formGroup">
        <label htmlFor="startTime">Start Time:</label>
        <input
          required
          type="datetime-local"
          name="startTime"
          id="startTime"
          defaultValue={movieStartTime}
          onChange={(e) => handleChange(e)}
        />
      </span>
      <span className="formGroup">
        <label htmlFor="endTime">End Time:</label>
        <input
          required
          type="datetime-local"
          name="endTime"
          id="endTime"
          defaultValue={movieEndTime}
          onChange={(e) => handleChange(e)}
        />
      </span>
      <span className="formBtns">
        <button onClick={() => setAddNewMovieDialog(false)}>Cancel</button>
        <button>Confirm</button>
      </span>
    </form>
  );
}

export default AddNewMovieDialog;
