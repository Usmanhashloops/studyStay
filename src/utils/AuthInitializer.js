// src/components/AuthInitializer.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../features/authSlice";
import jwt_decode from "jwt-decode";
function AuthInitializer() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Retrieve the token from local storage
    const storedToken = localStorage.getItem("auth-token");
    // Set the token in the Redux store
    if (storedToken) {
      const decodedToken = jwt_decode(storedToken);
      dispatch(setToken(decodedToken));
    } else {
      // Dispatch an action to set the token to null specifically in the else part
      dispatch(setToken(null));
    }
  }, [dispatch]);
  // You can also place other global authentication-related logic here
  return null; // This component doesn't render anything to the UI
}
export default AuthInitializer;
