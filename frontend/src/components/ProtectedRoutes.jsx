import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { LoginPrompt } from "./index";
import axios from "../api/axios";

function ProtectedRoutes() {
  const [cookies, setCookies, removeCookies] = useCookies();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      setIsLoading(true);
      const token = cookies?.accessToken;
      try {
        const response = await axios.post("verifyToken", {
          token,
        });
      } catch (err) {
        if (err.response.status === 401) {
          removeCookies("accessToken");
        }
      }
      setIsLoading(false);
    };
    verifyToken();
  }, []);

  if (isLoading) {
    return (
      <LoginPrompt
        prompt="Verifying your account"
        msg="Please wait..."
        btn={false}
      />
    );
  }

  if (cookies?.accessToken?.length) {
    return (
      <main>
        <Outlet />
      </main>
    );
  } else {
    return (
      <LoginPrompt
        prompt="You are not logged in!"
        msg="Please log in to continue..."
        btn={true}
      />
    );
  }
}

export default ProtectedRoutes;
