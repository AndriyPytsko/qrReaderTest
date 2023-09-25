import axios from "axios";
import { generateToken } from "../handlers/generateToken";
import { QQR_READER_TOKEN } from "../providers/sessionProvider/sessionProvider";

export function getTokenFromCookies() {
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());

  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === QQR_READER_TOKEN) {
      return decodeURIComponent(value);
    }
  }

  return generateToken();
}

const instance = axios.create();

instance.interceptors.request.use(async (config) => {
  const token = getTokenFromCookies();
  config.headers.Authorization = `Token ${token}`;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { instance as axiosCustom };
