import React from "react";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
const App = () => {
  const routeEle = useRoutes(routes);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {routeEle}
    </div>
  );
};
export default App;
