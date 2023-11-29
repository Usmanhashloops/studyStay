import React from "react";
import { useState, useEffect } from "react";
import bgBanner from "../../assets/bgBanner.jpg";
import Grid from "@mui/material/Grid";
import SliderRoom from "../../components/sliderRoom/sliderRoom";
import CustomRoomImageUpload from "../../components/imageUpload/roomImageUpload";
import ResidentProfileModal from "./residentProfileViewModal/residentProfileModal";
import { Api } from "../../utils/Api";
import toast from "react-hot-toast";
import GoogleIcon from "../../assets/avatar.jpg";
import { useLocation } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../utils/Url";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationReserveModal from "./residentProfileViewModal/confirmationReserveModal";
const Rooms = () => {
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

  const visibleImages = roomData?.images.slice(startIndex, endIndex + 1);
  useEffect(() => {
    getAllReserveResidenceData();
  }, []);
  useEffect(() => {
    getResidenceById();
  }, []);
  const getAllReserveResidenceData = async () => {
    const response = await Api("get", "show-reserve-residence");
    // console.log("response", response);
    if (response?.status === 200 || response?.status == 201) {
      setAllReserveResidenceData(response?.data?.data?.data);
    }
  };
  const getResidenceById = async () => {
    const response = await Api("get", `get-residence/${roomData?.id?.id}`);
    console.log("response", response);
    if (response?.status === 200 || response?.status == 201) {
      setResidenceDataByID(response?.data?.data);
    }
  };
  console.log("residenceDataByID", residenceDataByID);
  console.log("sendData", sendData);

  const lat = Number(roomData?.id?.latitude);
  const lng = Number(roomData?.id?.longitude);
  console.log("lat", lat);
  console.log("lng", lng);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC7Jz78vSl5-mHKv4eBOy1fRhmoph6loMA",
  });
  const center = useMemo(() => ({ lat: lat, lng: lng }), []);
  const customMarker = {
    path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
    fillColor: "red",
    fillOpacity: 0.8, // Adjusted fillOpacity
    strokeWeight: 1,
    rotation: 0,
    scale: 1,
  };

  return (
    <section class="py-8 bg-neutral-50 sm:py-16 lg:py-12">
      <div class="px-2 mx-auto sm:px-6 lg:px-0 max-w-7xl pt-6">
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
                  <a
                    onClick={() => {
                      setShowConfirmationReserveModal(true);
                      setSendData(roomData);
                    }}
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
                </nav>
                <Grid container spacing={2}>
                  <Grid item xs={9} sm={7} md={7}>
                    <div className="text-lg text-black  font-bold  pb-3 mt-6">Residents</div>
                    {roomData &&
                      roomData?.history?.map((item, i) => (
                        <div
                          className="flex mb-2"
                          key={i}
                          onClick={() => {
                            setshowResidentProfileModal(true);
                            setProfileData(item);
                          }}
                        >
                          <img src={IMAGE_BASE_URL + item?.user_id?.image} className="imageIcon" />
                          <div className="mt-2 ml-2  text-sm text-black capitalize cursor-pointer"> {item?.user_id?.name} </div>
                        </div>
                      ))}
                    {roomData?.history ? "" : <div className="mt-3 text-base text-black capitalize cursor-pointer"> No Resident Exist </div>}
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
          {!isLoaded ? (
            <h1>Loading...</h1>
          ) : (
            <GoogleMap mapContainerClassName="map-container" center={center} zoom={15}>
              <Marker position={{ lat: lat, lng: lng }}>
                <img src={GoogleIcon} />
              </Marker>
            </GoogleMap>
          )}
        </div>
      </div>
      {showConfirmationReserveModal && <ConfirmationReserveModal open={showConfirmationReserveModal} onClose={() => setShowConfirmationReserveModal(false)} sendData={sendData} />}
      {showResidentProfileModal && <ResidentProfileModal open={showResidentProfileModal} onClose={handleClose} profileData={profileData} />}
    </section>
  );
};
export default Rooms;
