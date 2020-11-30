import { combineReducers } from "redux";
import auth from "./auth";
import resetPassword from "./resetPassword";
import timeEntries from "./timeEntries";
import boot from "./boot";
import * as types from "../constants/ActionTypes";

const appReducer = combineReducers({
  auth,
  resetPassword,
  timeEntries,
  boot,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === types.LOGOUT && action.status === "success") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
