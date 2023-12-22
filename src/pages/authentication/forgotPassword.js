// import React, { useState } from "react";
// import { Api } from "../../utils/Api";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// const ForgotPassword = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const handlerForgotPassword = async () => {
//     const payload = {
//       email: email,
//     };
//     const response = await Api("post", "forget-password", payload);
//     console.log("response", response);
//     if (response?.data?.code === 200 || response?.data?.code === 201) {
//       toast.success("Password sent to your email");
//       navigate("/");
//     } else {
//       toast.error("Failed");
//     }
//   };
//   return (
//     <div className="modal_ProfileView">
//       <h1 className="text-xl font-bold text-gray-900 font-pj text-center">Forgot Password</h1>
//       <div className="space-y-4 mt-6">
//         <div>
//           <label for="" className="text-base font-medium text-gray-900 font-pj">
//             {" "}
//             Email{" "}
//           </label>
//           <div className="mt-2.5 pb-10">
//             <input
//               type="text"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               id=""
//               placeholder="Enter Email"
//               className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
//             />
//           </div>
//         </div>
// <button
//   className=" flex items-center justify-center w-full px-8 py-4 mt-8 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-gray-600"
//   onClick={handlerForgotPassword}
// >
//   Submit
// </button>
//       </div>
//     </div>
//   );
// };
// export default ForgotPassword;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Api } from "../../utils/Api";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handlerForgotPassword = async () => {
    const payload = {
      email: email,
    };
    const response = await Api("post", "forget-password", payload);
    if (response?.data?.code === 200 || response?.data?.code === 201) {
      toast.success("Password sent to your email");
      navigate("/");
    } else {
      toast.error("Failed");
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
                  </div>
                  <button
                    className=" flex items-center justify-center w-full px-8 py-4 mt-8 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-gray-600"
                    onClick={handlerForgotPassword}
                  >
                    Submit
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
export default ForgotPassword;
