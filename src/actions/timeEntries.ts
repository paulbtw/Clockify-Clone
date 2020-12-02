import moment from "moment";
import * as types from "../constants/ActionTypes";
import { requestApi } from "../utils/api";
import { actionStart, actionSuccess, actionFailed } from "./utils/template";

export const fetchList = (workspaceId: string) => (dispatch: any) => {
	dispatch(actionStart(types.TIME_ENTRIES_FETCH_LIST));

	const promise = requestApi(`/workspaces/${workspaceId}/timeEntries/full`);
	promise
		.then((result) => {
			dispatch(
				actionSuccess(types.TIME_ENTRIES_FETCH_LIST, {
					payload: result.timeEntriesList,
				})
			);
		})
		.catch((err) => {
			let errorMessage: string;

			switch (err.code) {
				default:
					errorMessage = err.message;
			}
			dispatch(actionFailed(types.TIME_ENTRIES_FETCH_LIST, errorMessage));
		});
	return promise;
};

export const startTimer = (
	workspaceId: string,
	text = "",
	date: null | string
) => (dispatch: any) => {
	dispatch(actionStart(types.TIME_ENTRY_INPUT__START));
	if (!date) {
		date = moment.utc().format();
	}
	const body = {
		start: date,
		description: text,
		stop: null,
		projectId: null,
		tagIds: null,
		billable: false,
	};
	const promise = requestApi(
		`/workspaces/${workspaceId}/timeEntries/full`,
		"POST",
		body
	);
	promise
		.then((result) => {
			dispatch(
				actionSuccess(types.TIME_ENTRY_INPUT__START, {
					payload: result.newEntry,
				})
			);
		})
		.catch((err) => {
			let errorMessage: string;

			switch (err.code) {
				default:
					errorMessage = err.message;
			}
			dispatch(actionFailed(types.TIME_ENTRY_INPUT__START, errorMessage));
		});
	return promise;
};

export const stopTimer = (
	workspaceId: string,
	timeEntryId: string,
	text: string,
	start: string
) => (dispatch: any) => {
	dispatch(actionStart(types.TIME_ENTRY_INPUT__STOP));
	const body = {
		description: text,
		start,
		projectId: null,
		tagIds: null,
		billable: false,
	};
	const promise = requestApi(
		`/workspaces/${workspaceId}/timeEntries/${timeEntryId}/stop`,
		"PUT",
		body
	);
	promise
		.then((result) => {
			dispatch(
				actionSuccess(types.TIME_ENTRY_INPUT__STOP, {
					payload: result,
				})
			);
		})
		.catch((err) => {
			let errorMessage: string;

			switch (err.code) {
				default:
					errorMessage = err.message;
			}
			dispatch(actionFailed(types.TIME_ENTRY_INPUT__STOP, errorMessage));
		});
	return promise;
};

export const deleteTimer = (workspaceId: string, timeEntryId: string) => (
	dispatch: any
) => {
	dispatch(actionStart(types.TIME_ENTRIES_DELETE));
	const promise = requestApi(
		`/workspaces/${workspaceId}/timeEntries/${timeEntryId}/delete`,
		"DELETE"
	);
	promise
		.then((result) => {
			dispatch(
				actionSuccess(types.TIME_ENTRIES_DELETE, {
					payload: { id: timeEntryId },
				})
			);
		})
		.catch((err) => {
			let errorMessage: string;

			switch (err.code) {
				default:
					errorMessage = err.message;
			}
			dispatch(actionFailed(types.TIME_ENTRIES_DELETE, errorMessage));
		});
	return promise;
};

export const patchTimer = (workspaceId: string, timeEntryId: string) => { };
