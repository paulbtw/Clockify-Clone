import { requestApi } from '../utils/api';
import * as types from '../constants/ActionTypes';
import { actionFailed, actionStart, actionSuccess } from './utils/template';

export const requestPasswordReset = (email: string) => (dispatch: any) => {
  dispatch(actionStart(types.REQUEST_PASSWORD_RESET));
  const body = { email };
  const promise = requestApi('/auth/reset', 'POST', body);
  promise
    .then((res) => {
      dispatch(actionSuccess(types.REQUEST_PASSWORD_RESET));
    })
    .catch((err) => {
      dispatch(actionFailed(types.REQUEST_PASSWORD_RESET, err.message));
    });
  return promise;
};

export const confirmPasswordReset = (
  token: string,
  password: string,
  confirmPassword: string,
) => (dispatch: any) => {
  dispatch(actionStart(types.CONFIRM_PASSWORD_RESET));
  const body = { token, password, confirmPassword };
  const promise = requestApi(`/auth/reset/${token}`, 'PUT', body);
  promise
    .then(() => {
      dispatch(actionSuccess(types.CONFIRM_PASSWORD_RESET));
    })
    .catch((err) => {
      dispatch(actionFailed(types.CONFIRM_PASSWORD_RESET, err.message));
    });
};

export const verifyPasswordResetCode = (token: string) => (dispatch: any) => {
  dispatch(actionStart(types.VERIFY_PASSWORD_RESET_CODE));
  const promise = requestApi(`/auth/reset/${token}`, 'GET');
  promise
    .then(() => {
      dispatch(actionSuccess(types.VERIFY_PASSWORD_RESET_CODE));
    })
    .catch((err) => {
      dispatch(actionFailed(types.VERIFY_PASSWORD_RESET_CODE, err.message));
    });
};
