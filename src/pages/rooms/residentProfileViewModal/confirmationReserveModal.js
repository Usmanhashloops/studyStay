import React from "react";
// import bgBanner from "../../../assets/bgBanner.jpg";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import SuccessfullModal from "./successfullModal";
import { Api } from "../../../utils/Api";
import toast from "react-hot-toast";
import { useState } from "react";
const ConfirmationReserveModal = (props) => {
  const navigate = useNavigate();
  const { open, onClose, sendData } = props;
  const [showSuccessfullModal, setShowSuccessfullModal] = useState(false);
  const localData = localStorage.getItem("auth-token");
  console.log("--023-0-30", localData);
  const handlerReserveResidence = async () => {
    if (localData) {
      const response = await Api("post", `reserve-residence/${sendData?.id?.id}`);
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Reserved Successfully");
        onClose();
        setShowSuccessfullModal(true);
      } else {
        toast.error("Already reserved");
        onClose();
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div className="modal_confirmation">
            <div className="w-full max-w-sm rounded-lg">
              <div className="-mt-1">
                <p className="mt-3 text-lg font-medium text-center text-gray-500">Are you sure you want to Reserve this Residence?</p>
                <div className="flex items-center mt-10 space-x-4 justify-center">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-6 py-2 text-sm font-bold leading-5 text-white transition-all duration-200 bg-red-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-slate-500"
                    onClick={() => {
                      handlerReserveResidence();
                      setShowSuccessfullModal(true);
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-6 py-2 text-sm font-bold leading-5 text-black transition-all duration-200 bg-slate-400 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-slate-500"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
      {showSuccessfullModal && <SuccessfullModal open={showSuccessfullModal} onClose={() => setShowSuccessfullModal(false)} />}
    </Dialog>
  );
};
export default ConfirmationReserveModal;
ConfirmationReserveModal.defaultProps = {
  open: "false",
};
