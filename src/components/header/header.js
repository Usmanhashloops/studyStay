import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import "../../App.css";
import { BsFillPersonFill } from "react-icons/bs";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Icon from "../../assets/StudyStay2preview.png";
import { Api } from "../../utils/Api";
import { IoHome } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../utils/Url";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileData, setShowProfileData] = useState({});
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const localAuth = localStorage.getItem("auth-token");
  const getProfileData = async () => {
    if (localAuth) {
      const decoded = jwtDecode(localAuth);
      console.log("decoded", decoded);
      const response = await Api("get", `profile-get/${decoded?.sub}`);
      if (response?.data?.code === 200 || response?.data?.code === 201) {
        setShowProfileData(response?.data?.data);
      }
    }
  };
  useEffect(() => {
    getProfileData();
  }, []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlerChangePassword = () => {
    setAnchorEl(null);
    navigate("/change_password");
  };
  const handlerLogout = () => {
    setAnchorEl(null);
    localStorage.clear();
    navigate("/login");
  };
  console.log("showProfileData", showProfileData);
  return (
    <header className=" bg-white z-50 " x-data="{ expanded: false }">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-0">
        <div className="flex items-center justify-between">
          {" "}
          <div style={{ marginTop: "-5px", marginBottom: "-10px", marginRight: "-70px" }}>
            <img src={Icon} style={{ height: "78px", width: "100px" }} />
          </div>
          <div className="flex lg:hidden">
            <button type="button" className="text-gray-900" onClick={toggleExpanded} aria-expanded={expanded}>
              <span className={expanded ? "hidden" : "block"} aria-hidden="true">
                <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </span>
              <span className={expanded ? "block" : "hidden"} aria-hidden="true">
                <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
            </button>
          </div>
          {localAuth ? (
            <nav class="hidden lg:flex lg:items-end lg:justify-end lg:space-x-4">
              <div className="capitalize mt-1 text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                {showProfileData?.name}
              </div>
              <a>
                {showProfileData?.image ? (
                  <img
                    className="rounded-full"
                    style={{ height: "34px", width: "34px", cursor: "pointer" }}
                    src={IMAGE_BASE_URL + showProfileData?.image}
                    alt=""
                    onClick={handleClick}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  />
                ) : (
                  <BsFillPersonFill
                    style={{ height: "25px", width: "25px", cursor: "pointer" }}
                    onClick={handleClick}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  />
                )}
              </a>
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
                <MenuItem onClick={() => navigate("/profile")}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => navigate("/reserve_residence")}>
                  <ListItemIcon>
                    <IoHome className="ml-0" />
                  </ListItemIcon>
                  Reserved Residences
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
            </nav>
          ) : (
            <nav class="hidden lg:flex lg:items-center lg:justify-end lg:space-x-4">
              <a
                onClick={() => navigate("/login")}
                title=""
                class="
        inline-flex
        items-center
        justify-center
        px-5
        py-1
        text-base
        font-semibold
        leading-7
        text-gray-900
        transition-all
        duration-200
        bg-transparent
        border border-gray-900
        rounded-xl
        font-pj
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
        hover:bg-gray-900 hover:text-white
        focus:bg-gray-900 focus:text-white
    "
                role="button"
              >
                Login
              </a>
              <a
                onClick={() => navigate("/signup")}
                title=""
                class="
        inline-flex
        items-center
        justify-center
        px-5
        py-1
        text-base
        font-semibold
        leading-7
        text-gray-900
        transition-all
        duration-200
        bg-transparent
        border border-gray-900
        rounded-xl
        font-pj
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
        hover:bg-gray-900 hover:text-white
        focus:bg-gray-900 focus:text-white
        
    "
                role="button"
              >
                SignUp
              </a>
            </nav>
          )}
        </div>
        <nav className={expanded ? "block" : "hidden"} x-collapse>
          <div className="px-1 py-8">
            <div className="grid gap-y-7">
              {/* <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect} searchOptions={{ types: ["geocode"] }}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <input
                      className="search-input"
                      {...getInputProps({
                        placeholder: "Enter address or location",
                      })}
                    />
                    <BsSearch className="ml-3 absolute" style={{ color: "#000000", marginTop: "-25px" }} />

                    <div className="bg-slate-100 rounded-xl absolute">
                      {loading && <div className=" px-2 py-2">Loading...</div>}
                      {suggestions.map((suggestion) => (
                        <div className=" px-2 py-2" key={suggestion.id}>
                          <div {...getSuggestionItemProps(suggestion)}>{suggestion.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete> */}
              {/* {SearchFieldWithDropdown(searchDropdown, setSearchDropdown)} */}
              {localAuth ? (
                <a
                  onClick={handleClick}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  // onClick={() => navigate("/profile")}
                  title=""
                  class="
        inline-flex
        items-center
        justify-center
        px-5
        py-2
        text-base
        font-semibold
        leading-7
        text-gray-900
        transition-all
        duration-200
        bg-transparent
        border border-gray-900
        rounded-xl
        font-pj
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
        hover:bg-gray-900 hover:text-white
        focus:bg-gray-900 focus:text-white
    "
                  role="button"
                >
                  Profile
                </a>
              ) : (
                <>
                  <a
                    onClick={() => navigate("/login")}
                    title=""
                    class="
        inline-flex
        items-center
        justify-center
        px-5
        py-2
        text-base
        font-semibold
        leading-7
        text-gray-900
        transition-all
        duration-200
        bg-transparent
        border border-gray-900
        rounded-xl
        font-pj
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
        hover:bg-gray-900 hover:text-white
        focus:bg-gray-900 focus:text-white
    "
                    role="button"
                  >
                    Login
                  </a>
                  <a
                    onClick={() => navigate("/signup")}
                    title=""
                    class="
        inline-flex
        items-center
        justify-center
        px-5
        py-2
        text-base
        font-semibold
        leading-7
        text-gray-900
        transition-all
        duration-200
        bg-transparent
        border border-gray-900
        rounded-xl
        font-pj
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
        hover:bg-gray-900 hover:text-white
        focus:bg-gray-900 focus:text-white
    "
                    role="button"
                  >
                    SignUp
                  </a>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Header;
