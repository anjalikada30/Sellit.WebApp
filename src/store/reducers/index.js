import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import app from "./app";

export default combineReducers({
  auth,
  message,
  app
});