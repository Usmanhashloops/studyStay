import React from "react";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const App = () => {
  const navigate = useNavigate();
  const routeEle = useRoutes(routes);
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!localStorage.getItem("auth-token")) {
  //       navigate("/login");
  //     }
  //   }, 500);
  // }, []);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {routeEle}
    </div>
  );
};
export default App;
