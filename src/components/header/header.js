import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import "../../App.css";
import { BsFillPersonFill } from "react-icons/bs";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
const Header = () => {
  const navigate = useNavigate();
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const apiKey = "AIzaSyC7Jz78vSl5-mHKv4eBOy1fRhmoph6loMA";
  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setCoordinates(latLng);
      setAddress(selectedAddress); // Update the input field value
    } catch (error) {
      console.error("Error while fetching coordinates:", error);
    }
  };
  const localAuth = localStorage.getItem("auth-token");
  console.log("localAuth", localAuth);
  const DropDown = () => {
    const users = [{ username: "Design " }, { username: "Jackson" }, { username: "Chen" }, { username: "Derec" }, { username: "Iuckder" }, { username: "Lee" }];
    return (
      <div className="search-dropdown-container">
        <div className="search-dropdown-content-container">
          {users.map((user, k) => (
            <div className="dropdown-content" key={k}>
              <div className="dis-flex">
                <label className="searched-username" style={{ cursor: "pointer" }}>
                  {user.username}
                </label>
              </div>
            </div>
          ))}
          <div className="dropdown-header" style={{ paddingBottom: 8 }}>
            <div className="see-all">See All</div>
          </div>
        </div>
      </div>
    );
  };
  const SearchFieldWithDropdown = (searchDropdown, setSearchDropdown) => {
    return (
      <div className={"search-bar"}>
        <div className="search-icon">
          <BsSearch />
        </div>
        <input type="text" onClick={() => setSearchDropdown(!searchDropdown)} className="search-input" onBlur={() => setSearchDropdown(false)} placeholder="Search or Filter" />
        {searchDropdown && DropDown()}
      </div>
    );
  };
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
          </nav>
          {localAuth ? (
            <nav class="hidden lg:flex lg:items-end lg:justify-end lg:space-x-4">
              <a onClick={() => navigate("/profile")}>
                <BsFillPersonFill style={{ height: "25px", width: "25px", cursor: "pointer" }} />
              </a>
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
              {SearchFieldWithDropdown(searchDropdown, setSearchDropdown)}
              {localAuth ? (
                <a
                  onClick={() => navigate("/profile")}
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
