import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  LOGIN1_SUCCESS,
  LOGIN2_SUCCESS,
  SET_OTP_MESSAGE,
  SET_SIGNUP_MESSAGE,
  CLEAR_SIGNUP_MESSAGE,
  CLEAR_MESSAGE,
} from "./types";

import AuthService from "../../services/auth.service";
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "../../data/constants";

export const register = (data) => (dispatch) => {
  dispatch({
    type: CLEAR_SIGNUP_MESSAGE
  });
  return AuthService.register(data).then(
    (response) => {
      if (response.status === SUCCESS_RESPONSE) {
        dispatch({
          type: REGISTER_SUCCESS
        });

        return Promise.resolve();
      } else if (response.status === ERROR_RESPONSE) {
        dispatch({
          type: REGISTER_FAIL,
        });

        dispatch({
          type: SET_SIGNUP_MESSAGE,
          payload: response.error,
        });

        return Promise.reject();
      }
    }
  );
};

export const login = ({mobile, password}) => (dispatch) => {
  dispatch({
    type: CLEAR_MESSAGE
  });
  return AuthService.login({mobile, password}).then(
    (response) => {
      if (response.status === SUCCESS_RESPONSE) {
        dispatch({
          type: LOGIN1_SUCCESS,
          payload: {
            userId: response.data.response.userId,
            mobile: mobile
          },
        });
        dispatch({
          type: SET_OTP_MESSAGE,
          payload: null,
        });
        return Promise.resolve();
      } else if (response.status === ERROR_RESPONSE) {
        dispatch({
          type: LOGIN_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: response.error,
        });

        return Promise.reject();
      }
    }
  );
};

export const verifyOtp = (data) => (dispatch) => {
  return AuthService.verifyOtp(data).then(
    (response) => {
      if (response.status === SUCCESS_RESPONSE) {
        dispatch({
          type: LOGIN2_SUCCESS,
          payload: {
            user: response.data
          },
        });

        return Promise.resolve();
      } else if (response.status === ERROR_RESPONSE) {
        dispatch({
          type: LOGIN_FAIL,
        });

        dispatch({
          type: SET_OTP_MESSAGE,
          payload: response.error,
        });

        return Promise.reject();
      }
    }
  );
};

export const resendOtp = (data) => (dispatch) => {
  return AuthService.resendOtp(data).then(
    (response) => {
      if (response.status === SUCCESS_RESPONSE) {
        return Promise.resolve({
            message: "OTP sent successfully!"
        });
      } else if (response.status === ERROR_RESPONSE) {
        return Promise.reject({message: response.error});
      }
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};