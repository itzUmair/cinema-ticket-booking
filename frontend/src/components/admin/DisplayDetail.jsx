import React from "react";
import "../../styles/components/DisplayDetails.css";

function DisplayDetail({ setDisplayDetailsDialog, data }) {
  return (
    <div className="detailsContainer">
      <h2>Movie Details</h2>
      <p>
        <span>ID: </span>
        {data.movie_id}
      </p>
      <p>
        <span>Name: </span>
        {data.movie_title}
      </p>
      <p>
        <span>Description: </span>
        {data.movie_description}
      </p>
      <p>
        <span>Rating: </span>
        {data.movie_rating}
      </p>
      <div className="actionBtn">
        <button onClick={() => setDisplayDetailsDialog(false)}>Close</button>
      </div>
    </div>
  );
}

export default DisplayDetail;
