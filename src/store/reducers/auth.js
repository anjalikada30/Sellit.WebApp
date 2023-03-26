import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGOUT,
  LOGIN1_SUCCESS,
  LOGIN2_SUCCESS,
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

// const initialState = user
//   ? { isLoggedIn: true, initialLogin: true, user }
//   : { isLoggedIn: false, initialLogin: false, user: null };

const initialState = { isLoggedIn: false, initialLogin: false, user: null }

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN1_SUCCESS:
      return {
        ...state,
        initialLogin: true,
        userId: payload.userId,
        mobile: payload.mobile
      };
    case LOGIN2_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}