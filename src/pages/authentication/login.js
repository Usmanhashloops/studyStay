import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Api } from "../../utils/Api";
import { jwtDecode } from "jwt-decode";
import ForgotPasswordModal from "./forgotPasswordModal";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import jwt_decode from "jwt-decode";
// import jwt from "jsonwebtoken";
// import { setToken } from "../../features/authSlice";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordModal, setForgotPasswordModal] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleOpen = () => setForgotPasswordModal(true);
  const handleClose = () => setForgotPasswordModal(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // const token = useSelector((state) => state.auth.token);
  // const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
    emailValidate: false,
    passwordValidate: false,
  });

  const handlerLogin = async (e) => {
    if (!email || !password) return toast.warning("Fill all fields");
    const payload = {
      email: email,
      password: password,
    };
    const response = await Api("post", "login", payload);
    if (response?.data?.code === 200) {
      localStorage.setItem("auth-token", response?.data?.data?.token);
      const decoded = jwtDecode(response?.data?.data?.token);
      if (response?.data?.data?.role === "admin") {
        toast.success("Admin Login Successfully");
        navigate("/dashboard");
      } else if (response?.data?.data?.role === "user") {
        toast.success("User Login Successfully");
        navigate("/");
      }
    } else {
      toast.error("Invalid data");
    }
  };

  return (
    <div>
      <section className="py-12 bg-gray-50 sm:pty-16 lg:py-20 h-screen centerScreen ">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8  ">
          <div className="relative max-w-md mx-auto lg:max-w-lg">
            <div className="relative overflow-hidden bg-white  shadow-xl rounded-xl containerWidth">
              <div className="px-4 py-12 sm:px-8">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-bold text-gray-900 font-pj">Login</h1>
                </div>
                <div className="mt-12 mb-6">
                  <div className="space-y-4">
                    <div>
                      <label for="" className="text-base font-medium text-gray-900 font-pj">
                        {" "}
                        Email{" "}
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="email"
                          name="email"
                          id=""
                          placeholder="Email address"
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                        />
                        {/* {!user.emailValidate && <p className="text-red-500 text-sm mt-1">{"Add valid Email"}</p>} */}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label for="" className="text-base font-medium text-gray-900 font-pj">
                          {" "}
                          Password{" "}
                        </label>

                        <a
                          onClick={() => navigate("/forgot_password")}
                          title=""
                          className="cursor-pointer text-base font-medium text-gray-500 rounded font-pj hover:text-gray-900 hover:underline focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                        >
                          {" "}
                          Forgot Password?{" "}
                        </a>
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
                    onClick={handlerLogin}
                    className="flex items-center justify-center w-full px-8 py-4 mt-8 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-gray-600"
                  >
                    Log in
                  </button>
                  <div className="flex justify-center pt-8">
                    <div className="text-slate-400">
                      Don't have Account?{" "}
                      <span className="font-bold text-blue-600 ml-2 cursor-pointer" onClick={() => navigate("/signup")}>
                        {" "}
                        SignUp
                      </span>
                    </div>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {forgotPasswordModal && <ForgotPasswordModal open={forgotPasswordModal} onClose={handleClose} />}
        </div>
      </section>
    </div>
  );
};
export default Login;
