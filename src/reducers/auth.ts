import * as types from "../constants/ActionTypes";

const initialState: AuthState = {
  userLoggedIn: localStorage.getItem("token") ? true : false,
  user: {
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null,
  },
};

export interface AuthState {
  userLoggedIn?: boolean;
  user?: {
    token: string | null;
    user: { [key: string]: any } | null;
  };
  isFetching?: boolean;
  status?: string;
  errorMessage?: string;
}

const auth = (
  state = initialState,
  action: { type: string; status: string; isFetching?: boolean; user?: any }
) => {
  switch (action.type) {
    case types.LOGIN:
      if (action.status === "success") {
        return {
          ...action,
          userLoggedIn: true,
        };
      } else {
        return {
          ...action,
          userLoggedIn: false,
        };
      }

    case types.REGISTER:
      if (action.status === "success") {
        return {
          ...action,
          userLoggedIn: true,
        };
      } else {
        return {
          ...action,
          userLoggedIn: false,
        };
      }

    case types.IS_LOGGED_IN:
      if (action.status === "success") {
        return {
          ...action,
          userLoggedIn: true,
        };
      } else if ("isFetching" in action && action.isFetching) {
        return Object.assign({}, state, { isFetching: action.isFetching });
      } else {
        return {
          ...action,
          userLoggedIn: false,
        };
      }

    case types.LOGOUT:
      if (action.isFetching === true) {
        return {
          ...state,
          isFetching: true,
        };
      }
      if (action.status === "success") {
        return {
          ...state,
          userLoggedIn: false,
          user: null,
        };
      }
      if (action.status === "error") {
        return {
          ...state,
          isFetching: false,
        };
      }
      return state;

    default:
      return state;
  }
};

export default auth;
