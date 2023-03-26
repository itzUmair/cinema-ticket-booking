import React, { useState } from "react";
import Logo from "./../../assets/logo-cropped.png";
import DownArrow from "./../../assets/arrow-down.png";
import "./../../styles/components/TitleBar.css";

import ProfileOptionDialog from "../ProfileOptionDialog";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function TitleBar({ name, email }) {
  const [cookies, setCookies, removeCookies] = useCookies();
  const [profileOptions, setProfileOptions] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/admin/auth");
    removeCookies("accessToken");
  };

  const displayProfileOptions = () => {
    setProfileOptions(!profileOptions);
  };

  return (
    <div className="titlebar">
      <img src={Logo} alt="Granplex" className="logo" />
      <h1 className="title">Dashboard</h1>
      <div
        className={profileOptions ? "profile active" : "profile"}
        onClick={() => displayProfileOptions()}
      >
        <p>{name}</p>
        <img src={DownArrow} alt="v" />
        <div className="avatar">{name ? name[0] : " "}</div>
      </div>

      <ProfileOptionDialog
        visibility={profileOptions}
        email={email}
        setViewProfile={setViewProfile}
        logout={logout}
      />
    </div>
  );
}

export default TitleBar;
