import * as types from '../constants/ActionTypes';
import { requestApi } from '../utils/api';
import { actionStart, actionSuccess } from './utils/template';

export const logout = () => function (dispatch: any) {
	dispatch(actionStart(types.LOGOUT));

	const promise = requestApi('/auth/logout', 'POST');
	promise.then((response) => {
		if (response.success) {
			localStorage.removeItem('token');
		}
	});

	dispatch(actionSuccess(types.LOGOUT));
};
