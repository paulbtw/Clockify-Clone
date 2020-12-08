import * as types from '../constants/ActionTypes';
import {
	INotificationInvite,
	INotificationMessage,
} from '../constants/NotificationTypes';

interface INotificationsState {
	notificationsArray?: (INotificationInvite | INotificationMessage)[];
	isFetching?: boolean;
}

const notificationsInitialState: INotificationsState = {};

const notifications = (
	state = notificationsInitialState,
	action: { type: string; status: string; isFetching?: boolean; payload?: any },
) => {
	switch (action.type) {
		case types.GET_NOTIFICATIONS:
			if (action.isFetching && action.isFetching === true) {
				return {
					...state,
					isFetching: true,
				};
			}

			if (action.status && action.status === 'success') {
				return {
					...state,
					notificationsArray: action.payload,
					isFetching: false,
				};
			}
			return state;
		default:
			return state;
	}
};

export default notifications;
