import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";
import { Api } from "../../utils/Api";
import { BsSearch } from "react-icons/bs";
import { IMAGE_BASE_URL } from "../../utils/Url";
import GeocodeAddress from "../../components/getAddress/getAddress";
import Pagination from "../../components/Pagination/pagination";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../../components/confirmationModal/confirmationModal";

const BlockedUsers = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [allUsersData, setAllUsersData] = useState();
  const [allBlockedData, setAllBlockedData] = useState();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [viewItems, setViewItems] = useState();
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    getAllUsers(currentPage);
  }, [currentPage]);
  const getAllUsers = async (page) => {
    const response = await Api("get", `user-blocked-list?page=${page}`);
    console.log("response", response);
    if (response?.status === 200 || response?.status == 201) {
      if (pages.length === 0) {
        for (let i = 1; i <= Math.ceil(response?.data?.data?.total / response.data?.data?.per_page); i++) {
          pages.push(i);
        }
        setPages(pages);
      }
      setAllBlockedData(response?.data?.data?.data);
    }
  };
  console.log("allBlockedData", allBlockedData);

  const handlerBlock = async (index) => {
    const response = await Api("post", `blocked-user/${allBlockedData[index].id}`);
    console.log("response", response);
    if (response.status === 200 || response.status === 201) {
      const newData = [...allBlockedData];
      newData.splice(index, 1);
      setAllBlockedData(newData);
      setOpenConfirmationModal(false);
      toast.success(response?.data?.message);
    } else toast.error(response?.data?.message);
  };
  return (
    <div className="flex flex-col flex-1 xl:pl-64">
      <div className="py-12 bg-white sm:py-16 lg:py-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col ">
            <div className=" mb-8  sm:flex sm:justify-between">
              <nav className="flex -mb-px space-x-10">
                <div>
                  <input className="search-input bg-slate-200" placeholder="search or filter" onChange={(e) => setSearch(e.target.value)} />
                  <BsSearch className="ml-3 absolute" style={{ color: "#000000", marginTop: "-25px" }} />
                </div>
              </nav>
              <nav className="flex">
                {/* <Button
                  title={"Add Users"}
                  className="items-center mt-6 sm:mt-0 px-3 py-2 text-sm font-medium leading-4 mb-6 text-gray-700 bg-slate-50 border border-gray-300 rounded-lg shadow-md sm:inline-flex hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  //   onClick={() => navigate("/add_Residence")}
                /> */}
              </nav>
            </div>
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <table className="min-w-full lg:divide-gray-200 lg:divide-y">
                  <thead className="">
                    <tr className="bg-slate-200 rounded-lg">
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Sr No</th>
                      <th className="py-3.5 px-4 text-left text-sm font-medium text-gray-500 tracking-widest">Image</th>
                      <th className="py-3.5 px-4 text-left text-sm font-medium text-gray-500 tracking-widest">Name</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Email</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Gender</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allBlockedData &&
                      allBlockedData
                        .filter((item) => {
                          return search.toLowerCase() === "" ? item : item?.name.toLowerCase().includes(search);
                        })
                        .map((item, index) => (
                          <tr className="bg-gray-50 border-b-[1px]" key={index}>
                            <td className="px-4 py-4 pt-6 lg:pt-5 text-sm font-bold text-gray-900 align-top lg:align-middle whitespace-nowrap">{index + 1}</td>
                            <td className="px-4 py-4 pt-6 lg:pt-5 text-sm font-bold text-gray-900 align-top lg:align-middle whitespace-nowrap">
                              <img className=" w-10 h-10 rounded-full" src={IMAGE_BASE_URL + item?.image} alt="" />
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                              <div className="flex items-left capitalize ">{item?.name}</div>
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900 xl:table-cell whitespace-nowrap">
                              <div className="flex items-left">{item?.email}</div>
                            </td>

                            <td className="px-4 py-4 text-sm font-medium text-gray-900 xl:table-cell whitespace-nowrap">
                              <div className="flex items-left capitalize  ">{item?.gender}</div>
                            </td>
                            <td className=" px-4 py-4 lg:table-cell whitespace-nowrap">
                              <div className="flex items-center space-x-4">
                                {/* <div
                                // onClick={() => navigate(`/update_Residence`, { state: { id: item } })}
                                className="cursor-pointer inline-flex items-center px-1 py-1 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-indigo-200 focus:outline-none hover:text-white hover:border-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                <AiOutlineEdit className="h-6 w-6 text-indigo-500" />
                              </div> */}
                                <button
                                  type="button"
                                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold leading-5 text-white transition-all duration-200 bg-green-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-slate-500"
                                  onClick={() => {
                                    setOpenConfirmationModal(true);
                                    setViewItems({ item, index });
                                  }}
                                >
                                  Un block
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
            {openConfirmationModal && (
              <ConfirmationModal
                open={openConfirmationModal}
                onClose={() => setOpenConfirmationModal(false)}
                title={"Are you sure you want to Un-Block this user?"}
                onClick={() => handlerBlock(viewItems.index)}
              />
            )}
            {allBlockedData?.length > 0 ? <Pagination currentPage={currentPage} setCurrentPage={(page) => setCurrentPage(page)} pages={pages} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlockedUsers;
