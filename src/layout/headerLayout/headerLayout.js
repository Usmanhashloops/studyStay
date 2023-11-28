import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/header";
const HeaderRender = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Outlet />
    </div>
  );
};

export default HeaderRender;
