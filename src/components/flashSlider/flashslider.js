import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IMAGE_BASE_URL } from "../../utils/Url";
import { useNavigate } from "react-router-dom";
const FlashSlider = ({ images, imageDummy, item }) => {
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
      <button className="left-icon" onClick={prevSlide}>
        <IoIosArrowBack />
      </button>
      <img
        src={images[currentIndex].images ? IMAGE_BASE_URL + images[currentIndex].images : imageDummy[currentIndex].imageDummy}
        alt={`Image ${currentIndex + 1}`}
        style={{
          height: "180px",
          width: "100%",
          objectFit: "cover",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/rooms`, { state: { roomData: item } })}
      />
      <button className="right-icon" onClick={nextSlide}>
        <IoIosArrowForward />
      </button>
    </div>
  );
};
export default FlashSlider;
