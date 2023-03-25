import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { LoginPrompt } from "./index";
import axios from "../api/axios";

function ProtectedRoutes() {
  const [cookies, setCookies, removeCookies] = useCookies();
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = cookies?.accessToken;
      try {
        const response = await axios.post("verifyToken", {
          token,
        });
        console.log(response);
      } catch (err) {
        setSessionExpired(true);
        setCookies("accessToken", "");
      }
    };
    verifyToken();
  }, []);

  if (cookies?.accessToken?.length) {
    return (
      <main>
        <Outlet />
      </main>
    );
  } else if (sessionExpired) {
    return <LoginPrompt prompt="Your session Expired!" />;
  } else {
    return <LoginPrompt prompt="You are not logged in!" />;
  }
}

export default ProtectedRoutes;
