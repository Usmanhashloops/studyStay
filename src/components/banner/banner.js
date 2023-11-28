import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
const Banner = () => {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const [coordinates, setCoordinates] = useState(null);
  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setCoordinates(latLng);
      setAddress(selectedAddress);
    } catch (error) {
      console.error("Error while fetching coordinates:", error);
    }
  };
  return (
    <div className="bg-apartment-background">
      <div className="pt-60 z-30">
        <div className="">
          <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect} searchOptions={{ types: ["geocode"] }}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <div className="flex items-center justify-center ">
                  <input
                    className="search-input-banner shadow-2xl"
                    {...getInputProps({
                      placeholder: "Enter address or location name",
                      onKeyDown: (e) => {
                        if (e.key === "Enter") {
                          navigate(`/apartments/${encodeURIComponent(address)}`, { state: { coordinates: coordinates } });
                        }
                      },
                    })}
                  />
                  <div className="searchicon-apartmentbox">
                    <BsSearch style={{ color: "#ffffff", height: "25px", width: "25px" }} />
                  </div>
                </div>
                <div className="flex items-center justify-center z-30 marginLeft">
                  <div className="bg-gray-500 rounded-xl shadow-xl z-30  dropdownContainer ">
                    {loading && <div className=" px-2 py-2">Loading...</div>}
                    {suggestions.map((suggestion) => (
                      <div className=" px-2 py-2 " key={suggestion.id}>
                        <div {...getSuggestionItemProps(suggestion)}>{suggestion.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
      </div>
    </div>
  );
};

export default Banner;
