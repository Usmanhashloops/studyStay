import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const Slider = ({ images, showRoomNumber }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };
  return (
    <div className="slider-component">
      {showRoomNumber ? (
        <div className="absolute top-4 right-2 text-lg text-white">
          <FormControlLabel control={<Checkbox icon={<FavoriteBorderIcon className="text-blue-700" />} checkedIcon={<FavoriteIcon className="text-red-600" />} />} />
        </div>
      ) : (
        ""
      )}
      <button className="left-icon" onClick={prevSlide}>
        <IoIosArrowBack />
      </button>
      {images[currentIndex].image}
      <button className="right-icon" onClick={nextSlide}>
        <IoIosArrowForward />
      </button>
      {showRoomNumber ? <div className="absolute bottom-8 text-lg text-white">Room {currentIndex + 1}</div> : ""}
    </div>
  );
};

export default Slider;
