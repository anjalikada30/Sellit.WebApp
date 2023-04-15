import api from './api';
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://sell-it.onrender.com/api/v1/";

let categories = null;
let homeProducts = null;

const uploadImage = (data) => {
  return axios.post(API_URL + "/users/image", data, { headers: authHeader() });
};

const getAllProducts = () => {
  return api.get("/users/products");
};

const getAllProductsForHome = async () => {
  const response = await api.get("/users/products");
  homeProducts = [...response?.data?.response?.products?.results]
  return Promise.resolve(homeProducts)
};

const getProducts = (data) => {
  let query = '?';
  Object.keys(data).map(item => {
    if (data[item])
      query = query + `&${item}=${data[item]}`
  })
  return api.get("/users/products"+ query);
};

const getCategories = async () => {
  if (!categories) {
    const response = await axios.get(API_URL + "products/categories", { headers: authHeader() });
    categories = response.data.response.categories.filter(category=>category.isActive)
  }
  return Promise.resolve(categories)
};

const getProductDetails = (id) => {
  return axios.get(API_URL + `products/${id}`, { headers: authHeader() });
};

const sellProduct = (data) => {
  return axios.post(API_URL + "products/", data, { headers: authHeader() })
};

const updateProduct = (data) => {
  return axios.put(API_URL + "products/", data, { headers: authHeader() })
}

const updateBid = (data) => {
  return axios.put(API_URL + "products/bid", data, { headers: authHeader() });
}

const forgotPassword = (data) => {
  return axios.post(API_URL + "auth/forgot-password", data)
};

const resetPassword = (data) => {
  return axios.post(API_URL + "auth/reset-password", data)
};

const getUserProfile = () => {
  return axios.get(API_URL + "/users/profile", { headers: authHeader() });
};

const editPersonalDetails = (data) => {
  return axios.put(API_URL + "/users/profile", data, { headers: authHeader() });
}

const editBankDetails = (data) => {
  return axios.put(API_URL + "/users/fund", data, { headers: authHeader() });
}

const editMobileDetails = (data) => {
  return axios.put(API_URL + "/users/mobile", data, { headers: authHeader() });
}

const verifyMobileOtp = (data) => {
  return axios.post(API_URL + "users/verify-mobile-otp", data, { headers: authHeader() });
};

const updatePassword = (data) => {
  return axios.put(API_URL + "users/update-password", data, { headers: authHeader() })
}

const getAllNotifications = async (page) => {
  const response = await axios.get(API_URL + `/users/notifications?page=${page}`, { headers: authHeader() });
  return response;
};

const getNotificationsUnReadCount = async () => {
  const response = await axios.get(API_URL + `/users/notifications/unread/count`, { headers: authHeader() });
  return response;
};

const deleteAllNotifications = async (body) => {
  const response = await axios.delete(API_URL + `/users/notifications`, { headers: authHeader() });
  return response;
};

const deleteNotificationById = async (id) => {
  const response = await axios.get(API_URL + `/users/notifications/${id}`, { headers: authHeader() });
  return response;
};

export default {
  uploadImage,
  getAllProducts,
  getCategories,
  sellProduct,
  getProductDetails,
  getProducts,
  getAllProductsForHome,
  updateBid,
  updateProduct,
  forgotPassword,
  resetPassword,
  getUserProfile,
  editPersonalDetails,
  editBankDetails,
  editMobileDetails,
  verifyMobileOtp,
  updatePassword,
  getAllNotifications,
  getNotificationsUnReadCount,
  deleteAllNotifications,
  deleteNotificationById
};