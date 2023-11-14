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
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const images = [
  {
    image: <img src={bgBanner} alt="logo1" className="img" />,
  },
  {
    image: <img src={bgBanner2} alt="logo3" className="img" />,
  },
  {
    image: <img src={roomBackground} alt="logo4" className="img" />,
  },
  {
    image: <img src={banner} alt="logo4" className="img" />,
  },
  {
    image: <img src={banner1} alt="logo4" className="img" />,
  },
  {
    image: <img src={banner2} alt="logo4" className="img" />,
  },
  {
    image: <img src={banner3} alt="logo4" className="img" />,
  },
];
const Apartments = () => {
  const navigate = useNavigate();
  const apartmentslider = ["", "", "", "", "", ""];
  const [startIndex, setStartIndex] = useState(0);
  const length = images.length;
  const imagesSlider = [
    {
      image: (
        <img
          src={bgBanner}
          alt="logo1"
          style={{ height: "280px", width: "100%", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", cursor: "pointer", cursor: "pointer" }}
          onClick={() => navigate("/rooms")}
        />
      ),
    },
    {
      image: (
        <img
          src={bgBanner2}
          alt="logo3"
          style={{ height: "280px", width: "100%", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", cursor: "pointer" }}
          onClick={() => navigate("/rooms")}
        />
      ),
    },
    {
      image: (
        <img
          src={roomBackground}
          alt="logo4"
          style={{ height: "280px", width: "100%", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", cursor: "pointer" }}
          onClick={() => navigate("/rooms")}
        />
      ),
    },
    {
      image: (
        <img
          src={banner}
          alt="logo4"
          style={{ height: "280px", width: "100%", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", cursor: "pointer" }}
          onClick={() => navigate("/rooms")}
        />
      ),
    },
    {
      image: (
        <img
          src={banner1}
          alt="logo4"
          style={{ height: "280px", width: "100%", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", cursor: "pointer" }}
          onClick={() => navigate("/rooms")}
        />
      ),
    },
    {
      image: (
        <img
          src={banner2}
          alt="logo4"
          style={{ height: "280px", width: "100%", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", cursor: "pointer" }}
          onClick={() => navigate("/rooms")}
        />
      ),
    },
    {
      image: (
        <img
          src={banner3}
          alt="logo4"
          style={{ height: "280px", width: "100%", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", cursor: "pointer" }}
          onClick={() => navigate("/rooms")}
        />
      ),
    },
  ];
  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 6));
  };
  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex < images.length - 6 ? prevIndex + 1 : 0));
  };
  return (
    <section class="py-12 bg-neutral-50 sm:py-16 lg:py-17">
      <div class="px-2 mx-auto sm:px-6 lg:px-0 max-w-7xl">
        <div className=" text-xl font-pj text-slate-500 font-bold">Searched value</div>
        <div className=" text-lg text-slate-500  font-bold font-pj text-center mt-6">Flash Opportunity</div>
        {/* big Screen flash opportunities slider like tablet,pc or large pc */}
        <div className="app mt-6 mb-12">
          <div className="slider">
            <button className="nav-button" onClick={handlePrev}>
              <IoIosArrowBack className="ml-2" />
            </button>
            <div className="image-container">
              {images.slice(startIndex, startIndex + 6).map((img, index) => (
                <div className=" img-slider" key={index}>
                  {img?.image}
                </div>
              ))}
            </div>
            <button className="nav-button-right" onClick={handleNext}>
              <IoIosArrowForward className="ml-2" />
            </button>
          </div>
        </div>
        {/* small Screen flash opportunities slider like Mobile phone */}
        <div className="app mb-12">
          <div className="slider-small">
            <button className="nav-button" onClick={handlePrev}>
              <IoIosArrowBack className="ml-2" />
            </button>
            <div className="image-container">
              {images.slice(startIndex, startIndex + 3).map((img, index) => (
                <div className=" img-slider" key={index}>
                  {img?.image}
                </div>
              ))}
            </div>
            <button className="nav-button-right" onClick={handleNext}>
              <IoIosArrowForward className="ml-2" />
            </button>
          </div>
        </div>
        <div className=" text-lg text-slate-500 font-bold font-pj text-center pt-2 mb-3">Featured Opportunity</div>
        <Grid container spacing={2}>
          {apartmentslider.map((item, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <div className="bg-slate-200  rounded-lg mt-4">
                <Slider images={imagesSlider} />
                <div className="flex justify-between px-3 py-2">
                  <div className="font-bold text-sm">$20 - $60</div>
                  <div className="">
                    <div className="text-sm ">100 meters 25m ( Metro Bus)</div>
                    <div className=" text-sm text-right mt-1 ">1/4</div>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  );
};
export default Apartments;
