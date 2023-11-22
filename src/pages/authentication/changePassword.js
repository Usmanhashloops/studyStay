import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Api } from "../../utils/Api";
import { jwtDecode } from "jwt-decode";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const ChangePassword = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const handleToggleOldPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleTogglePasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  // const token = useSelector((state) => state.auth.token);
  // const dispatch = useDispatch();
  //   const [user, setUser] = useState({
  //     email: "",
  //     password: "",
  //     emailValidate: false,
  //     passwordValidate: false,
  //   });
  // const handleEmail = (value) => {
  //   const emailRegex = /\S+@\S+\.\S+/;
  //   if (emailRegex.test(value)) {
  //     setUser((Prev) => ({ ...Prev, ["emailValidate"]: true }));
  //     return;
  //   } else {
  //     setUser((Prev) => ({ ...Prev, ["emailValidate"]: false }));
  //     return;
  //   }
  // };
  // const handlePassword = (value) => {
  //   const minLengthPattern = /.{8,}/;
  //   const numericPattern = /\d/;
  //   const specialCharPattern = /[@#$]/;
  //   if (minLengthPattern.test(value) && numericPattern.test(value) && specialCharPattern.test(value)) {
  //     setUser((Prev) => ({ ...Prev, ["passwordValidate"]: true }));
  //     return;
  //   } else {
  //     setUser((Prev) => ({ ...Prev, ["passwordValidate"]: true }));
  //     return;
  //   }
  // };
  //   const handlerChange = (e) => {
  //     const { name, value } = e.target;
  //     setUser((Prev) => ({ ...Prev, [name]: value }));
  //     if (name === "password") {
  //       handlePassword(value);
  //     } else if (name === "email") {
  //       handleEmail(value);
  //     }
  //   };
  const handlerChangePassword = async () => {
    if (!password || !newPassword) return toast.warning("Fill all fields");
    const payload = {
      old_password: password,
      password: newPassword,
    };
    const response = await Api("post", "change-password", payload);
    console.log("response", response);
    if (response?.data?.code === 200) {
      toast.success("Password Changed Successfully");
      navigate("/");
    } else {
      toast.error(response?.data?.message);
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
                  <h1 className="text-xl font-bold text-gray-900 font-pj">Change Password</h1>
                </div>
                <div className="mt-12 mb-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <label for="" className="text-base font-medium text-gray-900 font-pj">
                          {" "}
                          Old Password{" "}
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
                        <div className="absolute top-1/2 right-4 mt-0 transform -translate-y-1/2 cursor-pointer" onClick={handleToggleOldPasswordVisibility}>
                          {showPassword ? (
                            <AiFillEye style={{ height: "20px", width: "20px", color: "black" }} /> // Eye close icon
                          ) : (
                            <AiFillEyeInvisible style={{ height: "20px", width: "20px", color: "black" }} /> // Eye open icon
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between pt-4">
                        <label for="" className="text-base font-medium text-gray-900 font-pj">
                          {" "}
                          New Password{" "}
                        </label>
                      </div>
                      <div className="mt-2.5 relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="password"
                          id="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Password"
                          className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                        />
                        <div className="absolute top-1/2 right-4 mt-0 transform -translate-y-1/2 cursor-pointer" onClick={handleTogglePasswordVisibility}>
                          {showNewPassword ? (
                            <AiFillEye style={{ height: "20px", width: "20px", color: "black" }} /> // Eye close icon
                          ) : (
                            <AiFillEyeInvisible style={{ height: "20px", width: "20px", color: "black" }} /> // Eye open icon
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handlerChangePassword}
                    className="flex  items-center justify-center w-full px-8 py-4 mt-8 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-gray-600"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ChangePassword;
