import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://sell-it.onrender.com/api/v1/";

let categories = null;
let homeProducts = null;

const uploadImage = (data) => {
  return axios.post(API_URL + "users/image", data, { headers: authHeader() });
};

const getAllProducts = () => {
  return axios.get(API_URL + "users/products", { headers: authHeader() });
};

const getAllProductsForHome = async () => {
  if (!homeProducts) {
    const response = await axios.get(API_URL + "users/products", { headers: authHeader() });
    homeProducts = [...response?.data?.response?.products?.results]
  }
  return Promise.resolve(homeProducts)
};

const getProducts = (data) => {
  let query = '?';
  Object.keys(data).map(item => {
    if (data[item])
      query = query + `&${item}=${data[item]}`
  })
  return axios.get(API_URL + "users/products" + query, { headers: authHeader() });
};

const getCategories = async () => {
  if (!categories) {
    const response = await axios.get(API_URL + "products/categories", { headers: authHeader() });
    categories = [...response.data.response.categories]
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
  resetPassword
};