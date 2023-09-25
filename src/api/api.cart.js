import { axiosCustom } from "./api.custom";

const API_URL = process.env.REACT_APP_API_URL;

class ServiceCart {
  async sendBasket(body) {
    const res = await axiosCustom.post(`${API_URL}/cart/add/`, body);
    return res.data.data;
  }
}

const apiCart = new ServiceCart();

export { apiCart };
