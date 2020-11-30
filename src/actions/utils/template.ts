export const actionFailed = (
  actionType: string,
  errorMessage?: any,
  object?: any,
) => {
  let action = {
    type: actionType,
    status: 'error',
    isFetching: false,
    errorMessage: undefined,
  };

  if (errorMessage) {
    action.errorMessage = errorMessage;
  }
  if (object) {
    action = Object.assign(action, object);
  }
  return action;
};

export const actionStart = (actionType: string, object?: any) => ({
  type: actionType,
  isFetching: true,
  ...object,
});

export const actionSuccess = (actionType: string, object?: any) => ({
  type: actionType,
  status: 'success',
  isFetching: false,
  ...object,
});
