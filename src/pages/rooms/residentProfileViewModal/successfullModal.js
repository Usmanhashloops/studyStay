import React from "react";
import Dialog from "@mui/material/Dialog";
import TickImage from "../../../assets/tick.png";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { RxCrossCircled } from "react-icons/rx";
const SuccessfullModal = (props) => {
  const { open, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <RxCrossCircled className="absolute text-red-600 h-6 w-6 right-1 top-1 cursor-pointer" onClick={() => onClose()} />
          <div className="modal_confirmation">
            <div className="w-full max-w-sm rounded-lg">
              <div className="mt-4 mb-8">
                <div className="text-center">
                  <img src={TickImage} className="h-28 w-28 text-rose-600 m-auto" />
                </div>
                <p className="mt-3 text-lg font-bold text-center text-gray-500 pt-6">Successfully Reserved</p>
              </div>
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
export default SuccessfullModal;
SuccessfullModal.defaultProps = {
  open: "false",
};
