import * as types from '../constants/ActionTypes';
import { requestApi } from '../utils/api';

import { actionStart, actionFailed, actionSuccess } from './utils/template';

export const isLoggedIn = () => (dispatch: any) => {
	dispatch(actionStart(types.IS_LOGGED_IN));

	return new Promise(async (resolve, reject) => {
		try {
			const response = await requestApi('/users', 'GET');
			if (response.success) {
				dispatch(actionSuccess(types.IS_LOGGED_IN, { user: response.user }));
			} else {
				dispatch(actionFailed(types.IS_LOGGED_IN));
			}
			resolve();
		} catch (err) {
			dispatch(actionFailed(types.IS_LOGGED_IN));
		}
	});
};
