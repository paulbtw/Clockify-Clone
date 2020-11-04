import * as types from "../constants/ActionTypes";
import { requestApi } from "../utils/api";

import { actionStart, actionFailed, actionSuccess } from "./utils/template";

export const isLoggedIn = () => {
  return (dispatch: any) => {
    dispatch(actionStart(types.IS_LOGGED_IN));

    return new Promise(async (resolve, reject) => {
      const response = await requestApi("/auth/verify", "POST");
      if (response.success) {
        dispatch(actionSuccess(types.IS_LOGGED_IN, { user: response.success }));
        resolve();
      } else {
        dispatch(actionFailed(types.IS_LOGGED_IN));
        resolve();
      }
    });
  };
};
