import React, { useRef, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import image from "../../assets/profileicon.png";
import SliderApartment from "../../components/sliderApartment/sliderApartment";
import Grid from "@mui/material/Grid";
import Pagination from "../../components/Pagination/pagination";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { BsSearch } from "react-icons/bs";
import { Api } from "../../utils/Api";
import SliderHome from "../../components/sliderHome/sliderHome";
import { IMAGE_BASE_URL } from "../../utils/Url";
const Home = () => {
  const [startIndex, setStartIndex] = useState(0);
  const imageContainerRef = useRef(null);
  const [imageWidth, setImageWidth] = useState(0);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allAvailableResidence, setAllAvailableResidence] = useState();
  const [allFlashResidence, setAllFlashResidence] = useState();
  const navigate = useNavigate();
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
  useEffect(() => {
    getAllAvailableResidence(currentPage);
  }, [currentPage]);
  useEffect(() => {
    getAllFlashResidence();
  }, []);
  const getAllAvailableResidence = async (page) => {
    const response = await Api("get", `get-all-available-residence?page=${page}`);
    console.log("response===>>", response);
    if (response.status === 200 || response.status === 201) {
      if (pages.length === 0) {
        for (let i = 1; i <= Math.ceil(response?.data?.data?.total / response.data?.data?.per_page); i++) {
          pages.push(i);
        }
        setPages(pages);
      }
      setAllAvailableResidence(response?.data?.data?.data);
    }
  };
  const getAllFlashResidence = async () => {
    const response = await Api("get", `get-all-flash-residence`);

    if (response.status === 200 || response.status === 201) {
      setAllFlashResidence(response?.data?.data?.data);
    }
  };

  useEffect(() => {
    const firstImage = imageContainerRef.current?.querySelector(".img-slider");
    if (firstImage) {
      setImageWidth(firstImage.clientWidth);
    }
  }, [allFlashResidence]);
  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 1, Math.max(0, allFlashResidence?.length - 6)));
  };
  console.log("allFlashResidence", allFlashResidence);
  return (
    <section>
      <section class=" bg-neutral-50">
        <div className="bg-custom-background">
          <div className="pt-48">
            <div className="text-3xl sm:text-5xl font-extrabold text-slate-600 flex items-center justify-center ">
              We find you <span className="ml-2 text-red-600"> home</span>{" "}
            </div>
            <div className=" mt-10">
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
                      <div className="searchiconbox">
                        <BsSearch style={{ color: "#ffffff", height: "25px", width: "25px" }} />
                      </div>
                    </div>
                    <div className="flex items-center justify-center marginLeft">
                      <div className="bg-slate-100 rounded-xl shadow-xl  dropdownContainer ">
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
        <div class="px-4 mx-auto sm:px-6 lg:px-0 max-w-7xl">
          <div class="text-center lg:text-left mt-12">
            <div className=" text-3xl text-slate-500  font-bold  text-center mt-6">Flash Opportunity</div>
            <div className="app mt-6 mb-12">
              {allFlashResidence && allFlashResidence.length > 0 ? (
                <div className="slider pt-4">
                  {allFlashResidence?.length > 6 ? (
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
                    {allFlashResidence?.map((item, index) => (
                      <div className="img-slider bg-slate-200  rounded-lg " key={index}>
                        <img src={IMAGE_BASE_URL + item?.images[0]?.images} alt="logo" className="img" />
                        <div className=" px-3 py-3">
                          <div className="font-bold text-sm text-black capitalize">{item?.flate_name}</div>
                          <div className="lg:flex justify-between">
                            <div className="font-bold text-sm text-black mt-1">
                              <span className="">€</span>
                              {item?.price.toLocaleString()}
                            </div>

                            <div className="flex justify-end">
                              <img src={image} className="imagesmallIcon mr-2" />
                              <div className=" text-sm text-right mt-1">
                                {item?.remaining_person}/{item?.total_person}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {allFlashResidence?.length > 6 ? (
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

            <div className=" text-3xl text-slate-500 font-bold  text-center pt-2 mb-10 mt-8">Featured Opportunity</div>
            {allAvailableResidence ? (
              <Grid container spacing={2}>
                {allAvailableResidence.map((item, i) => (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <div className="bg-slate-200  rounded-lg mt-4 mb-4">
                      <SliderHome images={item?.images ? item?.images : ""} item={item} />
                      {item?.images?.length > 0 ? (
                        <div className=" px-3 py-3">
                          <div className="font-bold text-sm text-black capitalize">{item?.flate_name}</div>
                          <div className="flex justify-between">
                            <div className="font-bold text-sm text-black mt-1">
                              <span className="">€</span>
                              {item?.price.toLocaleString()}
                            </div>

                            <div className="flex justify-end">
                              <img src={image} className="imagesmallIcon mr-2" />
                              <div className=" text-sm text-right mt-1">
                                {item?.remaining_person}/{item?.total_person}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </Grid>
                ))}
                {/* <Pagination /> */}
              </Grid>
            ) : (
              <div className=" text-base text-black  font-bold font-pj text-center mt-16">No Featured Property Exist</div>
            )}
          </div>
          {allAvailableResidence?.length > 0 ? <Pagination currentPage={currentPage} setCurrentPage={(page) => setCurrentPage(page)} pages={pages} /> : null}
        </div>
      </section>
    </section>
  );
};

export default Home;
// https://www.ilaan.com/assets/images/pictures/ilaan-main-opt.webp?v=1.2
