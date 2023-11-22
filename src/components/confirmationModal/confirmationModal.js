import React from "react";
// import bgBanner from "../../../assets/bgBanner.jpg";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "../button";
import { AiOutlineDelete } from "react-icons/ai";
const ConfirmationModal = (props) => {
  const { open, setOpen, onClick, onClose, onConfirm } = props;
  const residents = ["", "", "", ""];
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div className="modal_confirmation">
            <div className="w-full max-w-sm rounded-lg">
              <div className="-mt-1">
                <div className="text-center">
                  <AiOutlineDelete className="h-6 w-6 text-rose-600 m-auto" />
                </div>
                <p className="mt-6 text-xl font-bold text-center text-gray-900">{props?.title}</p>
                <p className="mt-4 text-lg font-bold text-center text-gray-900">{props?.title1}</p>
                <p className="mt-3 text-sm font-medium text-center text-gray-500">{props?.message}</p>
                <div className="flex items-center mt-10 space-x-4 justify-center">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-6 py-2 text-sm font-bold leading-5 text-black transition-all duration-200 bg-slate-400 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-slate-500"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-6 py-2 text-sm font-bold leading-5 text-white transition-all duration-200 bg-red-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-slate-500"
                    onClick={() => onClick()}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
export default ConfirmationModal;
ConfirmationModal.defaultProps = {
  open: "false",
};
