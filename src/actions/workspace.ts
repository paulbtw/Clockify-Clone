import * as types from '../constants/ActionTypes';
import { requestApi } from '../utils/api';
import { actionStart, actionSuccess, actionFailed } from './utils/template';

export const changeDefaultWorkspace = (workspaceId: string, userId: string) => (dispatch: any) => {
	dispatch(actionStart(types.CHANGE_DEFAULT_WORKSPACE));

	const promise = requestApi(
		`/users/${userId}/defaultworkspace/${workspaceId}`,
		'POST',
	);
	promise
		.then((result) => {
			if (!result.success) {
				dispatch(actionFailed(types.CHANGE_DEFAULT_WORKSPACE));
			}
			dispatch(actionSuccess(types.CHANGE_DEFAULT_WORKSPACE));
		})
		.catch((err) => {
			let errorMessage: string;

			switch (err.code) {
				default:
					errorMessage = err.message;
			}
			dispatch(actionFailed(types.CHANGE_DEFAULT_WORKSPACE, errorMessage));
		});
	return promise;
};
