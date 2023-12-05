import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { MdOutlineBlock } from "react-icons/md";
import logo from "../assets/StudyStay2preview.png";
import { LuUsers } from "react-icons/lu";
const Sidebar = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div>
      <div className="hidden xl:flex xl:w-64 xl:flex-col xl:fixed xl:inset-y-0 z-20">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-gray-900 z-20">
          <div className="flex items-center flex-shrink-0 px-4">
            <img src={logo} style={{ height: "170px", width: "220px", marginTop: "-30px", marginBottom: "-30px" }} />
          </div>
          <div className="flex flex-col flex-1 px-3 mt-8">
            <div className="space-y-4">
              <nav className="flex-1 space-y-2">
                {/* <a
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-white rounded-lg hover:bg-indigo-600 group cursor-pointer"
                >
                  <svg className="flex-shrink-0 w-5 h-5 mr-4 text-white w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  Dashboard
                </a> */}
                <a
                  onClick={() => navigate("/dashboard/residence")}
                  className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-white rounded-lg hover:bg-indigo-600 group cursor-pointer"
                >
                  <AiOutlineHome className="flex-shrink-0   mr-4 text-white w-6 h-6" />
                  Property
                </a>
                <a
                  onClick={() => navigate("/dashboard/reserve_residence")}
                  className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-white rounded-lg hover:bg-indigo-600 group cursor-pointer"
                >
                  <IoBookmarkOutline className="flex-shrink-0   mr-4 text-white w-6 h-6" />
                  Reserved Property
                </a>
                <a
                  onClick={() => navigate("/dashboard/users")}
                  className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-white rounded-lg hover:bg-indigo-600 group cursor-pointer"
                >
                  <LuUsers className="flex-shrink-0   mr-4 text-white w-6 h-6" />
                  Users
                </a>
                <a
                  onClick={() => navigate("/dashboard/blocked_users")}
                  className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-white rounded-lg hover:bg-indigo-600 group cursor-pointer"
                >
                  <MdOutlineBlock className="flex-shrink-0   mr-4 text-white w-6 h-6" />
                  Blocked Users
                </a>
              </nav>
              <hr className="border-gray-700" />
            </div>
            <div className="pb-4 mt-auto">
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
                type="button"
                className=" cursor-pointer flex w-full px-4 py-3 text-sm font-medium text-white transition-all duration-200 rounded-lg hover:bg-gray-700"
              >
                <MdOutlineLogout className="flex-shrink-0   mr-4 text-white w-6 h-6" />
                <div className="mt-1 -ml-1">Sign Out</div>
              </button>
            </div>
            {/* <div className="pb-4 mt-auto">
              {openDropdown && (
                <div
                  className="bg-black rounded-xl px-3 py-3 cursor-pointer"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                >
                  <div className="flex" onClick={() => setOpenDropdown(false)}>
                    <div className="text-md text-white mt-0.5 ">Sign Out</div>
                  </div>
                </div>
              )}
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                type="button"
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-white transition-all duration-200 rounded-lg hover:bg-gray-700"
              >
                <img
                  className="flex-shrink-0 object-cover w-6 h-6 mr-3 rounded-full"
                  src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/4/avatar-female.png"
                  alt=""
                />
                Mariana Jones
                <svg className="w-5 h-5 ml-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </button>
            </div> */}
          </div>
        </div>
      </div>
      {openDrawer && (
        <div className=" xl:hidden w-64 flex-col fixed inset-y-0 z-20">
          <div className=" h-full flex flex-col flex-grow pt-5 overflow-y-auto bg-gray-900 z-20">
            <div className="flex items-center flex-shrink-0 px-4">
              <img src={logo} style={{ height: "170px", width: "220px", marginTop: "-30px", marginBottom: "-30px" }} />
            </div>
            <div className="flex flex-col flex-1 px-3 mt-8">
              <div className="space-y-4">
                <nav className="flex-1 space-y-2">
                  {/* <a
                    onClick={() => {
                      navigate("/dashboard");
                      setOpenDrawer(false);
                    }}
                    className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-white rounded-lg hover:bg-indigo-600 group cursor-pointer"
                  >
                    <svg className="flex-shrink-0 w-5 h-5 mr-4 text-white w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    Dashboard
                  </a> */}
                  <a
                    onClick={() => {
                      navigate("/dashboard/residence");
                      setOpenDrawer(false);
                    }}
                    className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-white rounded-lg hover:bg-indigo-600 group cursor-pointer"
                  >
                    <AiOutlineHome className="flex-shrink-0   mr-4 text-white w-6 h-6" />
                    Property
                  </a>
                  <a
                    onClick={() => {
                      navigate("/dashboard/reserve_residence");
                      setOpenDrawer(false);
                    }}
                    className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-white rounded-lg hover:bg-indigo-600 group cursor-pointer"
                  >
                    <IoBookmarkOutline className="flex-shrink-0   mr-4 text-white w-6 h-6" />
                    Reserved Property
                  </a>
                  <a
                    onClick={() => {
                      navigate("/dashboard/users");
                      setOpenDrawer(false);
                    }}
                    className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-white rounded-lg hover:bg-indigo-600 group cursor-pointer"
                  >
                    <LuUsers className="flex-shrink-0   mr-4 text-white w-6 h-6" />
                    Users
                  </a>
                  <a
                    onClick={() => {
                      navigate("/dashboard/blocked_users");
                      setOpenDrawer(false);
                    }}
                    className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-white rounded-lg hover:bg-indigo-600 group cursor-pointer"
                  >
                    <MdOutlineBlock className="flex-shrink-0   mr-4 text-white w-6 h-6" />
                    Blocked Users
                  </a>
                </nav>
                <hr className="border-gray-700" />
              </div>
              <div className="pb-4 mt-auto">
                <button
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                  type="button"
                  className="flex w-full px-4 py-3 text-sm font-medium text-white transition-all duration-200 rounded-lg hover:bg-gray-700 cursor-pointer"
                >
                  <MdOutlineLogout className="flex-shrink-0   mr-4 text-white w-6 h-6" />
                  <div className="mt-1 -ml-1">Sign Out</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="z-10 flex flex-shrink-0 h-16 bg-white border-b border-gray-200">
        <div className="flex flex-1 px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-end flex-1 justify-end">
            <div className="flex items-center -m-2 xl:hidden" onClick={() => setOpenDrawer(!openDrawer)}>
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-lg hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
            {/* <div className="flex ml-4 mr-auto xl:ml-64">
              <div className="flex items-center flex-shrink-0">
                <div className="block w-auto text-xl font-medium text-gray-800 ">Dashboard</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
