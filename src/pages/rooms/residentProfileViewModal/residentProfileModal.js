import React from "react";
import bgBanner from "../../../assets/bgBanner.jpg";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
const ResidentProfileModal = (props) => {
  const residents = ["", "", "", ""];
  return (
    <Dialog open={props.open} onClose={props.onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div className="modal_ProfileView">
            <div className="font-pj  text-lg text-current font-bold text-center pt-1 mb-3">List of Residents</div>
            {residents.map((item, i) => (
              <div className="flex mb-2" key={i}>
                <img src={bgBanner} className="imageIcon-view" />
                <div className="mt-3 ml-2  text-md text-black ">Mian Usman Ahmad</div>
              </div>
            ))}
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
export default ResidentProfileModal;
