import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
function CustomImageUpload(props) {
  const { handleImageChange, image, handleImageClose } = props;
  // const [image, setImage] = useState(null);
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  return (
    <div>
      {image ? (
        <div>
          <RxCrossCircled className="absolute text-red-600 h-6 w-6 right-1 top-1 cursor-pointer" onClick={handleImageClose} />
          <img src={image} alt="Preview" className="h-52 w-full rounded-lg  " />
        </div>
      ) : (
        <div className="flex justify-center items-center h-52">
          <label htmlFor="fileInput" className="cursor-pointer">
            <IoIosAddCircle size={66} color=" rgb(161 161 170)" />
          </label>
          <input type="file" accept="image/*" id="fileInput" style={{ display: "none" }} onChange={handleImageChange} />
        </div>
      )}
    </div>
  );
}
export default CustomImageUpload;
