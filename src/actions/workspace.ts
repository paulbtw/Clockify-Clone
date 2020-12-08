import * as types from '../constants/ActionTypes';
import { requestApi } from '../utils/api';
import { actionStart, actionSuccess, actionFailed } from './utils/template';

export const changeDefaultWorkspace = (workspaceId: string, userId: string) => (
	dispatch: any,
) => {
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

export const getAllWorkspaces = () => (dispatch: any) => {
	dispatch(actionStart(types.GET_WORKSPACES));
	const promise = requestApi('/workspaces', 'GET');
	promise
		.then((workspaces) => {
			dispatch(actionSuccess(types.GET_WORKSPACES, { payload: workspaces }));
		})
		.catch((err) => {
			let errorMessage: string;

			switch (err.code) {
				default:
					errorMessage = err.message;
			}
			dispatch(actionFailed(types.GET_WORKSPACES, errorMessage));
		});
	return promise;
};

export const defaultWorkspace = (id: string) => (dispatch: any) => {
	dispatch(actionStart(types.GET_DEFAULT_WORKSPACE));
	const promise = requestApi(`/workspaces/${id}`, 'GET');
	promise
		.then((workspace) => {
			dispatch(
				actionSuccess(types.GET_DEFAULT_WORKSPACE, { payload: workspace }),
			);
		})
		.catch((err) => {
			let errorMessage: string;

			switch (err.code) {
				default:
					errorMessage = err.message;
			}
			dispatch(actionFailed(types.GET_DEFAULT_WORKSPACE, errorMessage));
		});
	return promise;
};

export const createNewWorkspace = (name: string) => (dispatch: any) => {
	dispatch(actionStart(types.CREATE_NEW_WORKSPACE));
	const body = { name: name };
	const promise = requestApi(`/workspaces`, 'POST', body);
	promise
		.then((response) => {
			dispatch(
				actionSuccess(types.CREATE_NEW_WORKSPACE, {
					payload: response.newWorkspace,
				}),
			);
		})
		.catch((err) => {
			let errorMessage: string;

			switch (err.code) {
				default:
					errorMessage = err.message;
			}
			dispatch(actionFailed(types.GET_DEFAULT_WORKSPACE, errorMessage));
		});
	return promise;
};

export const deleteWorkspace = (id: string) => (dispatch: any) => {
	dispatch(actionStart(types.DELETE_WORKSPACE));
	const promise = requestApi(`/workspaces/${id}`, 'DELETE');
	promise
		.then((response) => {
			dispatch(actionSuccess(types.DELETE_WORKSPACE));
		})
		.catch((err) => {
			let errorMessage: string;

			switch (err.code) {
				default:
					errorMessage = err.message;
			}
			dispatch(actionFailed(types.GET_DEFAULT_WORKSPACE, errorMessage));
		});
	return promise;
};
