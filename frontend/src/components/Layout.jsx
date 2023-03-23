import React from "react";
import { Header, Footer } from "./index";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <main>
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}
    </main>
  );
}

export default Layout;
