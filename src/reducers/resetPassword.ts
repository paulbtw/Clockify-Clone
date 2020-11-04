import * as types from "../constants/ActionTypes";
import { combineReducers } from "redux";

const requestPasswordReset = (
  state = {},
  action: { type: string; status: string; isFetching?: boolean }
) => {
  switch (action.type) {
    case types.REQUEST_PASSWORD_RESET:
      return {
        ...action,
        userLoggedIn: false,
      };
    default:
      return state;
  }
};

const confirmPasswordReset = (
  state = {},
  action: { type: string; status: string; isFetching?: boolean }
) => {
  switch (action.type) {
    case types.CONFIRM_PASSWORD_RESET:
      return {
        ...action,
        userLoggedIn: false,
      };
    default:
      return state;
  }
};

const verifyPasswordResetCode = (
  state = {},
  action: { type: string; status: string; isFetching?: boolean }
) => {
  switch (action.type) {
    case types.VERIFY_PASSWORD_RESET_CODE:
      return {
        ...action,
        userLoggedIn: false,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  verifyPasswordResetCode,
  confirmPasswordReset,
  requestPasswordReset,
});

export default rootReducer;
