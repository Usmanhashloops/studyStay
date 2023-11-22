import React, { useEffect, useState } from "react";
import imageProfile from "../../assets/avatar.jpg";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
// import { Api } from "../../utils/Api";
import { BsPencil } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { Api } from "../../utils/Api";
import toast from "react-hot-toast";
import { IoIosAddCircle } from "react-icons/io";
import { IMAGE_BASE_URL } from "../../utils/Url";
import { useNavigate } from "react-router-dom";
import UpdateProfileModal from "./modal/updateProfileModal";
import { jwtDecode } from "jwt-decode";
import CustomImageUpload from "../../components/imageUpload/imageupload";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const Profile = () => {
  const navigate = useNavigate();
  const [showUpdateProfileModal, setShowUpdateProfileModal] = React.useState(false);
  const handlerModalClose = () => setShowUpdateProfileModal(false);
  const [showProfileData, setShowProfileData] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [cook, setCook] = useState("");
  const [tidy, setTidy] = useState("");
  const [allergies, setAllergies] = useState("");
  const [allergiesDesc, setAllergiesDesc] = useState("");
  const [allergiesInput, setAllergiesInput] = useState(false);
  const [pets, setPets] = useState("");
  const [smoke, setSmoke] = useState("");
  const [visitors, setVisitors] = useState("");
  const [social, setSocial] = useState("");
  const [preference, setPreference] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [shareRoom, setShareRoom] = useState("");
  const [briefDescription, setBriefDescription] = useState("");
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const handleImageClose = () => {
    setImage(null);
    setImagePreview(null);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getProfileData = async () => {
    const response = await Api("get", `profile-get/${decoded?.sub}`);
    if (response?.data?.code === 200 || response?.data?.code === 201) {
      setShowProfileData(response?.data?.data);
    }
  };
  useEffect(() => {
    getProfileData();
  }, []);
  useEffect(() => {
    if (showProfileData) {
      setName(showProfileData?.name);
      setEmail(showProfileData?.email);
      setGender(showProfileData?.gender);
      setCook(showProfileData?.do_you_cook == "1" ? "Yes" : "No");
      setTidy(showProfileData?.are_you_tidy == "1" ? "Yes" : "No");
      setAllergies(showProfileData?.allergies == "1" ? "Yes" : "No");
      setAllergiesDesc(showProfileData?.which_one);
      setPets(showProfileData?.pets == "1" ? "Yes" : "No");
      setVisitors(showProfileData?.visitors == "1" ? "Yes" : "No");
      setSocial(showProfileData?.social_within_the_house == "1" ? "Yes" : "No");
      setSmoke(showProfileData?.do_you_smoke == "1" ? "Yes" : "No");
      setPreference(showProfileData?.atmosphere_perference);
      setBathroom(showProfileData?.bathroom_schedules == "1" ? "Yes" : "No");
      setShareRoom(showProfileData?.prefer_to_share_with);
      setBriefDescription(showProfileData?.description);
      setImage(showProfileData?.image);
    }
  }, [showProfileData]);

  const localStorageData = localStorage.getItem("auth-token");
  const decoded = jwtDecode(localStorageData);
  console.log("decoded", decoded);
  const HandlerUpdate = async () => {
    // if (!gender || !cook || !tidy || !allergies || !pets || !smoke || !preference || !visitors || !image || !social || !bathroom || !shareRoom || !briefDescription) {
    //   toast.error("Fill all the fields");
    // }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("gender", gender);
    formData.append("do_you_cook", cook == "Yes" ? 1 : 0);
    formData.append("are_you_tidy", tidy == "Yes" ? 1 : 0);
    formData.append("allergies", allergies == "Yes" ? 1 : 0);
    formData.append("which_one", allergiesDesc);
    formData.append("pets", pets == "Yes" ? 1 : 0);
    formData.append("do_you_smoke", smoke == "Yes" ? 1 : 0);
    formData.append("atmosphere_perference", preference);
    formData.append("visitors", visitors == "Yes" ? 1 : 0);
    formData.append("image", image);
    formData.append("social_within_the_house", social == "Yes" ? 1 : 0);
    formData.append("bathroom_schedules", bathroom == "Yes" ? 1 : 0);
    formData.append("prefer_to_share_with", shareRoom);
    formData.append("description", briefDescription);
    const response = await Api("post", `profile-update/${decoded?.sub}`, formData);
    console.log("response", response);
    if (response?.data?.code === 200 || response?.data?.code === 201) {
      setShowProfileData(response?.data?.data);
      toast.success("Profile Update Successfully");
    } else {
      toast.error("Profile Update Failed");
    }
  };
  console.log("showProfileData", showProfileData);
  return (
    <div className="flex flex-col flex-1 xl:pl-56 xl:pr-56">
      <main>
        <div className="py-6 pt-8">
          <div className="px-4 mx-auto sm:px-6 md:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          </div>
          <div className="px-4 mx-auto sm:px-6 md:px-8">
            <div className="space-y-8">
              <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px"></label>
              <div className="sm:mt-0 sm:col-span-2">
                <div className=" relative  flex items-center justify-center">
                  <img className="flex-shrink-0 object-cover w-40 h-40 rounded-full" src={!imagePreview ? IMAGE_BASE_URL + image : imagePreview} alt="" />

                  <div
                    className="cursor-pointer absolute  ml-32 mt-24"
                    // onClick={handleImageClose}
                  >
                    <div className="h-14 w-14 bg-blue-200 rounded-full flex justify-center items-center">
                      <label htmlFor="fileInputt">
                        <BsPencil className="h-7 w-7 text-black" />
                      </label>
                    </div>
                  </div>
                  <input type="file" multiple accept="image/*" id="fileInputt" style={{ display: "none" }} onChange={handleImageChange} />
                  {/* <div className="bg-slate-200 h-52 w-52 rounded-full relative">
                    <CustomImageUpload handleImageChange={handleImageChange} image={imagePreview} handleImageClose={handleImageClose} />
                  </div> */}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 sm:items-center flex items-center justify-center">
                <div>
                  <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                    {" "}
                    Name{" "}
                  </label>
                  <div className="mt-4 sm:col-span-2">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className=" capitalize border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    />
                  </div>
                </div>
                <div>
                  <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                    {" "}
                    Email{" "}
                  </label>
                  <div className="mt-4 sm:col-span-2">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      value={email}
                      // onChange={(e) => setEmail(e.target.value)}
                      className="disable border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    />
                  </div>
                </div>
                <FormControl fullWidth>
                  <div className="mb-2 font-semibold font-pj text-base">Gender</div>
                  <FormControl>
                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={gender} onChange={(e) => setGender(e.target.value)}>
                      <FormControlLabel value="Male" control={<Radio size="small" />} label="Male" />
                      <FormControlLabel value="Female" control={<Radio size="small" />} label="Female" />
                      <FormControlLabel value="Other" control={<Radio size="small" />} label="Other" />
                    </RadioGroup>
                  </FormControl>
                </FormControl>
                <FormControl fullWidth>
                  <div className="mb-2  font-semibold font-pj text-base">Do you cook?</div>
                  <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={cook} onChange={(e) => setCook(e.target.value)}>
                    <FormControlLabel value="Yes" control={<Radio size="small" />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio size="small" />} label="No" />
                  </RadioGroup>
                </FormControl>
                <FormControl fullWidth>
                  <div className="mb-2  font-semibold font-pj text-base">Are you tidy?</div>
                  <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={tidy} onChange={(e) => setTidy(e.target.value)}>
                    <FormControlLabel value="Yes" control={<Radio size="small" />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio size="small" />} label="No" />
                  </RadioGroup>
                </FormControl>
                <FormControl fullWidth>
                  <div className="mb-2  font-semibold font-pj text-base">Pets?</div>
                  <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={pets} onChange={(e) => setPets(e.target.value)}>
                    <FormControlLabel value="Yes" control={<Radio size="small" />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio size="small" />} label="No" />
                  </RadioGroup>
                </FormControl>
                <FormControl fullWidth>
                  <div className="mb-2  font-semibold font-pj text-base">Do you smoke?</div>
                  <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={smoke} onChange={(e) => setSmoke(e.target.value)}>
                    <FormControlLabel value="Yes" control={<Radio size="small" />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio size="small" />} label="No" />
                  </RadioGroup>
                </FormControl>
                <FormControl fullWidth>
                  <div className="mb-2  font-semibold font-pj text-base">visitors?</div>
                  <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={visitors} onChange={(e) => setVisitors(e.target.value)}>
                    <FormControlLabel value="Yes" control={<Radio size="small" />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio size="small" />} label="No" />
                  </RadioGroup>
                </FormControl>
                <FormControl fullWidth>
                  <div className="mb-2  font-semibold font-pj text-base">Social within the house?</div>
                  <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={social} onChange={(e) => setSocial(e.target.value)}>
                    <FormControlLabel value="Yes" control={<Radio size="small" />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio size="small" />} label="No" />
                  </RadioGroup>
                </FormControl>
                <FormControl fullWidth>
                  <div className="mb-2  font-semibold font-pj text-base">Bathroom schedules?</div>
                  <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={bathroom} onChange={(e) => setBathroom(e.target.value)}>
                    <FormControlLabel value="Yes" control={<Radio size="small" />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio size="small" />} label="No" />
                  </RadioGroup>
                </FormControl>
                <FormControl fullWidth>
                  <div className="mb-2  font-semibold font-pj text-base">Allergies?</div>
                  <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={allergies} onChange={(e) => setAllergies(e.target.value)}>
                    <FormControlLabel value="Yes" control={<Radio size="small" />} label="Yes" onClick={() => setAllergiesInput(true)} />
                    <FormControlLabel value="No" control={<Radio size="small" />} label="No" onClick={() => setAllergiesInput(false)} />
                  </RadioGroup>
                </FormControl>
                {allergiesInput && (
                  <div>
                    <div className="mb-2  font-semibold font-pj text-base mt-2">Which ones?</div>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      value={allergiesDesc}
                      onChange={(e) => setAllergiesDesc(e.target.value)}
                      className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    />
                  </div>
                )}

                <FormControl fullWidth>
                  <div className="mb-2  font-semibold font-pj text-base">Atmosphere preference?</div>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    value={preference}
                    onChange={(e) => setPreference(e.target.value)}
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  />
                </FormControl>

                <FormControl fullWidth>
                  <div className="mb-2  font-semibold font-pj text-base">Share Room with?</div>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    value={shareRoom}
                    onChange={(e) => setShareRoom(e.target.value)}
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <div className="mb-2  font-semibold font-pj text-base ">Brief description</div>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    value={briefDescription}
                    onChange={(e) => setBriefDescription(e.target.value)}
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  />
                </FormControl>
              </div>
            </div>

            <div className="mt-6 sm:mt-12">
              <button
                onClick={HandlerUpdate}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
              >
                Update
              </button>
            </div>
            {/* {showUpdateProfileModal && <UpdateProfileModal open={showUpdateProfileModal} onClose={handlerModalClose} showProfileData={showProfileData} setShowProfileData={setShowProfileData} />} */}
          </div>
        </div>
      </main>
    </div>
  );
};
export default Profile;
{
  /* <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                  {" "}
                  Gender{" "}
                </label>
                <div className="mt-2 sm:mt-0 sm:col-span-2">
                  <input
                    type="email"
                    name=""
                    id=""
                    placeholder=""
                    value={showProfileData?.gender}
                    className="capitalize border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                  {" "}
                  Do you cook?{" "}
                </label>
                <div className="mt-2 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    value={showProfileData?.do_you_cook == "1" ? "Yes" : "No"}
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                  {" "}
                  Are you tidy?{" "}
                </label>
                <div className="mt-2 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    value={showProfileData?.are_you_tidy == "1" ? "Yes" : "No"}
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                  {" "}
                  Allergies?{" "}
                </label>
                <div className="mt-2 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    value={showProfileData?.allergies == "1" ? "Yes" : "No"}
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  />
                </div>
              </div>
              {showProfileData?.allergies === 1 || showProfileData?.allergies === "Yes" ? (
                <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                  <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                    {" "}
                    Which ones?{" "}
                  </label>
                  <div className="mt-2 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      value={showProfileData?.which_one}
                      className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    />
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                  {" "}
                  Pets?{" "}
                </label>
                <div className="mt-2 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    value={showProfileData?.pets == "1" ? "Yes" : "No"}
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                  {" "}
                  Do you smoke?{" "}
                </label>
                <div className="mt-2 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    value={showProfileData?.do_you_smoke == "1" ? "Yes" : "No"}
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                  {" "}
                  Atmosphere preference?{" "}
                </label>
                <div className="mt-2 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    value={showProfileData?.atmosphere_perference}
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                  {" "}
                  Visitors?{" "}
                </label>
                <div className="mt-2 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    value={showProfileData?.visitors == "1" ? "Yes" : "No"}
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                  {" "}
                  Social within the house?{" "}
                </label>
                <div className="mt-2 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    value={showProfileData?.social_within_the_house == "1" ? "Yes" : "No"}
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                  {" "}
                  Bathroom schedules?{" "}
                </label>
                <div className="mt-2 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    value={showProfileData?.bathroom_schedules == "1" ? "Yes" : "No"}
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                  {" "}
                  Who would you prefer to share with?{" "}
                </label>
                <div className="mt-2 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    value={showProfileData?.prefer_to_share_with}
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  />
                </div>
              </div>
              <div className="pb-6 sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                <label for="" className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">
                  {" "}
                  Brief description{" "}
                </label>
                <div className="mt-2 sm:mt-0 sm:col-span-2">
                  <textarea
                    name=""
                    id=""
                    placeholder={showProfileData?.description}
                    value=""
                    rows="4"
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg resize-y focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    spellcheck="false"
                  ></textarea>
                </div>
              </div> */
}
