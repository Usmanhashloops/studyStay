import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
// import { Api } from "../../utils/Api";
import { Api } from "../../../utils/Api";
import Grid from "@mui/material/Grid";

import { jwtDecode } from "jwt-decode";
// import { API_BASE_URL } from "../../../utils/Url";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CustomImageUpload from "../../../components/imageUpload/imageupload";
// import CustomImageUpload from "../../components/imageUpload/imageupload";
import toast from "react-hot-toast";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  overflowY: "scroll",
  p: 4,
};
const UpdateProfileModal = (props) => {
  const { showProfileData, setShowProfileData } = props;
  const navigate = useNavigate();
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
  const handleImageClose = () => {
    setImage(null);
    setImagePreview(null);
  };

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
      props.onClose();
    } else {
      toast.error("Profile Update Failed");
    }
  };
  //   console.log("showProfileData", showProfileData);

  return (
    <Modal open={props.open} onClose={props.onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" size="md">
      <Box className="modalScrollbar" sx={style}>
        <h1 className="-mt-2 mb-8 text-center font-bold text-xl text-black font-pj">Update Profile</h1>
        <div className="mb-2 mt-4">Upload Image</div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <div className="bg-slate-200 h-52 rounded-lg relative">
              <CustomImageUpload handleImageChange={handleImageChange} image={imagePreview} handleImageClose={handleImageClose} />
            </div>
          </Grid>
        </Grid>
        <FormControl fullWidth style={{ marginTop: "10px", marginBottom: "10px" }}>
          <div className="mb-2">Name</div>
          <TextField id="outlined-multiline-flexible" multiline maxRows={8} className="w-full" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl fullWidth style={{ marginTop: "10px", marginBottom: "10px" }}>
          <div className="mb-2">Gender</div>
          <TextField id="outlined-multiline-flexible" multiline maxRows={8} className="w-full" value={gender} onChange={(e) => setGender(e.target.value)} />
        </FormControl>
        <FormControl fullWidth style={{ marginTop: "10px", marginBottom: "10px" }}>
          <div className="mb-2">Do you cook?</div>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={cook} onChange={(e) => setCook(e.target.value)}>
            <MenuItem value={"Yes"}>Yes</MenuItem>
            <MenuItem value={"No"}>No</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginTop: "10px", marginBottom: "10px" }}>
          <div className="mb-2">Are you tidy?</div>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={tidy} onChange={(e) => setTidy(e.target.value)}>
            <MenuItem value={"Yes"}>Yes</MenuItem>
            <MenuItem value={"No"}>No</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginTop: "10px", marginBottom: "10px" }}>
          <div className="mb-2">Allergies?</div>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={allergies} onChange={(e) => setAllergies(e.target.value)}>
            <MenuItem value={"Yes"}>Yes</MenuItem>
            <MenuItem value={"No"}>No</MenuItem>
          </Select>
        </FormControl>
        {showProfileData?.allergies === 1 || showProfileData?.allergies === "Yes" || showProfileData?.allergies === "1" ? (
          <FormControl fullWidth style={{ marginTop: "10px", marginBottom: "10px" }}>
            <div className="mb-2">Which ones?</div>
            <TextField id="outlined-multiline-flexible" multiline className="w-full" value={allergiesDesc} onChange={(e) => setAllergiesDesc(e.target.value)} />
          </FormControl>
        ) : (
          ""
        )}

        <FormControl fullWidth style={{ marginTop: "10px", marginBottom: "10px" }}>
          <div className="mb-2">Pets?</div>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={pets} onChange={(e) => setPets(e.target.value)}>
            <MenuItem value={"Yes"}>Yes</MenuItem>
            <MenuItem value={"No"}>No</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginTop: "10px", marginBottom: "10px" }}>
          <div className="mb-2">Do you smoke?</div>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={smoke} onChange={(e) => setSmoke(e.target.value)}>
            <MenuItem value={"Yes"}>Yes</MenuItem>
            <MenuItem value={"No"}>No</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginTop: "10px", marginBottom: "10px" }}>
          <div className="mb-2">Atmosphere preference?</div>
          <TextField id="outlined-multiline-flexible" multiline className="w-full" value={preference} onChange={(e) => setPreference(e.target.value)} />
        </FormControl>
        <FormControl fullWidth style={{ marginTop: "10px", marginBottom: "10px" }}>
          <div className="mb-2">visitors?</div>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={visitors} onChange={(e) => setVisitors(e.target.value)}>
            <MenuItem value={"Yes"}>Yes</MenuItem>
            <MenuItem value={"No"}>No</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginTop: "10px", marginBottom: "10px" }}>
          <div className="mb-2">Social within the house?</div>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={social} onChange={(e) => setSocial(e.target.value)}>
            <MenuItem value={"Yes"}>Yes</MenuItem>
            <MenuItem value={"No"}>No</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginTop: "10px", marginBottom: "10px" }}>
          <div className="mb-2">Bathroom schedules?</div>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={bathroom} onChange={(e) => setBathroom(e.target.value)}>
            <MenuItem value={"Yes"}>Yes</MenuItem>
            <MenuItem value={"No"}>No</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginTop: "10px", marginBottom: "10px" }}>
          <div className="mb-2">Share Room with?</div>
          <TextField id="outlined-multiline-flexible" multiline maxRows={8} className="w-full" value={shareRoom} onChange={(e) => setShareRoom(e.target.value)} />
        </FormControl>
        <div className="mb-2 mt-2">Brief description</div>
        <TextField id="outlined-multiline-flexible" multiline maxRows={8} className="w-full" value={briefDescription} onChange={(e) => setBriefDescription(e.target.value)} />

        <button
          onClick={HandlerUpdate}
          className="flex items-center justify-center w-full px-8 py-4 mt-12 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-gray-600"
        >
          Update
        </button>
      </Box>
    </Modal>
  );
};
export default UpdateProfileModal;
