import React from "react";
import PublicRender from "./layout/Public/public";
import Home from "./pages/home/home";
import Apartments from "./pages/apartments/apartments";
import Rooms from "./pages/rooms/room";
import Login from "./pages/authentication/login";
import SignUp from "./pages/authentication/signup";
import PrivateLayout from "./layout/Private/private";
import AdminDashboard from "./dashboardView/Admin/admin";
import Profile from "./pages/profile/profile";
import ChangePassword from "./pages/authentication/changePassword";
import Residence from "./dashboardView/residence/residence";
import AddResidence from "./dashboardView/residence/addResidence";
import UpdateResidence from "./dashboardView/residence/updateResidence";
const routes = [
  {
    path: "/",
    element: <PublicRender />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/apartments", element: <Apartments /> },
      { path: "/rooms", element: <Rooms /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/change_password", element: <ChangePassword /> },
  { path: "/profile", element: <Profile /> },
  { path: "/add_Residence", element: <AddResidence /> },
  { path: "/update_Residence", element: <UpdateResidence /> },
  {
    path: "/dashboard",
    element: <PrivateLayout />,
    children: [
      { path: "/dashboard", element: <AdminDashboard /> },
      { path: "/dashboard/residence", element: <Residence /> },
    ],
  },
];
export default routes;
