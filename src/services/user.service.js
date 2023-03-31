import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://sell-it.onrender.com/api/v1/";

const uploadImage = (data) => {
  return axios.post(API_URL + "users/image", data, { headers: authHeader() });
};

const getAllProducts = () => {
  return axios.get(API_URL + "users/products", { headers: authHeader() });
};

const getProducts = (data) => {
  console.log('data-', data)
  let query = '?';
  Object.keys(data).map(item=>{
    if(data[item])
      query = query + `&${item}=${data[item]}`
  })
  return axios.get(API_URL + "users/products" + query, { headers: authHeader() });
};

const getCategories = () => {
  return axios.get(API_URL + "products/categories", { headers: authHeader() });
};

const getProductDetails = (id) => {
  return axios.get(API_URL + `products/${id}`, { headers: authHeader() });
};

const sellProduct = (data) => {
  return axios.post(API_URL + "products/", data, { headers: authHeader() })
};

const updateProduct = (data)=>{
  return axios.put(API_URL + "products/", data, { headers: authHeader() })
}

const updateBid = (data)=>{
  return axios.put(API_URL + "products/bid", data, { headers: authHeader() });
}

export default {
  uploadImage,
  getAllProducts,
  getCategories,
  sellProduct,
  getProductDetails,
  getProducts,
  updateBid,
  updateProduct
};