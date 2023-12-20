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
import RemoveResidence from "./pages/removeResidence/removeResidence";
import ChangePassword from "./pages/authentication/changePassword";
import Residence from "./dashboardView/residence/residence";
import Users from "./dashboardView/users/users";
import BlockedUsers from "./dashboardView/blockedUsers/blockedUsers";
import AddResidence from "./dashboardView/residence/addResidence";
import UpdateResidence from "./dashboardView/residence/updateResidence";
import ReserveResidence from "./dashboardView/reserveResidence/reserveResidence";
import InformationPage from "./pages/authentication/informationPage";
import HeaderRender from "./layout/headerLayout/headerLayout";
import ForgotPassword from "./pages/authentication/forgotPassword";
const routes = [
  {
    path: "/",
    element: <PublicRender />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/apartments/:searchValue", element: <Apartments /> },
      { path: "/rooms", element: <Rooms /> },
    ],
  },
  {
    path: "/reserve_residence",
    element: <HeaderRender />,
    children: [{ path: "/reserve_residence", element: <RemoveResidence /> }],
  },

  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/change_password", element: <ChangePassword /> },
  { path: "/profile", element: <Profile /> },
  { path: "/add_Residence", element: <AddResidence /> },
  { path: "/update_Residence", element: <UpdateResidence /> },
  { path: "/information", element: <InformationPage /> },
  { path: "/forgot_password", element: <ForgotPassword /> },
  {
    path: "/dashboard",
    element: <PrivateLayout />,
    children: [
      // { path: "/dashboard", element: <AdminDashboard /> },
      { path: "/dashboard", element: <Residence /> },
      { path: "/dashboard/residence", element: <Residence /> },
      { path: "/dashboard/reserve_residence", element: <ReserveResidence /> },
      { path: "/dashboard/users", element: <Users /> },
      { path: "/dashboard/blocked_users", element: <BlockedUsers /> },
    ],
  },
];
export default routes;
