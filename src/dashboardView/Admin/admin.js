import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import Button from "../../components/button";
const AdminDashboard = () => {
  const [addModal, setAddModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [allData, setAllData] = useState([]);
  const handleAddClicked = () => {
    const newData = { name, email, phoneNumber, role };
    setAllData([...allData, newData]); // Add the new data to the existing array
    setAddModal(false);
  };
  const handlerDelete = (index) => {
    const newData = [...allData];
    newData.splice(index, 1);
    setAllData(newData);
  };
  return (
    <div className="flex flex-col flex-1 xl:pl-64">
      <div className="py-12 bg-white sm:py-16 lg:py-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col mt-4 lg:mt-8">
            <div className="flex items-center justify-start mt-4 sm:justify-end sm:mt-0 sm:space-x-7">
              <Button
                title={"Add"}
                className="items-center hidden px-3 py-2 text-sm font-medium leading-4 mb-6 text-gray-700 bg-slate-50 border border-gray-300 rounded-lg shadow-md sm:inline-flex hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={() => setAddModal(!addModal)}
              />
            </div>
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <table className="min-w-full lg:divide-gray-200 lg:divide-y">
                  <thead className="">
                    <tr className="bg-slate-200 rounded-lg">
                      <th className="py-3.5 px-4 text-left text-sm font-medium text-gray-500 tracking-widest">Name</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Email</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Phone Number</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Role</th>
                      <th className="py-3.5 px-4 text-left text-sm tracking-widest font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData &&
                      allData.map((item, index) => (
                        <tr className="bg-gray-50 border-b-[1px]" key={index}>
                          <td className="px-4 py-4 pt-6 lg:pt-5 text-sm font-bold text-gray-900 align-top lg:align-middle whitespace-nowrap">
                            <div className="flex items-center capitalize">{item?.name}</div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                            <div className="flex items-center">{item?.email}</div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                            <div className="flex items-center">{item?.phoneNumber}</div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 xl:table-cell whitespace-nowrap">
                            <div className="flex items-center capitalize">{item?.role}</div>
                          </td>
                          <td className=" px-4 py-4 lg:table-cell whitespace-nowrap">
                            <div className="flex items-center space-x-4">
                              <div className="inline-flex items-center px-1 py-1 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-indigo-200 focus:outline-none hover:text-white hover:border-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <AiOutlineEdit className="h-6 w-6 text-indigo-500" />
                              </div>
                              <div
                                onClick={() => handlerDelete({ item, index })}
                                className="inline-flex items-center px-1 py-1 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-indigo-200 focus:outline-none hover:text-white hover:border-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
            {addModal && (
              <div className=" lg:mt-8 " style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className="sm:px-2 " style={{ width: "700px" }}>
                  <div className="text-center text-xl font-semibold lg:mt-4 mb-3">Add</div>
                  <div className="mt-2">
                    <div className="grid  sm:grid-cols-2 gap-6">
                      <div className="pt-4">
                        <label for="" className="text-base font-medium text-gray-900 font-pj ">
                          {" "}
                          Name{" "}
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            name="name"
                            id=""
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Name"
                            className="block w-full px-3 py-3 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                          />
                        </div>
                      </div>
                      <div className="pt-4 ">
                        <label for="" className="text-base font-medium text-gray-900 font-pj">
                          {" "}
                          Email{" "}
                        </label>
                        <div className="mt-2.5 addInput">
                          <input
                            type="text"
                            name="email"
                            id=""
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Email"
                            className="block w-full px-3 py-3 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                          />
                        </div>
                      </div>
                      <div className="pt-4">
                        <label for="" className="text-base font-medium text-gray-900 font-pj">
                          {" "}
                          Phone Number
                        </label>
                        <div className="mt-2.5 addInput">
                          <input
                            type="number"
                            name="number"
                            id=""
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter Number"
                            className="block w-full px-3 py-3 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                          />
                        </div>
                      </div>
                      <div className="pt-4">
                        <label for="" className="text-base font-medium text-gray-900 font-pj">
                          {" "}
                          Role{" "}
                        </label>
                        <div className="mt-2.5 addInput">
                          <input
                            type="text"
                            name="role"
                            id=""
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="Enter Role"
                            className="block w-full px-3 py-3 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      title={"Add"}
                      onClick={handleAddClicked}
                      className="flex items-center justify-center  w-full px-8 py-4 mt-12 font-bold text-white transition-all duration-200 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-gray-600 drop-shadow-xl bg-slate-950"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
