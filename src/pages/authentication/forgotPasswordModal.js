import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Api } from "../../utils/Api";
import toast from "react-hot-toast";
const ForgotPasswordModal = (props) => {
  const [email, setEmail] = useState("");
  const handlerForgotPassword = async () => {
    const payload = {
      email: email,
    };
    const response = await Api("post", "forget-password", payload);
    console.log("response", response);
    if (response?.data?.code === 200 || response?.data?.code === 201) {
      toast.success("Password sent to your email");
      props?.onClose();
    } else {
      toast.error("Failed");
    }
  };
  return (
    <Dialog open={props.open} onClose={props.onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div className="modal_ProfileView">
            <h1 className="text-xl font-bold text-gray-900 font-pj text-center">Forgot Password</h1>
            <div className="space-y-4 mt-6">
              <div>
                <label for="" className="text-base font-medium text-gray-900 font-pj">
                  {" "}
                  Email{" "}
                </label>
                <div className="mt-2.5 pb-10">
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id=""
                    placeholder="Enter Email"
                    className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                  />
                </div>
              </div>
              <button
                className=" flex items-center justify-center w-full px-8 py-4 mt-8 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-gray-600"
                onClick={handlerForgotPassword}
              >
                Submit
              </button>
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
export default ForgotPasswordModal;
