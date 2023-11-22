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
import { Api } from "../../utils/Api";
import { useParams } from "react-router-dom";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
const Header = () => {
  const navigate = useNavigate();
  const handlerModalClose = () => setShowUpdateProfileModal(false);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = React.useState(false);
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [flashSearchData, setFlashSearchData] = useState();
  const [availableSearchData, setAvailableSearchData] = useState();
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);

  const localAuth = localStorage.getItem("auth-token");

  const apiKey = "AIzaSyC7Jz78vSl5-mHKv4eBOy1fRhmoph6loMA";
  // console.log("address", address);
  // console.log("coordinates", coordinates);
  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setCoordinates(latLng);
      setAddress(selectedAddress);

      // handleSearchHandlers();
    } catch (error) {
      console.error("Error while fetching coordinates:", error);
    }
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleSearchHandlers = async (event) => {
  //   if (coordinates && address) {
  //     await HandlerFlashSearch();
  //     await HandlerAvailableSearch();
  //   }
  // };
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
  const HandlerAvailableSearch = async () => {
    const payload = {
      address: address,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    };
    const response = await Api("post", "search-near-available-places", payload);
    if (response?.status === 200 || response?.status === 201) {
      setAvailableSearchData(response?.data?.data?.data);
    }
  };
  const HandlerFlashSearch = async () => {
    const payload = {
      address: address,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    };
    const response = await Api("post", "search-near-flash-places", payload);
    if (response?.status === 200 || response?.status === 201) {
      setFlashSearchData(response?.data?.data?.data);
    }
  };
  // console.log("flashSearchData", flashSearchData);
  // console.log("availableSearchData", availableSearchData);
  return (
    <header className="py-4 bg-white " x-data="{ expanded: false }">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-0">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <a title="" className="flex">
              <div className="text-xl text-slate-500 font-bold font-pj">StudyStay</div>
            </a>
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
          <nav className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-12 -ml-24">
            <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect} searchOptions={{ types: ["geocode"] }}>
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <input
                    className="search-input"
                    {...getInputProps({
                      placeholder: "Enter address or location",
                      onKeyDown: (e) => {
                        if (e.key === "Enter") {
                          if (localAuth) {
                            navigate(`/apartments/${encodeURIComponent(address)}`, { state: { coordinates: coordinates } });
                          } else {
                            navigate("/login");
                          }
                          // navigate(`/apartments/${encodeURIComponent(address)}`, { state: { flashSearchData: flashSearchData, availableSearchData: availableSearchData } });
                        }
                      },
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
            </PlacesAutocomplete>
          </nav>
          {localAuth ? (
            <nav class="hidden lg:flex lg:items-end lg:justify-end lg:space-x-4">
              <a>
                <BsFillPersonFill
                  style={{ height: "25px", width: "25px", cursor: "pointer" }}
                  onClick={handleClick}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                />
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
                <MenuItem
                  onClick={() => navigate("/profile")}
                  // onClick={handleOpenUpdateProfile}
                >
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Profile
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
              <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect} searchOptions={{ types: ["geocode"] }}>
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
              </PlacesAutocomplete>
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
