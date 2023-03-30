import React from "react";
import "../../styles/components/Navbtn.css";

function Navbtn({ pageToggle, icon, page, pageCleanup, state }) {
  return (
    <button
      className={state ? "dashboardNavBtn active" : "dashboardNavBtn"}
      onClick={() => {
        pageCleanup();
        pageToggle(true);
      }}
    >
      <img
        className={state ? "optionIcon active" : "optionIcon"}
        style={{ width: "1.1rem" }}
        src={icon}
        alt="=>"
      />
      {page}
    </button>
  );
}

export default Navbtn;
