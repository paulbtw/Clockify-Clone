import * as types from "../constants/ActionTypes";
import { requestApi } from "../utils/api";
import { actionStart, actionSuccess, actionFailed } from "./utils/template";

interface EntryType {
  id: string;
  description: string;
  billable: boolean;
  start: string;
  end: string;
  duration: number;
  isLocked: boolean;
  userId: string;
  workspaceId: string;
  projectId: string | null;
}

export const fetchList = (workspaceId: string) => {
  return (dispatch: any) => {
    console.log(dispatch);
    dispatch(actionStart(types.TIME_ENTRIES_FETCH_LIST));

    const promise = requestApi(`/workspaces/${workspaceId}/timeEntries/full`);
    promise
      .then((result) => {
        // Object sorted by date's
        // result.timeEntriesList.forEach((entry: EntryType) => {

        // })
        console.log(result.timeEntriesList);
        dispatch(
          actionSuccess(types.TIME_ENTRIES_FETCH_LIST, {
            payload: result.timeEntriesList,
          })
        );
      })
      .catch((err) => {
        dispatch(actionFailed(types.TIME_ENTRIES_FETCH_LIST));
      });
  };
};
