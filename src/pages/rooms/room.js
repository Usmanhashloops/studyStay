import React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import SliderRoom from "../../components/sliderRoom/sliderRoom";
import ResidentProfileModal from "./residentProfileViewModal/residentProfileModal";
import { Api } from "../../utils/Api";
import { useLocation } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../utils/Url";
import GoogleMarker from "../../components/googleMarker.js/googleMarker";
import GoogleMapReact from "google-map-react";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import ConfirmationReserveModal from "./residentProfileViewModal/confirmationReserveModal";
const Rooms = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showResidentProfileModal, setshowResidentProfileModal] = useState(false);
  const [showConfirmationReserveModal, setShowConfirmationReserveModal] = useState(false);
  const handleOpen = () => setshowResidentProfileModal(true);
  const handleClose = () => setshowResidentProfileModal(false);
  const [allReserveResidenceData, setAllReserveResidenceData] = useState();
  const [residenceDataByID, setResidenceDataByID] = useState({});
  const [roomData, setRoomData] = useState(location.state.roomData);
  const [profileData, setProfileData] = useState();
  const startIndex = 1;
  const [sendData, setSendData] = useState();
  const endIndex = 4;
  const distanceToMouse = (pt, mp) => {
    if (pt && mp) {
      return Math.sqrt((pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y));
    }
  };

  const visibleImages = roomData?.images.slice(startIndex, endIndex + 1);

  useEffect(() => {
    getResidenceById();
  }, []);

  const getResidenceById = async () => {
    const response = await Api("get", `get-residence/${roomData?.id?.id}`);
    console.log("response", response);
    if (response?.status === 200 || response?.status == 201) {
      setResidenceDataByID(response?.data?.data);
    }
  };
  const localAuth = localStorage.getItem("auth-token");
  const showModal = () => {
    if (localAuth) {
      setShowConfirmationReserveModal(true);
      setSendData(roomData);
    } else {
      navigate("/login");
    }
  };

  const [userAllReserveResidence, setUserAllReserveResidence] = useState();

  const getUserAllReserveResidence = async () => {
    const response = await Api("get", "show-user-reserve-residence");
    console.log("response", response);
    if (response?.status === 200 || response?.status == 201) {
      setUserAllReserveResidence(response?.data?.data);
    }
  };

  useEffect(() => {
    getUserAllReserveResidence();
  }, []);
  console.log("userAllReserveResidence", userAllReserveResidence);
  console.log("residenceDataByID", residenceDataByID);
  console.log("sendData", sendData);
  console.log("roomData", roomData);

  const lat = Number(roomData?.id?.latitude);
  const lng = Number(roomData?.id?.longitude);
  console.log("lat", lat);
  console.log("lng", lng);
  const points = [{ lat: lat, lng: lng, id: <FaLocationDot className="h-8 w-8 text-blue-600" /> }];

  return (
    <section class="py-8 bg-neutral-50 sm:py-16 lg:py-12" style={{ marginTop: "-62px" }}>
      <div class="px-2 mx-auto sm:px-6 lg:px-0 max-w-7xl pt-12">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={7} lg={8}>
            <div className="bg-slate-200  rounded-lg">
              <SliderRoom images={roomData?.images} />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={4}>
            <div className="">
              <div className=" px-5 py-4 pb-4 scrollRemove  card_ResidenceDetail ">
                <nav class="flex justify-between  mb-2 mt-3 ">
                  {roomData?.id?.price ? (
                    <div className="flex">
                      <div className="font-bold text-xl text-black mt-1">
                        <span className="">€</span>
                        {roomData?.id?.price.toLocaleString()}
                      </div>
                      <div className="mt-2 font-medium text-base ml-1">/ month</div>
                    </div>
                  ) : (
                    ""
                  )}
                  {/* {userAllReserveResidence?.length > 0 ? (
                    ""
                  ) : ( */}
                  {userAllReserveResidence && userAllReserveResidence[0]?.status !== "reserved" ? (
                    <a
                      onClick={() => showModal()}
                      className="
        inline-flex
        items-center
        justify-center
        px-8
        py-2
        text-base
        font-semibold
        leading-7
        bg-black
        shadow-xl
        rounded-xl
        text-white        
    "
                      role="button"
                    >
                      Reserve
                    </a>
                  ) : (
                    ""
                  )}
                  {/* )} */}
                </nav>
                <Grid container spacing={2}>
                  <Grid item xs={9} sm={7} md={7}>
                    <div className="text-lg text-black  font-bold  pb-3 mt-6">Residents</div>
                    {residenceDataByID.length > 0 &&
                      residenceDataByID?.map((item, i) => (
                        <div key={i}>
                          {item?.user_data.length > 0 ? (
                            item?.user_data.map((value) => (
                              <div
                                className="flex mb-2"
                                onClick={() => {
                                  setshowResidentProfileModal(true);
                                  setProfileData(value);
                                }}
                              >
                                <img src={IMAGE_BASE_URL + value?.user_id?.image} className="imageIcon" />
                                <div className="mt-2 ml-2  text-sm text-black capitalize cursor-pointer"> {value?.user_id?.name} </div>
                              </div>
                            ))
                          ) : (
                            <div className="mt-3 text-base text-black capitalize cursor-pointer"> No Resident Exist </div>
                          )}
                        </div>
                      ))}
                  </Grid>
                  <Grid item xs={3} sm={5} md={5}>
                    <div className="text-lg text-black  font-bold pb-3 mt-6 flex items-end justify-end">Room Capacity</div>
                    <div className="mt-3 text-right text-sm font-semibold text-slate-700">
                      {roomData?.id?.remaining_person}/{roomData?.id?.total_person}
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={9} lg={8}>
            <div className="mt-12">
              <div className="flex">
                <div className="capitalize sm:text-2xl text-black  font-semibold ">{roomData?.id?.residence_name}</div>
                <div className="ml-2 sm:text-2xl text-black  font-semibold ">{roomData?.id?.address}</div>
              </div>
              {roomData?.id ? (
                <div className="mt-3 sm:text-lg">
                  <span className="text-black font-semibold">Capacity</span>: {roomData?.id?.total_person} Person
                </div>
              ) : (
                ""
              )}
              <div className="border-b border-slate-300 mt-5"></div>
              <div className="mt-8 text-lg">{roomData?.id?.description}</div>
            </div>
          </Grid>
        </Grid>
        <div className="App-container mt-14">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyC7Jz78vSl5-mHKv4eBOy1fRhmoph6loMA",
              language: "en",
              region: "US",
            }}
            defaultCenter={{ lat: lat, lng: lng }}
            defaultZoom={15}
            distanceToMouse={distanceToMouse}
          >
            {points.map(({ lat, lng, id }) => {
              return <GoogleMarker lat={lat} lng={lng} text={id} />;
            })}
          </GoogleMapReact>
        </div>
      </div>
      {showConfirmationReserveModal && (
        <ConfirmationReserveModal open={showConfirmationReserveModal} onClose={() => setShowConfirmationReserveModal(false)} sendData={sendData} reserveHandler={() => getUserAllReserveResidence()} />
      )}
      {showResidentProfileModal && <ResidentProfileModal open={showResidentProfileModal} onClose={handleClose} profileData={profileData} />}
    </section>
  );
};
export default Rooms;
