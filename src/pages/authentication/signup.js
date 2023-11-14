import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import QuestionsModal from "./questionsModal";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [questionsModal, setQuestionsModal] = React.useState(false);
  const handlerOpen = () => {
    if (!name || !email || !password) {
      toast.error("Fill all the fields");
    } else {
      setQuestionsModal(true);
    }
  };
  const handleClose = () => setQuestionsModal(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <section className="py-12 bg-gray-50 sm:pty-16 lg:py-20 h-screen centerScreen">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative max-w-md mx-auto lg:max-w-lg">
            <div className="relative overflow-hidden bg-white shadow-xl rounded-xl containerWidth">
              <div className="px-4 py-12 sm:px-8">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-bold text-gray-900 font-pj">SignUp</h1>
                </div>
                <div className="mt-12 mb-6">
                  <div className="space-y-4">
                    <div>
                      <label for="" className="text-base font-medium text-gray-900 font-pj">
                        Name
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          name="name"
                          onChange={(e) => setName(e.target.value)}
                          id=""
                          placeholder="Name"
                          className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                        />
                      </div>
                    </div>
                    <div>
                      <label for="" className="text-base font-medium text-gray-900 font-pj">
                        Email
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                          id=""
                          placeholder="Email Address"
                          className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <label for="" className="text-base font-medium text-gray-900 font-pj">
                          Password
                        </label>
                      </div>
                      <div className="mt-2.5 relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                        />
                        <div className="absolute top-1/2 right-4 mt-0 transform -translate-y-1/2 cursor-pointer" onClick={handleTogglePasswordVisibility}>
                          {showPassword ? (
                            <AiFillEye style={{ height: "20px", width: "20px", color: "black" }} /> // Eye close icon
                          ) : (
                            <AiFillEyeInvisible style={{ height: "20px", width: "20px", color: "black" }} /> // Eye open icon
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handlerOpen}
                    className="flex items-center justify-center w-full px-8 py-4 mt-8 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-gray-600"
                  >
                    Continue
                  </button>
                </div>
                <div className="flex justify-center mt-2">
                  <div className="text-slate-400">
                    Already have Account?
                    <span className="font-bold text-blue-600 ml-2 cursor-pointer" onClick={() => navigate("/login")}>
                      Login
                    </span>
                  </div>
                </div>
              </div>
              {questionsModal && <QuestionsModal open={questionsModal} onClose={handleClose} name={name} email={email} password={password} />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default SignUp;
