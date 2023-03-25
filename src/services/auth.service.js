import axios from "axios";
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "../data/constants";

const API_URL = "https://sell-it.onrender.com/api/v1/auth/";

const register = (data) => {
  return axios
    .post(API_URL + "signup", data)
    .then((response) => {
      return {
        status: SUCCESS_RESPONSE,
        data: response.data
      }
    })
    .catch((error) => {
      console.log('error-', error)
      return {
        status: ERROR_RESPONSE,
        error: error?.response?.data?.message
      }
    })
};

const login = (mobile) => {
  return axios
    .post(API_URL + "login", {
      mobile
    })
    .then((response) => {
      return {
        status: SUCCESS_RESPONSE,
        data: response.data
      }
    })
    .catch(() => {
      return {
        status: ERROR_RESPONSE,
        error: "Mobile number not found. Please signup to continue."
      }
    })
};

const verifyOtp = (data) => {
  return axios
    .post(API_URL + "verify-otp", data)
    .then((response) => {
      if (response?.data?.response?.tokens?.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data.response));
      }
      return {
        status: SUCCESS_RESPONSE,
        data: response.data.response
      }
    })
    .catch(() => {
      return {
        status: ERROR_RESPONSE,
        error: "Invalid OTP entered."
      }
    })
};

const resendOtp = (data) => {
  return axios
    .post(API_URL + "resend-otp", data)
    .then((response) => {
      console.log('response-', response)
      return {
        status: SUCCESS_RESPONSE,
        data: response.data.response
      }
    })
    .catch(() => {
      return {
        status: ERROR_RESPONSE,
        error: "Couldn't send OTP. Please try again later."
      }
    })
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
  verifyOtp,
  resendOtp
};