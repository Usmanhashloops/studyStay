import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../SideBarWraper";
const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      {children}
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
