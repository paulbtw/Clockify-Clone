import { Action } from 'history';
import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';
import {
  INotificationInvite,
  INotificationMessage,
} from '../constants/NotificationTypes';
import { IWorkspace } from '../constants/WorkspaceTypes';

const initialState: BootState = {};

export interface BootState {
  defaultWorkspace?: IWorkspace;
  workspaces?: IWorkspace[];
  notifications?: (INotificationInvite | INotificationMessage)[];
}

interface DefaultWorkspaceState {
  defaultWorkspace?: IWorkspace;
  isFetching?: boolean;
}

const defaultWorkspaceInitialState: DefaultWorkspaceState = {};

const defaultWorkspace = (
  state = defaultWorkspaceInitialState,
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

interface WorkspacesState {
  workspaces?: IWorkspace[];
  isFetching?: boolean;
}

const workspacesInitialState: WorkspacesState = {};

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
    default:
      return state;
  }
};

interface NotificationState {
  notificationsArray?: (INotificationInvite | INotificationMessage)[];
  isFetching?: boolean;
}

const notificationInitialState: NotificationState = {};

const notifications = (
  state = notificationInitialState,
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

const bootReducer = combineReducers({
  defaultWorkspace,
  workspaces,
  notifications,
});

export default bootReducer;
