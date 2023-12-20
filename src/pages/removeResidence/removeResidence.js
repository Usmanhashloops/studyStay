import React, { useState, useEffect } from "react";
import { Api } from "../../utils/Api";
import ConfirmationModal from "../../components/confirmationModal/confirmationModal";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const RemoveResidence = () => {
  const [loader, setLoader] = useState(false);

  const [showConfirmationModal, setShowConfirmationModal] = useState("");
  const [sendData, setSendData] = useState();
  const [btnDisabled, setBtnDisabled] = useState(false);

  const [userAllReserveResidence, setUserAllReserveResidence] = useState();
  const getUserAllReserveResidence = async () => {
    setLoader(true);

    const response = await Api("get", "show-user-reserve-residence");
    console.log("response", response);
    if (response?.status === 200 || response?.status == 201) {
      setUserAllReserveResidence(response?.data?.data);
    }
    setLoader(false);
  };
  useEffect(() => {
    getUserAllReserveResidence();
  }, []);
  const handlerDelete = async (index) => {
    setLoader(true);

    const response = await Api("post", `user-cancel-reserve/${userAllReserveResidence[index].id}`);
    console.log("response", response);
    if (response.status === 200 || response.status === 201) {
      const newData = [...userAllReserveResidence];
      newData.splice(index, 1);
      setUserAllReserveResidence(newData);
      setShowConfirmationModal(false);
      toast.success(response?.data?.message);
      setLoader(false);
    } else toast.error(response?.data?.message);
  };
  console.log("userAllReserveResidence", userAllReserveResidence);
  return (
    <section class="py-12 bg-neutral-50 sm:py-16 lg:py-17 h-[90vh]">
      {loader ? <Loader /> : null}

      <div class="px-2 mx-auto sm:px-6 lg:px-0 max-w-7xl">
        <div className=" text-3xl text-slate-500  font-bold text-center  ">Reserved Residences</div>
        <div className=" mt-10">
          <div className="flex flex-col ">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <table className="min-w-full lg:divide-gray-200 lg:divide-y">
                  <thead className="">
                    <tr className="bg-slate-200 rounded-lg">
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Sr No</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Flat Name</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Residence Name</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Address</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Price</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Status</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userAllReserveResidence &&
                      userAllReserveResidence.map((item, index) => (
                        <tr className="bg-gray-50 border-b-[1px]">
                          <td className="px-4 py-4 pt-6 lg:pt-5 text-sm font-bold text-gray-900 align-top lg:align-middle whitespace-nowrap">
                            <div className="flex items-center capitalize">{index + 1}</div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                            <div className="flex items-center capitalize">{item?.accommodation_id?.flate_name}</div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 xl:table-cell whitespace-nowrap">
                            <div className="flex items-center capitalize"> {item?.accommodation_id?.residence_name} </div>
                          </td>

                          <td className="px-4 py-4 text-sm font-medium text-gray-900 xl:table-cell whitespace-nowrap">
                            <div className="flex items-center capitalize"> {item?.accommodation_id?.address} </div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 xl:table-cell whitespace-nowrap">
                            <div className="flex items-center capitalize">
                              <span>€</span>
                              {item?.accommodation_id?.price.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 xl:table-cell whitespace-nowrap">
                            <div className="flex items-center capitalize"> {item?.status}</div>
                          </td>
                          <td className=" px-4 py-4 lg:table-cell whitespace-nowrap">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center px-6 py-2 text-sm font-bold leading-5 text-white transition-all duration-200 bg-red-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-slate-500"
                              onClick={() => {
                                setShowConfirmationModal(true);
                                setSendData({ item, index });
                              }}
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            {showConfirmationModal && (
              <ConfirmationModal
                open={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
                title={"Are you sure you want to cancel this Residence?"}
                onClick={() => handlerDelete(sendData.index)}
                setBtnDisabled={true}
                btnDisabled={btnDisabled}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RemoveResidence;
