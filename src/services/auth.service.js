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

const login = ({ mobile, password }) => {
  return axios
    .post(API_URL + "login", { mobile, password })
    .then((response) => {
      return {
        status: SUCCESS_RESPONSE,
        data: response.data
      }
    })
    .catch((error) => {
      console.log(error)
      const err = {
        status: ERROR_RESPONSE,
      }
      if (error?.response?.data?.message === 'User not found')
        err.error = 'User not found. Please sign up to continue'
      else err.error = error?.response?.data?.message
      return err;
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