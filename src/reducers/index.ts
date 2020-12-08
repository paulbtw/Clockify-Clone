import { combineReducers } from 'redux';
import auth from './auth';
import resetPassword from './resetPassword';
import timeEntries from './timeEntries';
import defaultWorkspace from './defaultWorkspace';
import workspaces from './workspaces';
import notifications from './notifications';
import * as types from '../constants/ActionTypes';

const appReducer = combineReducers({
	auth,
	resetPassword,
	timeEntries,
	defaultWorkspace,
	workspaces,
	notifications,
});

const rootReducer = (state: any, action: any) => {
	if (action.type === types.LOGOUT && action.status === 'success') {
		state = undefined;
	}
	return appReducer(state, action);
};

export default rootReducer;
