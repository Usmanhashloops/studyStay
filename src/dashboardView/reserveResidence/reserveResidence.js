import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Button from "../../components/button";

import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Api } from "../../utils/Api";
import { IMAGE_BASE_URL } from "../../utils/Url";
import { toast } from "react-hot-toast";
import { MdRemoveRedEye } from "react-icons/md";
import BookResidenceModal from "./modal/BookResidenceModal";
import Pagination from "../../components/Pagination/pagination";
import Loader from "../../components/loader/Loader";
const ReserveResidence = () => {
  const tabs = [
    { item: "Reserved", url: "show-reserve-residence" },
    { item: "Booked", url: "show-all-booking-residence" },
  ];
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [searchField, setSearchField] = useState("");
  const [bookResidenceModal, setBookResidenceModal] = useState(false);
  const [valueReserveResidence, setValueReserveResidence] = useState();
  const [allData, setAllData] = useState([]);
  const [pages, setPages] = useState([]);
  const [url, setUrl] = useState("show-reserve-residence");
  const [currentPage, setCurrentPage] = useState(1);

  const handleTabClick = (tabNumber, url) => {
    getAllResidenceData(currentPage, url);
    setUrl(url);
    setActiveTab(tabNumber);
  };

  useEffect(() => {
    getAllResidenceData(currentPage, url);
  }, [currentPage]);

  const getAllResidenceData = async (page, url) => {
    setLoader(true);
    const response = await Api("get", `${url}?page=${page}`);
    console.log("response", response);
    if (response?.status === 200 || response?.status == 201) {
      if (pages.length === 0) {
        for (let i = 1; i <= Math.ceil(response?.data?.data?.total / response.data?.data?.per_page); i++) {
          pages.push(i);
        }
        setPages(pages);
      }
      setAllData(response?.data?.data?.data);
    }
    setLoader(false);
  };

  const handlerView = ({ item, i }) => {
    setBookResidenceModal(true);
    setValueReserveResidence({ item, i });
  };
  const handleSearch = async (e) => {
    setLoader(true);
    const payload = {
      name: e,
    };
    const response = await Api("post", "reserved-search", payload);
    console.log("res", response);
    if (response?.status === 200 || response?.status === 201) {
      setAllData(response?.data?.data?.data);
    }
    setLoader(false);
  };
  console.log("allData", allData);
  return (
    <div className="flex flex-col flex-1 xl:pl-64">
      {loader ? <Loader /> : null}
      <div className="py-12 bg-white sm:py-16 lg:py-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className=" mb-8  sm:flex sm:justify-between">
            <nav className="flex -mb-px space-x-10">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={` ${
                    activeTab === index
                      ? "py-2 text-sm font-medium	 text-indigo-600 transition-all duration-200 border-b-2 border-indigo-600 whitespace-nowrap cursor-pointer"
                      : "py-2 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap cursor-pointer"
                  }`}
                  onClick={() => handleTabClick(index, tab?.url)}
                >
                  {tab?.item}
                </div>
              ))}
            </nav>
            <nav className="flex">
              <div>
                <input
                  className="search-input"
                  placeholder="search or filter"
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                />
                <BsSearch className="ml-3 absolute" style={{ color: "#000000", marginTop: "-25px" }} />
              </div>
            </nav>
          </div>
          <div className="flex flex-col ">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <table className="min-w-full lg:divide-gray-200 lg:divide-y">
                  <thead className="">
                    <tr className="bg-slate-200 rounded-lg">
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Image</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Name</th>
                      <th className="py-3.5 px-4 text-left text-sm font-medium text-gray-500 tracking-widest">Email</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Gender</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Flat Name</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Resident Type</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Residence Name</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Price</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Status</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allData &&
                      allData.map((item, i) => (
                        <tr className="bg-gray-50 border-b-[1px]" key={i}>
                          <td className="px-4 py-4 pt-6 lg:pt-5 text-sm font-bold text-gray-900 align-top lg:align-middle whitespace-nowrap">
                            <img className=" w-10 h-10 rounded-full" src={IMAGE_BASE_URL + item?.user_id?.image} alt="" />
                          </td>
                          <td className="px-4 py-4 pt-6 lg:pt-5 text-sm font-bold text-gray-900 align-top lg:align-middle whitespace-nowrap">
                            <div className="flex items-center capitalize">{item?.user_id?.name}</div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                            <div className="flex items-center">{item?.user_id?.email}</div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                            <div className="flex items-center capitalize">{item?.user_id?.gender}</div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 xl:table-cell whitespace-nowrap">
                            <div className="flex items-center capitalize">{item?.accommodation_id?.flate_name}</div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 xl:table-cell whitespace-nowrap">
                            <div className="flex items-center capitalize"> {item?.accommodation_id?.resident_type}</div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 xl:table-cell whitespace-nowrap">
                            <div className="flex items-center capitalize"> {item?.accommodation_id?.residence_name}</div>
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
                            <div className="flex items-center space-x-4">
                              <div
                                onClick={() => handlerView({ item, i })}
                                className="cursor-pointer inline-flex items-center px-1 py-1 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-indigo-200 focus:outline-none hover:text-white hover:border-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                <MdRemoveRedEye className="h-6 w-6 text-indigo-500" />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {allData?.length > 0 ? <Pagination currentPage={currentPage} setCurrentPage={(page) => setCurrentPage(page)} pages={pages} /> : null}
              </div>
              {bookResidenceModal && (
                <BookResidenceModal
                  open={bookResidenceModal}
                  onClose={() => setBookResidenceModal(false)}
                  valueReserveResidence={valueReserveResidence}
                  setAllReserveResidenceData={(data) => {
                    setAllData([...allData.filter((value, index) => index !== valueReserveResidence.i)]);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReserveResidence;
