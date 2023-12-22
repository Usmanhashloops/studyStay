import axios from "axios";
import { API_BASE_URL } from "./Url";
export const Api = async (method, route, data) => {
  const promise = axios({
    method: method,
    url: `${API_BASE_URL}${route}`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("auth-token"),
    },
    data: data,
  });
  const response = await promise
    .then((resp) => {
      if (resp.data.code === 400) {
        localStorage.clear();
        return resp;
      }
      return resp;
    })
    .catch((err) => {
      return err.response;
    });
  return response;
};
