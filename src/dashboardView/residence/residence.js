import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";
import { Api } from "../../utils/Api";
import { IMAGE_BASE_URL } from "../../utils/Url";
import GeocodeAddress from "../../components/getAddress/getAddress";
import { toast } from "react-hot-toast";
const Residence = () => {
  const navigate = useNavigate();
  const [allResidenceData, setAllResidenceData] = useState();
  useEffect(() => {
    getAllResidenceData();
  }, []);
  const getAllResidenceData = async () => {
    const response = await Api("get", "all-residence");
    console.log("response", response);
    if (response?.status === 200 || response?.status == 201) {
      setAllResidenceData(response?.data?.data?.data);
    }
  };
  const handlerDelete = async ({ index, item }) => {
    const response = await Api("post", `delete-residence/${allResidenceData[index].id}`);
    console.log("response", response);
    if (response.status === 200 || response.status === 201) {
      const newData = [...allResidenceData];
      newData.splice(index, 1);
      setAllResidenceData(newData);
      toast.success(response?.data?.message);
    } else toast.error(response?.data?.message);
  };
  return (
    <div className="flex flex-col flex-1 xl:pl-64">
      <div className="py-12 bg-white sm:py-16 lg:py-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col ">
            <div className="flex items-center justify-start sm:justify-end sm:mt-0 sm:space-x-7">
              <Button
                title={"Add Residence"}
                className="items-center hidden px-3 py-2 text-sm font-medium leading-4 mb-6 text-gray-700 bg-slate-50 border border-gray-300 rounded-lg shadow-md sm:inline-flex hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={() => navigate("/add_Residence")}
              />
            </div>
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <table className="min-w-full lg:divide-gray-200 lg:divide-y">
                  <thead className="">
                    <tr className="bg-slate-200 rounded-lg">
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Image</th>
                      <th className="py-3.5 px-4 text-left text-sm font-medium text-gray-500 tracking-widest">Flat Name</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Resident Type</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Residence Name</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Price</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Address</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allResidenceData &&
                      allResidenceData.map((item, index) => (
                        <tr className="bg-gray-50 border-b-[1px]" key={index}>
                          <td className="px-4 py-4 pt-6 lg:pt-5 text-sm font-bold text-gray-900 align-top lg:align-middle whitespace-nowrap">
                            <img className=" w-10 h-10 rounded-full" src={IMAGE_BASE_URL + item?.images} alt="" />
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                            <div className="flex items-center">{item?.flate_name}</div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                            <div className="flex items-center">{item?.resident_type}</div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 xl:table-cell whitespace-nowrap">
                            <div className="flex items-center capitalize">{item?.residence_name}</div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 xl:table-cell whitespace-nowrap">
                            <div className="flex items-center capitalize">{item?.price}</div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 xl:table-cell whitespace-nowrap">
                            <div className="flex items-center capitalize  ">
                              <GeocodeAddress latitude={item?.latitude} longitude={item?.longitude} apiKey={"AIzaSyC7Jz78vSl5-mHKv4eBOy1fRhmoph6loMA"} />
                            </div>
                          </td>
                          <td className=" px-4 py-4 lg:table-cell whitespace-nowrap">
                            <div className="flex items-center space-x-4">
                              <div
                                onClick={() => navigate(`/update_Residence`, { state: { id: item.id } })}
                                className="cursor-pointer inline-flex items-center px-1 py-1 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-indigo-200 focus:outline-none hover:text-white hover:border-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                <AiOutlineEdit className="h-6 w-6 text-indigo-500" />
                              </div>
                              <div
                                onClick={() => handlerDelete({ item, index })}
                                className="cursor-pointer inline-flex items-center px-1 py-1 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-indigo-200 focus:outline-none hover:text-white hover:border-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                <AiOutlineDelete className="h-6 w-6 text-rose-600" />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Residence;
