import * as types from '../constants/ActionTypes';
import { IWorkspace } from '../constants/WorkspaceTypes';

interface IActiveWorkspace {
	activeWorkspace?: IWorkspace;
	isFetching?: boolean;
}

const activeWorkspaceInitialState: IActiveWorkspace = {};

const activeWorkspace = (
	state = activeWorkspaceInitialState,
	action: { type: string; status: string; isFetching?: boolean; payload?: any },
) => {
	switch (action.type) {
		case types.GET_DEFAULT_WORKSPACE:
			if (action.isFetching && action.isFetching === true) {
				return {
					...state,
					isFetching: true,
				};
			}

			if (action.status && action.status === 'success') {
				return {
					...state,
					defaultWorkspace: action.payload,
					isFetching: false,
				};
			}
			return state;
		default:
			return state;
	}
};

export default activeWorkspace;
