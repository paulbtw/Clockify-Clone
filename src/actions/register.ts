import { requestApi } from "../utils/api";
import * as types from "../constants/ActionTypes";
import { actionFailed, actionStart, actionSuccess } from "./utils/template";

export const register = (email: string, password: string, policy: boolean) => {
  return function (dispatch: any) {
    dispatch(actionStart(types.REGISTER));
    const body = { email, password, policy };
    const promise = requestApi("/auth/", "POST", body);
    promise
      .then((user) => {
        dispatch(actionSuccess(types.REGISTER));
      })
      .catch((err) => {
        let errorMessage: string;

        switch (err.code) {
          default:
            errorMessage = err.message;
        }
        dispatch(actionFailed(types.LOGIN, errorMessage));
      });
    return promise;
  };
};
