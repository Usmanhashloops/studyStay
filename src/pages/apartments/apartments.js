import React from "react";
import { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import SliderApartment from "../../components/sliderApartment/sliderApartment";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Api } from "../../utils/Api";
import { IMAGE_BASE_URL } from "../../utils/Url";
import FlashSlider from "../../components/flashSlider/flashslider";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import image from "../../assets/profileicon.png";
import Banner from "../../components/banner/banner";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { BsSearch } from "react-icons/bs";
const Apartments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchValue } = useParams();
  console.log("searchValue", searchValue);
  console.log("location", location);
  const [allCoordinates, setAllCoordinates] = useState();
  const [flashSearchData, setFlashSearchData] = useState();
  const [availableSearchData, setAvailableSearchData] = useState();
  const [residenceData, setResidenceData] = useState();
  const [startIndex, setStartIndex] = useState(0);
  const imageContainerRef = useRef(null);
  const [coordinates, setCoordinates] = useState(null);
  const [address, setAddress] = useState("");
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
  const [imageWidth, setImageWidth] = useState(0);
  useEffect(() => {
    getResidence();
  }, []);

  useEffect(() => {
    console.log("searchValue", searchValue);
  }, [searchValue]);

  useEffect(() => {
    setAllCoordinates(location?.state?.coordinates);
  }, [location?.state]);

  const HandlerAvailableSearch = async () => {
    try {
      console.log("all cord", location?.state?.coordinates);
      const payload = {
        address: searchValue,
        latitude: location?.state?.coordinates?.lat,
        longitude: location?.state?.coordinates?.lng,
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
  const handleSearchHandlers = () => {
    HandlerFlashSearch();
    HandlerAvailableSearch();
  };

  useEffect(() => {
    handleSearchHandlers();
  }, [searchValue]);

  const getResidence = async () => {
    const response = await Api("get", "all-residence");
    console.log("getResponse", response);
    if (response.status === 200 || response.status === 201) {
      setResidenceData(response?.data?.data?.data);
    }
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 1, Math.max(0, flashSearchData?.length - 6)));
  };

  return (
    <div>
      <Banner />

      <section class="py-12 bg-neutral-50 sm:py-16 lg:py-16">
        <div class="px-2 mx-auto sm:px-6 lg:px-0 max-w-7xl">
          <div className=" text-3xl font-pj text-slate-500 font-bold">{searchValue}</div>
          <div className=" text-2xl text-slate-500  font-bold font-pj text-center mt-10">Flash Opportunity</div>
          {/* big Screen flash opportunities slider like tablet,pc or large pc */}
          <div className="app mt-6 mb-12">
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

          {/* small Screen flash opportunities slider like Mobile phone */}

          <div className=" text-2xl text-slate-500 font-bold font-pj text-center pt-2 mb-10">Featured Opportunity</div>
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
                          <div className="text-sm flex justify-end">{item?.distance == 0 ? 0 : item?.distance.toFixed(3)} Km</div>
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
        </div>
      </section>
    </div>
  );
};
export default Apartments;
