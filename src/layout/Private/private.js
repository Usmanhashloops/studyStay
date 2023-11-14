import React from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import { Navigate } from "react-router-dom";
const PrivateLayout = () => {
  const localStorageData = JSON.parse(localStorage.getItem("localData"));
  if (!localStorageData) {
    return <DashboardLayout />;
  } else {
    return <Navigate to="/signup" />;
  }
};

export default PrivateLayout;
