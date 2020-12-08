import * as types from '../constants/ActionTypes';
import { IWorkspace } from '../constants/WorkspaceTypes';

interface IWorkspacesState {
	workspaces?: IWorkspace[];
	isFetching?: boolean;
}

const workspacesInitialState: IWorkspacesState = {};

const workspaces = (
	state = workspacesInitialState,
	action: { type: string; status: string; isFetching?: boolean; payload?: any },
) => {
	switch (action.type) {
		case types.GET_WORKSPACES:
			if (action.isFetching && action.isFetching === true) {
				return {
					...state,
					isFetching: true,
				};
			}
			if (action.status && action.status === 'success') {
				return {
					...state,
					workspaces: action.payload,
					isFetching: false,
				};
			}
			return state;
		case types.CREATE_NEW_WORKSPACE:
			if (action.isFetching && action.isFetching === true) {
				return {
					...state,
					isFetching: true,
				};
			}
			if (action.status && action.status === 'success' && action.payload) {
				return {
					...state,
					workspaces: [...state.workspaces, action.payload],
				};
			}
			return state;
		default:
			return state;
	}
};

export default workspaces;
