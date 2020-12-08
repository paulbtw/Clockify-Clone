import { requestApi } from '../utils/api';
import * as types from '../constants/ActionTypes';
import { actionFailed, actionStart, actionSuccess } from './utils/template';

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
