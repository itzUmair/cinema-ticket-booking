import React from "react";
import { Outlet } from "react-router-dom";

function ProtectedRoutes() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default ProtectedRoutes;
