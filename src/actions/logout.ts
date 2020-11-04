import * as types from "../constants/ActionTypes";
import useRouter from "../utils/useRouter";
import { actionStart, actionFailed, actionSuccess } from "./utils/template";

export const logout = () => {
  return function (dispatch: any) {
    dispatch(actionStart(types.LOGOUT));

    localStorage.removeItem("token");
    dispatch(actionSuccess(types.LOGOUT));
  };
};
