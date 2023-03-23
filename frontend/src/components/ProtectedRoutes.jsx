import React from "react";
import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

function ProtectedRoutes() {
  const [cookies] = useCookies();

  return cookies?.accessToken?.length ? (
    <main>
      <Outlet />
    </main>
  ) : (
    <h1>unauthorized</h1>
  );
}

export default ProtectedRoutes;
