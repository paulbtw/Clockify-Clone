import { requestApi } from '../utils/api';
import * as types from '../constants/ActionTypes';
import { actionFailed, actionStart, actionSuccess } from './utils/template';

export const login = (email: string, password: string) => (dispatch: any) => {
  dispatch(actionStart(types.LOGIN));
  const body = { email, password };
  const promise = requestApi('/auth/token', 'POST', body);
  promise
    .then((user) => {
      dispatch(actionSuccess(types.LOGIN));
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
