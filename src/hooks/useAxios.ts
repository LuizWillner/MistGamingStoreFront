import axios from "axios";
import { BASE_URL } from "../util/constants";

export const useAxios = () => {
  const baseURL = BASE_URL;

  const axiosInstance = axios.create({
    baseURL,
  });
  return axiosInstance;
};
