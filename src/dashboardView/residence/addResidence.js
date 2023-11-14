import React, { useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import Button from "../../components/button";
import { toast } from "react-hot-toast";
import { Api } from "../../utils/Api";
import { useNavigate } from "react-router-dom";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Grid from "@mui/material/Grid";
import CustomImageUpload from "../../components/imageUpload/imageupload";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
const AddResidence = (props) => {
  const navigate = useNavigate();
  const [flatName, setFlatName] = useState("");
  const [price, setPrice] = useState("");
  const [person, setPerson] = useState("");
  const [residenceName, setResidenceName] = useState("");
  const [residenceType, setResidenceType] = useState("");
  const [image, setImage] = useState();
  const [openRoom, setOpenRoom] = useState(false);
  const [openApartments, setOpenApartments] = useState(false);
  const [residenceData, setResidenceData] = useState({});
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const apiKey = "AIzaSyC7Jz78vSl5-mHKv4eBOy1fRhmoph6loMA";

  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setCoordinates(latLng);
      setAddress(selectedAddress); // Update the input field value
    } catch (error) {
      console.error("Error while fetching coordinates:", error);
    }
  };
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
  const HandlerAddResidence = async () => {
    const formData = new FormData();
    formData.append("flate_name", flatName);
    formData.append("resident_type", residenceType);
    formData.append("residence_name", residenceName);
    formData.append("total_person", person);
    formData.append("price", price);
    formData.append("address", address);
    formData.append("images", image);
    formData.append("longitude", coordinates.lng);
    formData.append("latitude", coordinates.lat);

    const response = await Api("post", "add-residence", formData);

    console.log("Add-response", response);
    if (response?.status === 200 || response?.status === 201) {
      setResidenceData(response?.data?.data);
      toast.success(response?.data?.message);
      navigate("/dashboard/residence");
    } else {
      toast.error(response?.data?.message);
    }
  };
  console.log("residenceData", residenceData);
  return (
    <div className="flex flex-col flex-1 ">
      <div className="py-12 bg-white sm:py-16 lg:py-8">
        <div className="px-4 sm:px-6 lg:px-8" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="lg:mt-8 addInventory">
            <div className="sm:px-2 ">
              <div className="text-center text-xl font-semibold lg:-mt-8 mb-3">Add Residence</div>
              <div className="mt-8">
                <div className="grid  sm:grid-cols-2 gap-6">
                  <div className="pt-4">
                    <label for="" className="text-base font-medium text-gray-900 font-pj ">
                      {" "}
                      Flat Name{" "}
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="title"
                        id=""
                        onChange={(e) => setFlatName(e.target.value)}
                        placeholder="Enter Flat Name"
                        className="block w-full px-3 py-3 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                      />
                    </div>
                  </div>
                  <div className="pt-4">
                    <label for="" className="text-base font-medium text-gray-900 font-pj">
                      {" "}
                      Enter Price
                    </label>
                    <div className="mt-2.5 addInput">
                      <input
                        type="text"
                        name="email"
                        id=""
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter Price"
                        className="block w-full px-3 py-3 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                      />
                    </div>
                  </div>
                  <div className="pt-1">
                    <label for="" className="text-base font-medium text-gray-900 font-pj">
                      {" "}
                      Address
                    </label>
                    <div className="mt-2.5 addInput">
                      <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect} searchOptions={{ types: ["geocode"] }}>
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                          <div>
                            <input
                              className="block w-full px-3 py-3 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                              {...getInputProps({
                                placeholder: "Enter address or location",
                              })}
                            />
                            <div className="bg-slate-100 rounded-xl">
                              {loading && <div className=" px-2 py-2">Loading...</div>}
                              {suggestions.map((suggestion) => (
                                <div className=" px-2 py-2" key={suggestion.id}>
                                  <div {...getSuggestionItemProps(suggestion)}>{suggestion.description}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>
                    </div>
                  </div>
                  <div className="pt-1">
                    <div>
                      <label for="" className="text-base font-medium text-gray-900 font-pj">
                        Resident Type
                      </label>
                      <FormControl fullWidth style={{ marginTop: "10px", marginBottom: "10px" }} className="borderRadius">
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={residenceType} onChange={(e) => setResidenceType(e.target.value)} className="borderRadius">
                          <MenuItem
                            value={"room"}
                            onClick={() => {
                              setOpenRoom(!openRoom);
                              setOpenApartments(false);
                            }}
                          >
                            room
                          </MenuItem>
                          <MenuItem
                            value={"appartment"}
                            onClick={() => {
                              setOpenApartments(!openApartments);
                              setOpenRoom(false);
                            }}
                          >
                            appartment
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
                {openRoom && (
                  <div className="max-w-4xl mx-auto mt-8 ">
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="absolute -inset-1">
                          <div className="w-full h-full mx-auto opacity-30 blur-lg filter bg-gradient-to-r from-green-400 to-yellow-400"></div>
                        </div>
                        <div role="region" className="relative overflow-hidden bg-white border border-gray-200 rounded-xl">
                          <h3>
                            <div className="pl-3 pb-4 pr-1 flex items-center justify-between w-full text-left">
                              <div className="grid md:grid-cols-3 gap-6 mt-2">
                                <div className="pt-1">
                                  <label htmlFor="" className="text-base font-medium text-gray-900 font-pj">
                                    {" "}
                                    Room Name
                                  </label>
                                  <div className="mt-2.5 addInput">
                                    <input
                                      type="text "
                                      placeholder="Enter Room Name"
                                      onChange={(e) => setResidenceName(e.target.value)}
                                      className="block w-full px-3 py-3 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                                    />
                                  </div>
                                </div>
                                <div className="pt-1">
                                  <label htmlFor="" className="text-base font-medium text-gray-900 font-pj">
                                    {" "}
                                    Total Person
                                  </label>
                                  <div className="mt-2.5 addInput">
                                    <input
                                      type="number"
                                      name="person"
                                      id=""
                                      onChange={(e) => setPerson(e.target.value)}
                                      placeholder="Enter Total Person"
                                      className="block w-full px-3 py-3 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {openApartments && (
                  <div className="max-w-4xl mx-auto mt-8 ">
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="absolute -inset-1">
                          <div className="w-full h-full mx-auto opacity-30 blur-lg filter bg-gradient-to-r from-green-400 to-yellow-400"></div>
                        </div>
                        <div role="region" className="relative overflow-hidden bg-white border border-gray-200 rounded-xl">
                          <h3>
                            <div className="pl-3 pb-4 pr-1 flex items-center justify-between w-full text-left">
                              <div className="grid md:grid-cols-2 gap-6 mt-2">
                                <div className="pt-1">
                                  <label htmlFor="" className="text-base font-medium text-gray-900 font-pj">
                                    {" "}
                                    Appartment Name
                                  </label>
                                  <div className="mt-2.5 addInput">
                                    <input
                                      type="text "
                                      placeholder="Enter Appartment Name"
                                      onChange={(e) => setResidenceName(e.target.value)}
                                      className="block w-full px-3 py-3 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                                    />
                                  </div>
                                </div>
                                <div className="pt-1">
                                  <label htmlFor="" className="text-base font-medium text-gray-900 font-pj">
                                    {" "}
                                    Total Person
                                  </label>
                                  <div className="mt-2.5 addInput">
                                    <input
                                      type="number"
                                      name="person"
                                      id=""
                                      onChange={(e) => setPerson(e.target.value)}
                                      placeholder="Enter Total Person"
                                      className="block w-full px-3 py-3 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <Grid container spacing={2} sx={{ marginTop: "15px" }}>
                  <Grid item xs={12} sm={6} md={3}>
                    <div className="bg-slate-200 h-52 rounded-lg relative">
                      <CustomImageUpload handleImageChange={handleImageChange} image={imagePreview} imageNext={imagePreview} handleImageClose={handleImageClose} />
                    </div>
                  </Grid>
                </Grid>
                <Button
                  title={"Add"}
                  onClick={HandlerAddResidence}
                  className="flex items-center justify-center  w-full px-8 py-4 mt-12 font-bold text-white transition-all duration-200 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-gray-600 drop-shadow-xl bg-slate-950"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddResidence;
