import React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import SliderApartment from "../../components/sliderApartment/sliderApartment";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Api } from "../../utils/Api";
import { IMAGE_BASE_URL } from "../../utils/Url";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
const Apartments = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { searchValue } = useParams();
  console.log("searchValue", searchValue);
  console.log("location", location);
  const [allCoordinates, setAllCoordinates] = useState();
  // const [allFlashSearchData, setAllFlashSearchData] = useState();
  // const [allAvailableSearchData, setAllAvailableSearchData] = useState();

  const [flashSearchData, setFlashSearchData] = useState();
  const [availableSearchData, setAvailableSearchData] = useState();
  const [residenceData, setResidenceData] = useState();
  const [startIndex, setStartIndex] = useState(0);
  useEffect(() => {
    getResidence();
  }, []);

  useEffect(() => {
    console.log("searchValue", searchValue);
  }, [searchValue]);

  // useEffect(() => {
  //   setAllFlashSearchData(location?.state?.flashSearchData);
  // }, [location?.state]);
  // useEffect(() => {
  //   setAllAvailableSearchData(location?.state?.availableSearchData);
  // }, [location?.state]);

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
  console.log("allCoordinates", allCoordinates);
  // console.log("allFlashSearchData", allFlashSearchData);
  // console.log("allAvailableSearchData", allAvailableSearchData);
  console.log("availableSearchData", availableSearchData);
  console.log("flashSearchData", flashSearchData);
  console.log("residenceData", residenceData);
  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : residenceData?.length - 6));
  };
  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex < residenceData?.length - 6 ? prevIndex + 1 : 0));
  };

  return (
    <section class="py-12 bg-neutral-50 sm:py-16 lg:py-17">
      <div class="px-2 mx-auto sm:px-6 lg:px-0 max-w-7xl">
        <div className=" text-xl font-pj text-slate-500 font-bold">{searchValue}</div>
        <div className=" text-lg text-slate-500  font-bold font-pj text-center mt-6">Flash Opportunity</div>
        {/* big Screen flash opportunities slider like tablet,pc or large pc */}
        <div className="app mt-6 mb-12">
          {flashSearchData ? (
            <div className="slider pt-4">
              {flashSearchData?.length > 6 ? (
                <button className="nav-button" onClick={handlePrev}>
                  <IoIosArrowBack className="ml-2" />
                </button>
              ) : (
                ""
              )}
              <div className="image-container">
                {flashSearchData?.map((img, index) => (
                  <div className="img-slider" key={index}>
                    {console.log("img", img)}
                    <img src={IMAGE_BASE_URL + img?.images[0]?.images} className="img cursor-pointer" onClick={() => navigate(`/rooms`, { state: { roomData: img } })} />
                  </div>
                ))}
              </div>
              {flashSearchData?.length > 6 ? (
                <button className="nav-button-right" onClick={handleNext}>
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
        {/* <div className="app mb-12">
          {flashSearchData && flashSearchData[0]?.id?.status === "flash" ? (
            <div className="slider-small">
              <button className="nav-button" onClick={handlePrev}>
                <IoIosArrowBack className="ml-2" />
              </button>
              <div className="image-container">
                {residenceData?.slice(startIndex, startIndex + 3).map((img, index) => (
                  <div className=" img-slider" key={index}>
                    <img src={IMAGE_BASE_URL + img?.images[0]?.images} className="img" />
                  </div>
                ))}
              </div>
              <button className="nav-button-right" onClick={handleNext}>
                <IoIosArrowForward className="ml-2" />
              </button>
            </div>
          ) : (
            <div className=" text-base text-black  font-bold font-pj text-center mt-12">No Flash Property Exist</div>
          )}
        </div> */}
        <div className=" text-lg text-slate-500 font-bold font-pj text-center pt-2 mb-3">Featured Opportunity</div>
        {availableSearchData ? (
          <Grid container spacing={2}>
            {availableSearchData.map((item, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <div className="bg-slate-200  rounded-lg mt-4">
                  <SliderApartment images={item?.images ? item?.images : ""} item={item} />
                  <div className="flex justify-between px-3 py-2">
                    <div className="font-bold text-sm text-black">
                      <span className="">€</span>
                      {item?.id?.price.toLocaleString()}
                    </div>
                    <div className="">
                      <div className="text-sm ">{item?.distance == 0 ? 0 : item?.distance.toFixed(3)} Meters</div>
                      {/* <div className="text-sm ">100 meters 25m ( Metro Bus)</div> */}
                      <div className=" text-sm text-right mt-1">
                        {item?.id?.remaining_person}/{item?.id?.total_person}
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
  );
};
export default Apartments;
