import React, { useEffect, useState } from "react";
import imageProfile from "../../assets/avatar.jpg";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
// import { Api } from "../../utils/Api";
import { Api } from "../../utils/Api";
import { IMAGE_BASE_URL } from "../../utils/Url";
import { useNavigate } from "react-router-dom";
import UpdateProfileModal from "./modal/updateProfileModal";
import { jwtDecode } from "jwt-decode";
const Profile = () => {
  const navigate = useNavigate();
  const [showUpdateProfileModal, setShowUpdateProfileModal] = React.useState(false);
  const handlerOpen = () => {
    setShowUpdateProfileModal(true);
  };
  const handlerModalClose = () => setShowUpdateProfileModal(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showProfileData, setShowProfileData] = useState({});
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenUpdateProfile = () => {
    setAnchorEl(null);
    setShowUpdateProfileModal(true);
  };
  const localStorageData = localStorage.getItem("auth-token");
  const decoded = jwtDecode(localStorageData);
  console.log("decoded", decoded);
  const handlerChangePassword = () => {
    setAnchorEl(null);
    navigate("/change_password");
  };
  const handlerLogout = () => {
    setAnchorEl(null);
    localStorage.clear();
    navigate("/login");
  };
  const getProfileData = async () => {
    const response = await Api("get", `profile-get/${decoded?.sub}`);
    if (response?.data?.code === 200 || response?.data?.code === 201) {
      setShowProfileData(response?.data?.data);
    }
  };
  useEffect(() => {
    getProfileData();
  }, []);

  // console.log("showProfileData", showProfileData);
  return (
    <div className="flex flex-col flex-1 xl:pl-56">
      <div className="absolute top-6 right-4 md:right-20">
        <BiDotsVerticalRounded
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          className="h-6 w-6 cursor-pointer"
        />
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleOpenUpdateProfile}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Update Profile
          </MenuItem>
          <MenuItem onClick={handlerChangePassword}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Change Password
          </MenuItem>
          <MenuItem onClick={handlerLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
      <main>
        <div className="py-6 pt-8">
          <div className="px-4 mx-auto sm:px-6 md:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          </div>
          <div className="px-4 mx-auto mt-4 sm:px-6 md:px-8">
            <form className="max-w-3xl mt-8">
              <div className="space-y-8">
                <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                  <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2"></label>
                  <div className="sm:mt-0 sm:col-span-2">
                    <div className="flex items-center justify-center ">
                      <img className="flex-shrink-0 object-cover w-40 h-40 rounded-full" src={showProfileData?.image ? IMAGE_BASE_URL + showProfileData?.image : imageProfile} alt="" />
                    </div>
                  </div>
                </div>
                <div className=" sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start pt-4">
                  <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                    {" "}
                    Name{" "}
                  </label>
                  <div className="mt-2 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      value={showProfileData?.name}
                      className=" capitalize border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                  <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                    {" "}
                    Email{" "}
                  </label>
                  <div className="mt-2 sm:mt-0 sm:col-span-2">
                    <input
                      type="email"
                      name=""
                      id=""
                      placeholder=""
                      value={showProfileData?.email}
                      className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                  <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                    {" "}
                    Gender{" "}
                  </label>
                  <div className="mt-2 sm:mt-0 sm:col-span-2">
                    <input
                      type="email"
                      name=""
                      id=""
                      placeholder=""
                      value={showProfileData?.gender}
                      className="capitalize border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                  <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                    {" "}
                    Do you cook?{" "}
                  </label>
                  <div className="mt-2 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      value={showProfileData?.do_you_cook == "1" ? "Yes" : "No"}
                      className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                  <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                    {" "}
                    Are you tidy?{" "}
                  </label>
                  <div className="mt-2 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      value={showProfileData?.are_you_tidy == "1" ? "Yes" : "No"}
                      className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                  <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                    {" "}
                    Allergies?{" "}
                  </label>
                  <div className="mt-2 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      value={showProfileData?.allergies == "1" ? "Yes" : "No"}
                      className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    />
                  </div>
                </div>
                {showProfileData?.allergies === 1 || showProfileData?.allergies === "Yes" ? (
                  <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                    <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                      {" "}
                      Which ones?{" "}
                    </label>
                    <div className="mt-2 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        value={showProfileData?.which_one}
                        className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                  <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                    {" "}
                    Pets?{" "}
                  </label>
                  <div className="mt-2 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      value={showProfileData?.pets == "1" ? "Yes" : "No"}
                      className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                  <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                    {" "}
                    Do you smoke?{" "}
                  </label>
                  <div className="mt-2 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      value={showProfileData?.do_you_smoke == "1" ? "Yes" : "No"}
                      className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                  <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                    {" "}
                    Atmosphere preference?{" "}
                  </label>
                  <div className="mt-2 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      value={showProfileData?.atmosphere_perference}
                      className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                  <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                    {" "}
                    Visitors?{" "}
                  </label>
                  <div className="mt-2 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      value={showProfileData?.visitors == "1" ? "Yes" : "No"}
                      className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                  <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                    {" "}
                    Social within the house?{" "}
                  </label>
                  <div className="mt-2 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      value={showProfileData?.social_within_the_house == "1" ? "Yes" : "No"}
                      className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                  <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                    {" "}
                    Bathroom schedules?{" "}
                  </label>
                  <div className="mt-2 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      value={showProfileData?.bathroom_schedules == "1" ? "Yes" : "No"}
                      className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                  <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                    {" "}
                    Who would you prefer to share with?{" "}
                  </label>
                  <div className="mt-2 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      value={showProfileData?.prefer_to_share_with}
                      className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    />
                  </div>
                </div>
                <div className="pb-6 sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                  <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                    {" "}
                    Brief description{" "}
                  </label>
                  <div className="mt-2 sm:mt-0 sm:col-span-2">
                    <textarea
                      name=""
                      id=""
                      placeholder={showProfileData?.description}
                      value=""
                      rows="4"
                      className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg resize-y focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                      spellcheck="false"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* <div className="mt-6 sm:mt-12">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
                >
                  Update
                </button>
              </div> */}
            </form>
            {showUpdateProfileModal && <UpdateProfileModal open={showUpdateProfileModal} onClose={handlerModalClose} showProfileData={showProfileData} setShowProfileData={setShowProfileData} />}
          </div>
        </div>
      </main>
    </div>
  );
};
export default Profile;
