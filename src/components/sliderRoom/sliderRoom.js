import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IMAGE_BASE_URL } from "../../utils/Url";
import { useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
const SliderRoom = ({ images, imageDummy, showRoomNumber, valueUpdated }) => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    if (images && images.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };
  const prevSlide = () => {
    if (images && images.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    }
  };
  if (!images || images.length === 0) {
    return null;
  }

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
      <img
        src={images[currentIndex].images ? IMAGE_BASE_URL + images[currentIndex].images : imageDummy[currentIndex].imageDummy}
        alt={`Image ${currentIndex + 1}`}
        style={{
          height: "434px",
          width: "100%",
          objectFit: "cover",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      />
      <button className="right-icon" onClick={nextSlide}>
        <IoIosArrowForward />
      </button>
      {showRoomNumber ? <div className="absolute bottom-8 text-lg text-white capitalize">{valueUpdated?.resident_type}</div> : ""}
    </div>
  );
};

export default SliderRoom;
