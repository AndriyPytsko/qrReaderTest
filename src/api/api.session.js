import { axiosCustom, getTokenFromCookies } from "./api.custom";

const API_URL = process.env.REACT_APP_API_URL;

class ServiceSession {
  async login(userData) {
    const res = await axiosCustom.post(`${API_URL}/auth/`, {
      ...userData,
      headerLoginType: 0,
    });
    return res.data.data;
  }

  async checkSession() {
    console.log(getTokenFromCookies());
    const res = await axiosCustom.get(`${API_URL}/checkLogin/`);
    return res.data.data;
  }
}

const apiSession = new ServiceSession();

export { apiSession };
