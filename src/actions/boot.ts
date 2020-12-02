import { requestApi } from '../utils/api';
import * as types from '../constants/ActionTypes';
import { actionFailed, actionStart, actionSuccess } from './utils/template';

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

export const getUnreadNotifications = (id: string) => (dispatch: any) => {
	dispatch(actionStart(types.GET_NOTIFICATIONS));
	const promise = requestApi(`/users/${id}/notifications`, 'GET');
	promise
		.then((notifications) => {
			dispatch(
				actionSuccess(types.GET_NOTIFICATIONS, {
					payload: notifications.notifications,
				}),
			);
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
