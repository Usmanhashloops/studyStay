import React from "react";
import bgBanner from "../../../assets/bgBanner.jpg";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { IMAGE_BASE_URL } from "../../../utils/Url";
import { RxCrossCircled } from "react-icons/rx";
const ResidentProfileModal = (props) => {
  const { profileData } = props;
  console.log("profileData", profileData);
  const residents = ["", "", "", ""];
  return (
    <Dialog open={props.open} onClose={props.onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogContent className="pb-6">
        <DialogContentText id="alert-dialog-description">
          <RxCrossCircled className="absolute text-red-600 h-6 w-6 right-1 top-1 cursor-pointer" onClick={() => props.onClose()} />
          <div className="modal_SeeProfile">
            <div className="font-pj  text-lg text-current font-bold sm:text-center pt-1 mb-3">Detail of Resident</div>
            <div className="flex sm:item-center sm:justify-center mt-6 mb-6 ">
              <img className="flex-shrink-0  object-cover w-40 h-40 rounded-full" src={IMAGE_BASE_URL + profileData?.user_id?.image} alt="" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-3 pb-3 ">
              <div>
                <div className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">Name</div>
                <input
                  disabled
                  value={profileData?.user_id?.name}
                  className=" capitalize border mt-3 block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                />
              </div>

              <div>
                <div className="block text-sm font-bold text-gray-900 font-pj sm:mt-px sm:pt-2">Gender</div>
                <input
                  disabled
                  value={profileData?.user_id?.gender}
                  className=" capitalize border mt-3 block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                />
              </div>
              <div>
                <div className="block text-sm font-bold text-gray-900 font-pj"> Cook</div>
                <input
                  disabled
                  value={profileData?.user_id?.do_you_cook == "1" ? "Yes" : "No"}
                  className=" capitalize border mt-3 block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                />
              </div>
              <div>
                <div className="block text-sm font-bold text-gray-900 font-pj">Tidy</div>
                <input
                  disabled
                  value={profileData?.user_id?.are_you_tidy == "1" ? "Yes" : "No"}
                  className=" capitalize border mt-3 block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                />
              </div>
              <div>
                <div className="block text-sm font-bold text-gray-900 font-pj">Smoke</div>
                <input
                  disabled
                  value={profileData?.user_id?.do_you_smoke == "1" ? "Yes" : "No"}
                  className=" capitalize border mt-3 block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                />
              </div>
              <div>
                <div className="block text-sm font-bold text-gray-900 font-pj">Pets</div>
                <input
                  disabled
                  value={profileData?.user_id?.pets == "1" ? "Yes" : "No"}
                  className=" capitalize border mt-3 block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                />
              </div>
              <div>
                <div className="block text-sm font-bold text-gray-900 font-pj">Social within the house</div>
                <input
                  disabled
                  value={profileData?.user_id?.social_within_the_house == "1" ? "Yes" : "No"}
                  className=" capitalize border mt-3 block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                />
              </div>
              <div>
                <div className="block text-sm font-bold text-gray-900 font-pj">Visitors</div>
                <input
                  disabled
                  value={profileData?.user_id?.visitors == "1" ? "Yes" : "No"}
                  className=" capitalize border mt-3 block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                />
              </div>
              <div>
                <div className="block text-sm font-bold text-gray-900 font-pj">Bathroom Schedules</div>
                <input
                  disabled
                  value={profileData?.user_id?.bathroom_schedules == "1" ? "Yes" : "No"}
                  className=" capitalize border mt-3 block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                />
              </div>
              <div>
                <div className="block text-sm font-bold text-gray-900 font-pj">Allergies</div>
                <input
                  disabled
                  value={profileData?.user_id?.allergies == "1" ? "Yes" : "No"}
                  className=" capitalize border mt-3 block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                />
              </div>
              {profileData?.user_id?.allergies === 1 || profileData?.user_id?.allergies === "Yes" ? (
                <div>
                  <div className="block text-sm font-bold text-gray-900 font-pj "> Which ones? </div>
                  <input
                    disabled
                    value={profileData?.user_id?.which_one}
                    className="border block w-full px-4 py-3 mt-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  />
                </div>
              ) : (
                ""
              )}
              <div>
                <div className="block text-sm font-bold text-gray-900 font-pj">Atmosphere Perference</div>
                <input
                  disabled
                  value={profileData?.user_id?.atmosphere_perference}
                  className=" capitalize border mt-3 block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                />
              </div>
              <div>
                <div className="block text-sm font-bold text-gray-900 font-pj">Prefer to share with</div>
                <input
                  disabled
                  value={profileData?.user_id?.prefer_to_share_with}
                  className=" capitalize border mt-3 block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                />
              </div>
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
export default ResidentProfileModal;
