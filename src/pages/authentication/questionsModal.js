import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Api } from "../../utils/Api";
import Grid from "@mui/material/Grid";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CustomImageUpload from "../../components/imageUpload/imageupload";
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
const QuestionsModal = (props) => {
  const { name, email, password } = props;
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState();
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
  const HandlerSignup = async () => {
    if (!gender || !cook || !tidy || !allergies || !pets || !smoke || !preference || !visitors || !image || !social || !bathroom || !shareRoom || !briefDescription) {
      toast.error("Fill all the fields");
    }
    const formData = new FormData();
    formData.append("name", props?.name);
    formData.append("email", props?.email);
    formData.append("password", props?.password);
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
    const response = await Api("post", "sign-up", formData);
    console.log("response", response);
    if (response?.data?.code === 200 || response?.data?.code === 201) {
      setSignUpData(response?.data?.data);
      toast.success("User SignUp Successfully");
      navigate("/login");
    } else {
      toast.error("User SignUp Failed");
    }
  };
  console.log("signupdata", signUpData);
  return (
    <Modal open={props.open} onClose={props.onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" size="md">
      <Box className="modalScrollbar" sx={style}>
        <h1 className="-mt-2 mb-8 text-center font-bold text-xl text-black font-pj">Add Some Basic Information</h1>
        <FormControl fullWidth style={{ marginTop: "10px", marginBottom: "10px" }}>
          <div className="mb-2">Gender</div>
          <TextField id="outlined-multiline-flexible" placeholder="Enter Gender" multiline maxRows={8} className="w-full" value={gender} onChange={(e) => setGender(e.target.value)} />
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
            <MenuItem value={"Yes"} onClick={() => setAllergiesInput(true)}>
              Yes
            </MenuItem>
            <MenuItem value={"No"} onClick={() => setAllergiesInput(false)}>
              No
            </MenuItem>
          </Select>
        </FormControl>
        {allergiesInput && (
          <div>
            <div className="mb-2 mt-2">Which ones?</div>
            <TextField
              id="outlined-multiline-flexible"
              placeholder="Enter type of allergies"
              multiline
              maxRows={8}
              className="w-full"
              value={allergiesDesc}
              onChange={(e) => setAllergiesDesc(e.target.value)}
            />
          </div>
        )}
        <FormControl fullWidth style={{ marginTop: "10px", marginBottom: "10px" }}>
          <div className="mb-2">Pets?</div>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={[pets]} onChange={(e) => setPets(e.target.value)}>
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
          <TextField id="outlined-multiline-flexible" placeholder="Enter Atmosphere Preference" multiline className="w-full" value={preference} onChange={(e) => setPreference(e.target.value)} />
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
          <TextField id="outlined-multiline-flexible" placeholder="Enter share room with" multiline maxRows={8} className="w-full" value={shareRoom} onChange={(e) => setShareRoom(e.target.value)} />
        </FormControl>
        <div className="mb-2 mt-2">Brief description</div>
        <TextField
          id="outlined-multiline-flexible"
          placeholder="Enter Description"
          multiline
          maxRows={8}
          className="w-full"
          value={briefDescription}
          onChange={(e) => setBriefDescription(e.target.value)}
        />
        <div className="mb-2 mt-4">Upload Image</div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <div className="bg-slate-200 h-52 rounded-lg relative">
              <CustomImageUpload handleImageChange={handleImageChange} image={imagePreview} handleImageClose={handleImageClose} />
            </div>
          </Grid>
        </Grid>
        <button
          onClick={HandlerSignup}
          className="flex items-center justify-center w-full px-8 py-4 mt-12 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-gray-600"
        >
          SignUp
        </button>
      </Box>
    </Modal>
  );
};
export default QuestionsModal;
