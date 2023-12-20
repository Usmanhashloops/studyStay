import React, { useState } from "react";
import bgBanner from "../../../assets/bgBanner.jpg";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Api } from "../../../utils/Api";
import toast from "react-hot-toast";

import { RxCrossCircled } from "react-icons/rx";
import Loader from "../../../components/loader/Loader";
const BookResidenceModal = (props) => {
  const [loader, setLoader] = useState(false);

  const { open, onClose, valueReserveResidence, setAllReserveResidenceData } = props;
  console.log("valueReserveResidence", valueReserveResidence);
  const handlerBookResidence = async () => {
    setLoader(true);

    const response = await Api("post", `booking-residence/${valueReserveResidence?.item?.id}`);
    console.log("response", response);
    if (response?.status === 200 || response?.status === 201) {
      setAllReserveResidenceData(response?.data?.data?.status);
      toast.success("Residence Successfully Booked");
      onClose();
      setLoader(false);
    } else {
      toast.error(response?.data?.message);
    }
  };
  const handlerCancelResidence = async () => {
    setLoader(true);

    const response = await Api("post", `cancel-reserve/${valueReserveResidence?.item?.id}`);
    console.log("response", response);
    if (response?.status === 200 || response?.status === 201) {
      toast.success("Residence Successfully Cancelled");
      onClose();
      setLoader(false);
    } else {
      toast.error("Error Already Cancel");
    }
  };
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      {loader ? <Loader /> : null}

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <RxCrossCircled className="absolute text-red-600 h-6 w-6 right-1 top-1 cursor-pointer" onClick={() => onClose()} />
          <div className="modalViewReserveResidence">
            <h1 className="mt-2 mb-8 text-center font-bold text-xl text-black font-pj">View Residence</h1>
            <div className="grid  sm:grid-cols-2 ">
              <div className="mb-2">
                <div className="mb-2  font-semibold font-pj text-base mt-2">Name</div>
                <div className="flex items-center capitalize">{valueReserveResidence?.item?.user_id?.name}</div>
              </div>
              <div className="mb-2">
                <div className="mb-2  font-semibold font-pj text-base mt-2">Email</div>
                <div className="flex items-center ">{valueReserveResidence?.item?.user_id?.email}</div>
              </div>
              <div className="mb-2">
                <div className="mb-2  font-semibold font-pj text-base mt-2">Gender</div>
                <div className="flex items-center capitalize">{valueReserveResidence?.item?.user_id?.gender}</div>
              </div>
              <div className="mb-2">
                <div className="mb-2  font-semibold font-pj text-base mt-2">Flat Name</div>
                <div className="flex items-center capitalize">{valueReserveResidence?.item?.accommodation_id?.flate_name}</div>
              </div>
              <div className="mb-2">
                <div className="mb-2  font-semibold font-pj text-base mt-2">Resident Type</div>
                <div className="flex items-center capitalize">{valueReserveResidence?.item?.accommodation_id?.resident_type}</div>
              </div>
              <div className="mb-2">
                <div className="mb-2  font-semibold font-pj text-base mt-2">Residence Name</div>
                <div className="flex items-center capitalize">{valueReserveResidence?.item?.accommodation_id?.residence_name}</div>
              </div>
              <div className="mb-2">
                <div className="mb-2  font-semibold font-pj text-base mt-2">Price</div>
                <div className="flex items-center capitalize">{valueReserveResidence?.item?.accommodation_id?.price}</div>
              </div>
              <div className="mb-2">
                <div className="mb-2  font-semibold font-pj text-base mt-2">Total Person</div>
                <div className="flex items-center capitalize">{valueReserveResidence?.item?.accommodation_id?.total_person}</div>
              </div>
              <div className="mb-2">
                <div className="mb-2  font-semibold font-pj text-base mt-2">Remaning Person</div>
                <div className="flex items-center capitalize">{valueReserveResidence?.item?.accommodation_id?.remaining_person}</div>
              </div>
              <div className="mb-2">
                <div className="mb-2  font-semibold font-pj text-base mt-2">Status</div>
                <div className="flex items-center capitalize">{valueReserveResidence?.item?.status}</div>
              </div>
            </div>
            <div className="mb-2">
              <div className="mb-2  font-semibold font-pj text-base mt-2">Address</div>
              <div className="flex items-center capitalize">{valueReserveResidence?.item?.accommodation_id?.address}</div>
            </div>
            {valueReserveResidence?.status === "booked" ? (
              ""
            ) : (
              <nav class="flex item-center justify-center lg:space-x-6t pb-12 mt-8">
                <a
                  onClick={handlerCancelResidence}
                  title=""
                  class="
        inline-flex
        items-center
        justify-center
        px-7
        py-2
        text-base
        font-semibold
        leading-7
        text-white
        transition-all
        duration-200
        bg-black
        border border-gray-900
        rounded-xl
        font-pj
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
        hover:bg-gray-900 hover:text-white
        focus:bg-gray-900 focus:text-white
        ml-2
    "
                  role="button"
                >
                  Cancel Residence
                </a>
                {valueReserveResidence?.item?.status === "booked" ? (
                  ""
                ) : (
                  <a
                    onClick={handlerBookResidence}
                    title=""
                    class="
    inline-flex
    items-center
    justify-center
    px-7
    py-2
    text-base
    font-semibold
    leading-7
    text-white
    transition-all
    duration-200
    bg-black
    border border-gray-900
    rounded-xl
    font-pj
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
    hover:bg-gray-900 hover:text-white
    focus:bg-gray-900 focus:text-white
    ml-2
"
                    role="button"
                  >
                    Book Residence
                  </a>
                )}
              </nav>
            )}
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
export default BookResidenceModal;
