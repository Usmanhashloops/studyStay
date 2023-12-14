import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import SliderApartment from "../../components/sliderApartment/sliderApartment";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Api } from "../../utils/Api";
import { IMAGE_BASE_URL } from "../../utils/Url";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import image from "../../assets/profileicon.png";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { BsSearch } from "react-icons/bs";
const Apartments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchValue } = useParams();
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  console.log("searchValue", searchValue);
  console.log("location", location);
  const [allCoordinates, setAllCoordinates] = useState();
  const [filteredData, setFilteredData] = useState();
  const [flashSearchData, setFlashSearchData] = useState();
  const [availableSearchData, setAvailableSearchData] = useState();
  const [residenceData, setResidenceData] = useState();
  const [startIndex, setStartIndex] = useState(0);
  const imageContainerRef = useRef(null);
  const [imageWidth, setImageWidth] = useState(0);
  const [address, setAddress] = useState("");
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
  useEffect(() => {
    console.log("searchValue", searchValue);
  }, [searchValue]);

  useEffect(() => {
    setAllCoordinates(location?.state?.coordinates);
  }, [location?.state]);
  useEffect(() => {
    setFilteredData(location?.state?.checkedItems);
  }, [location?.state]);

  console.log("filteredData", filteredData);
  const HandlerAvailableSearch = async () => {
    try {
      console.log("all cord", location?.state?.coordinates);

      const payload = {
        address: searchValue,
        latitude: location?.state?.coordinates?.lat,
        longitude: location?.state?.coordinates?.lng,
        pets: location?.state?.checkedItems?.Pets ? 1 : 0,
        do_you_smoke: location?.state?.checkedItems?.Smoker ? 1 : 0,
        are_you_tidy: location?.state?.checkedItems?.Tidy ? 1 : 0,
        allergies: location?.state?.checkedItems?.Allergies ? 1 : 0,
        do_you_cook: location?.state?.checkedItems?.Cook ? 1 : 0,
      };
      const response = await Api("post", "search-near-available-places", payload);
      if (response?.status === 200 || response?.status === 201) {
        setAvailableSearchData(response?.data?.data?.data);
      } else {
        console.error("API error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const HandlerFlashSearch = async () => {
    try {
      const payload = {
        address: searchValue,
        latitude: location?.state?.coordinates?.lat,
        longitude: location?.state?.coordinates?.lng,
        pets: location?.state?.checkedItems?.Pets ? 1 : 0,
        do_you_smoke: location?.state?.checkedItems?.Smoker ? 1 : 0,
        are_you_tidy: location?.state?.checkedItems?.Tidy ? 1 : 0,
        allergies: location?.state?.checkedItems?.Allergies ? 1 : 0,
        do_you_cook: location?.state?.checkedItems?.Cook ? 1 : 0,
      };
      const response = await Api("post", "search-near-flash-places", payload);
      if (response?.status === 200 || response?.status === 201) {
        setFlashSearchData(response?.data?.data?.data);
      } else {
        console.error("API error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleFlashHandlers = () => {
    HandlerFlashSearch();
  };
  const handleAvailableHandlers = () => {
    HandlerAvailableSearch();
  };

  useEffect(() => {
    handleAvailableHandlers();
  }, [searchValue]);
  useEffect(() => {
    handleFlashHandlers();
  }, [searchValue]);

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 1, Math.max(0, flashSearchData?.length - 5)));
  };
  useEffect(() => {
    const firstImage = imageContainerRef.current?.querySelector(".img-slider");
    if (firstImage) {
      setImageWidth(firstImage.clientWidth);
    }
  }, [flashSearchData]);

  console.log("flashSearchData", flashSearchData);
  return (
    <div>
      <div className="bg-apartment-background">
        <div className="pt-56 z-20 ">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div className=" text-2xl text-white font-bold z-30 pl-4 -mt-4 md:pl-32 searchedResults">Searched Results:</div>
              <div className=" text-3xl text-white font-bold z-30 pl-4 pt-2  md:pl-32">{searchValue}</div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
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
                        <div className="bg-gray-200 rounded-xl shadow-xl z-30  dropdownContainer ">
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
            </Grid>
          </Grid>
        </div>
      </div>
      <section class="py-12 bg-neutral-50 sm:py-16 lg:py-16">
        <div class="px-2 mx-auto sm:px-6 lg:px-0 max-w-7xl">
          <div className=" text-3xl text-slate-500 font-bold font-pj text-center mb-10">Featured Opportunity</div>
          {availableSearchData ? (
            <Grid container spacing={2}>
              {availableSearchData.map((item, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <div className="bg-slate-200  rounded-lg mt-4">
                    <SliderApartment images={item?.images ? item?.images : ""} item={item} />
                    <div className=" px-3 py-2">
                      <div className="flex justify-between">
                        <div className="">
                          <div className="capitalize font-bold text-sm text-black">{item?.id?.flate_name}</div>

                          <div className="font-bold text-sm text-black mt-1">
                            <span className="">€</span>
                            {item?.id?.price.toLocaleString()}
                          </div>
                        </div>
                        <div className="">
                          <div className="text-sm flex justify-end">{item?.distance == 0 ? 0 : item?.distance.toFixed(1)} Km</div>
                          <div className="flex justify-end">
                            <img src={image} className="imagesmallIcon mr-2" />
                            <div className=" text-sm text-right mt-1">
                              {item?.id?.remaining_person}/{item?.id?.total_person}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          ) : (
            <div className=" text-base text-black  font-bold font-pj text-center mt-16">No Featured Property Exist</div>
          )}
          <div className="app mt-20 mb-12">
            {flashSearchData && flashSearchData.length > 0 ? (
              <div className="slider pt-4">
                {flashSearchData?.length > 5 ? (
                  <button
                    className="nav-button"
                    onClick={() => {
                      handlePrev();
                      console.log("Prev clicked");
                    }}
                  >
                    <IoIosArrowBack className="ml-2" />
                  </button>
                ) : (
                  ""
                )}

                <div className="image-container" style={{ transform: `translateX(-${startIndex * imageWidth}px)` }} ref={imageContainerRef}>
                  {flashSearchData?.map((item, index) => (
                    <div className="img-slider bg-slate-200  rounded-lg " key={index}>
                      {console.log("item==>", item)}
                      <img src={IMAGE_BASE_URL + item?.images[0]?.images} alt="logo" className="img cursor-pointer" onClick={() => navigate(`/rooms`, { state: { roomData: item } })} />
                      <div className="flex justify-between px-3 pt-2 ">
                        <div className="capitalize font-bold text-sm text-black ">{item?.id?.flate_name}</div>
                        <div className="flex justify-end">
                          <img src={image} className="imagesmallIcon mr-2" />
                          <div className=" text-sm text-right mt-1">
                            {item?.id?.remaining_person}/{item?.id?.total_person}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between px-3 ">
                        <div className="font-bold text-sm text-black ">
                          <span className="">€</span>
                          {item?.id?.price.toLocaleString()}
                        </div>
                      </div>
                      <div className=" px-3 pb-2">
                        <div className="text-sm">{item?.distance == 0 ? 0 : item?.distance.toFixed(1)} Km</div>
                      </div>
                    </div>
                  ))}
                </div>
                {flashSearchData?.length > 5 ? (
                  <button
                    className="nav-button-right"
                    onClick={() => {
                      handleNext();
                      console.log("Next clicked");
                    }}
                  >
                    <IoIosArrowForward className="ml-2" />
                  </button>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div className=" text-base text-black  font-bold font-pj text-center mt-12">No Flash Property Exist</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Apartments;
