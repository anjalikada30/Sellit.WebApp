import { SET_MESSAGE, CLEAR_MESSAGE, SET_OTP_MESSAGE, CLEAR_OTP_MESSAGE, SET_SIGNUP_MESSAGE, CLEAR_SIGNUP_MESSAGE } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_MESSAGE:
      return { ...state, message: payload };

    case CLEAR_MESSAGE:
      return { ...state, message: "" };

    case SET_OTP_MESSAGE:
      return { ...state, otpmessage: payload };

    case CLEAR_OTP_MESSAGE:
      return { ...state, otpmessage: "" };

    case SET_SIGNUP_MESSAGE:
      return { ...state, signupmessage: payload };

    case CLEAR_SIGNUP_MESSAGE:
      return { ...state, signupmessage: "" };

    default:
      return state;
  }
}