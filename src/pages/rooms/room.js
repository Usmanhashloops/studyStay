import React from "react";
import { useState, useEffect } from "react";
import bgBanner from "../../assets/bgBanner.jpg";
import Grid from "@mui/material/Grid";
import SliderRoom from "../../components/sliderRoom/sliderRoom";
import CustomRoomImageUpload from "../../components/imageUpload/roomImageUpload";
import ResidentProfileModal from "./residentProfileViewModal/residentProfileModal";
import { Api } from "../../utils/Api";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../utils/Url";

const Rooms = () => {
  const numbers = ["", "", "", ""];
  const residents = ["", "", ""];
  const location = useLocation();
  const [showResidentProfileModal, setshowResidentProfileModal] = useState(false);
  const handleOpen = () => setshowResidentProfileModal(true);
  const handleClose = () => setshowResidentProfileModal(false);
  const [allReserveResidenceData, setAllReserveResidenceData] = useState();
  const [roomData, setRoomData] = useState(location.state.roomData);
  const [profileData, setProfileData] = useState();
  const [showRoomNumber, setshowRoomNumber] = useState(true);
  useEffect(() => {
    getAllReserveResidenceData();
  }, []);
  const getAllReserveResidenceData = async () => {
    const response = await Api("get", "show-reserve-residence");
    console.log("response", response);
    if (response?.status === 200 || response?.status == 201) {
      setAllReserveResidenceData(response?.data?.data?.data);
    }
  };
  console.log("roomData", roomData);
  const handlerReserveResidence = async () => {
    const response = await Api("post", `reserve-residence/${roomData?.id?.id}`);
    console.log("response", response);
    if (response?.status === 200 || response?.status === 201) {
      toast.success("Reserved Successfully");
    } else {
      toast.error("Already reserved");
    }
  };
  return (
    <section class="py-8 bg-neutral-50 sm:py-16 lg:py-12">
      <div class="px-2 mx-auto sm:px-6 lg:px-0 max-w-7xl">
        <nav class="flex lg:space-x-6t pb-12">
          <a
            title=""
            class="
        inline-flex
        items-center
        justify-center
        px-7
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
            Common Areas
          </a>
          <a
            title=""
            class="
        inline-flex
        items-center
        justify-center
        px-7
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
        ml-2
    "
            role="button"
          >
            Rooms
          </a>
        </nav>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={8}>
            <div className="bg-slate-200  rounded-lg">
              <SliderRoom images={roomData?.images} showRoomNumber={showRoomNumber} />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Grid container spacing={2}>
              {numbers.map((item, i) => (
                <Grid item xs={12} sm={6} md={6} key={i}>
                  <div className="bg-slate-200  rounded-lg relative  h-52">
                    <CustomRoomImageUpload />
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={8}>
            <div className="mt-8">
              <div className="text-lg text-slate-600 mb-2">Description</div>
              <div className=" bg-slate-200  rounded-lg px-4 py-4 pb-4 scrollRemove" style={{ height: "180px", overflow: "auto" }}>
                {roomData?.id?.description}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className="mt-8">
              <div className="text-lg text-slate-600 mb-2">Residents & Room Capacity</div>
              <div className=" bg-slate-200  rounded-lg px-4 py-4 pb-4 scrollRemove" style={{ height: "180px", overflow: "auto" }}>
                <Grid container spacing={2}>
                  <Grid item xs={9} sm={9} md={9}>
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
                    {/* <div className="text-sm text-blue-600 font-semibold ml-9 mt-4  cursor-pointer" onClick={handleOpen}>
                      See More
                    </div> */}
                  </Grid>
                  <Grid item xs={3} sm={3} md={3}>
                    <div className="mt-3 text-right text-sm font-semibold text-slate-700">
                      {roomData?.id?.remaining_person}/{roomData?.id?.total_person}
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
        <nav class="fixed right-10 bottom-4">
          <a
            onClick={handlerReserveResidence}
            className="
        inline-flex
        items-center
        justify-center
        px-3
        py-2
        text-base
        font-semibold
        leading-7
        transition-all
        duration-200
        bg-slate-400
        shadow-xl
        rounded-xl
        font-pj
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
        hover:hover:text-white
        focus: focus:text-white
    "
            role="button"
          >
            Reserve Residence
          </a>
        </nav>
      </div>
      {showResidentProfileModal && <ResidentProfileModal open={showResidentProfileModal} onClose={handleClose} profileData={profileData} />}
    </section>
  );
};
export default Rooms;
