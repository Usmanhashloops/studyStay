import React from "react";
import { useState } from "react";
import bgBanner from "../../assets/bgBanner.jpg";
import bgBanner2 from "../../assets/bgBanner2.jpg";
import roomBackground from "../../assets/roomBackground.jpg";
import banner from "../../assets/banner.jpg";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import Grid from "@mui/material/Grid";
import Slider from "../../components/slider/slider";
import CustomImageUpload from "../../components/imageUpload/imageupload";
import ResidentProfileModal from "./residentProfileViewModal/residentProfileModal";
import { Api } from "../../utils/Api";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
const imagesSlider = [
  {
    image: <img src={bgBanner} alt="logo1" style={{ height: "434px", width: "100%", objectFit: "cover", borderRadius: "10px" }} />,
  },
  {
    image: <img src={bgBanner2} alt="logo3" style={{ height: "434px", width: "100%", objectFit: "cover", borderRadius: "10px" }} />,
  },
  {
    image: <img src={roomBackground} alt="logo4" style={{ height: "434px", width: "100%", objectFit: "cover", borderRadius: "10px" }} />,
  },
  {
    image: <img src={banner} alt="logo4" style={{ height: "434px", width: "100%", objectFit: "cover", borderRadius: "10px" }} />,
  },
  {
    image: <img src={banner1} alt="logo4" style={{ height: "434px", width: "100%", objectFit: "cover", borderRadius: "10px" }} />,
  },
  {
    image: <img src={banner2} alt="logo4" style={{ height: "434px", width: "100%", objectFit: "cover", borderRadius: "10px" }} />,
  },
  {
    image: <img src={banner3} alt="logo4" style={{ height: "434px", width: "100%", objectFit: "cover", borderRadius: "10px" }} />,
  },
];
const Rooms = () => {
  const numbers = ["", "", "", ""];
  const residents = ["", "", ""];
  const [showResidentProfileModal, setshowResidentProfileModal] = useState(false);
  const handleOpen = () => setshowResidentProfileModal(true);
  const handleClose = () => setshowResidentProfileModal(false);
  const [showRoomNumber, setshowRoomNumber] = useState(true);
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClose = () => {
    setImage(null);
  };
  const localData = localStorage.getItem("auth-token");
  const decoded = jwtDecode(localData);
  console.log(decoded);
  const handlerBookResidence = async () => {
    const response = await Api("post", `book-residence/${decoded?.sub}`);
    console.log("response", response);
    if (response?.status === 200 || response?.status === 201) {
      toast.success(response?.data?.message);
    } else {
      toast.error(response?.data?.message);
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
              <Slider images={imagesSlider} showRoomNumber={showRoomNumber} />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Grid container spacing={2}>
              {numbers.map((item, i) => (
                <Grid item xs={12} sm={6} md={6} key={i}>
                  <div className="bg-slate-200 h-52 rounded-lg relative">
                    <CustomImageUpload handleImageChange={handleImageChange} image={image} handleImageClose={handleImageClose} />
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
              <div className=" bg-slate-200  rounded-lg px-4 py-4" style={{ minHeight: "180px" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className="mt-8">
              <div className="text-lg text-slate-600 mb-2">Residents & Room Capacity</div>
              <div className=" bg-slate-200  rounded-lg px-4 py-4" style={{ minHeight: "180px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={9} sm={9} md={9}>
                    {residents.map((item, i) => (
                      <div className="flex mb-2" key={i}>
                        <img src={bgBanner} className="imageIcon" />
                        <div className="mt-2 ml-2  text-sm text-black ">Mian Usman Ahmad</div>
                      </div>
                    ))}
                    <div className="text-sm text-blue-600 font-semibold ml-9 mt-4  cursor-pointer" onClick={handleOpen}>
                      See More
                    </div>
                  </Grid>
                  <Grid item xs={3} sm={3} md={3}>
                    <div className="mt-3 text-right text-sm font-semibold text-slate-700">3/4</div>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
        <nav class="fixed right-10 bottom-10">
          <a
            onClick={handlerBookResidence}
            className="
        inline-flex
        items-center
        justify-center
        px-3
        py-1
        text-base
        font-semibold
        leading-7
        transition-all
        duration-200
        bg-slate-400
        border border-gray-900
        rounded-xl
        font-pj
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
        hover:hover:text-white
        focus: focus:text-white
        
    "
            role="button"
          >
            Book Residence
          </a>
        </nav>
      </div>
      {showResidentProfileModal && <ResidentProfileModal open={showResidentProfileModal} onClose={handleClose} />}
    </section>
  );
};
export default Rooms;
