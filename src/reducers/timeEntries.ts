import { actionSuccess } from '../actions/utils/template';
import * as types from '../constants/ActionTypes';
import { timeEntriesInterface } from '../types/timeEntries';

export interface TimeEntriesState {
  entries: timeEntriesInterface[];
}

const initialState: TimeEntriesState = {
  entries: [],
};

const timeEntries = (
  state = initialState,
  action: {
    type: string;
    status: string;
    isFetching?: boolean;
    removedSuccess?: boolean;
    payload: { [key: string]: any };
  },
) => {
  switch (action.type) {
    case types.TIME_ENTRIES_FETCH_LIST:
      if (action.isFetching && action.isFetching === true) {
        if (state.entries) {
          return {
            ...state,
            isFetching: true,
          };
        }
        return {
          ...state,
          isFetching: true,
        };
      }

      if (action.status && action.status === 'success') {
        return {
          ...state,
          entries: action.payload,
          isFetching: false,
        };
      }

      return state;

    case types.TIME_ENTRIES__ASSIGN_TAG_ID:
    case types.TIME_ENTRIES__ASSIGN_TAG:
      if (action.isFetching && action.isFetching === true) {
        return {
          ...state,
          isFetching: true,
        };
      }
      if (action.status && action.status === 'success' && state.entries) {
        const entry = { ...state.entries[action.payload.entryId] };
        entry.tagId = action.payload.tagId;

        const entries = { ...state.entries };
        entries[action.payload.entryId] = entry;

        return {
          ...state,
          isFetching: false,
          entries,
        };
      }
      return state;

    case types.TIME_ENTRIES_DELETE:
      if (action.isFetching && action.isFetching === true) {
        return {
          ...state,
          isFetching: true,
        };
      }
      if (action.status && action.status === 'success') {
        const newEntries = [...state.entries];
        const entryIndex = newEntries.findIndex(
          (x) => x.id === action.payload.id,
        );
        newEntries.splice(entryIndex, 1);
        return {
          ...state,
          entries: newEntries,
          isFetching: false,
        };
      }
      return state;
    case types.TIME_ENTRY_INPUT__START:
      if (action.isFetching && action.isFetching === true) {
        return {
          ...state,
          isFetching: true,
        };
      }
      if (action.status && action.status === 'success') {
        const newEntries = [...state.entries];
        // Payload is not typed as an Entries Object, dont know how to fix yet!
        // @ts-ignore
        newEntries?.push(action.payload);
        return {
          ...state,
          entries: newEntries,
          isFetching: false,
        };
      }
    case types.TIME_ENTRY_INPUT__STOP:
      if (action.isFetching && action.isFetching === true) {
        return {
          ...state,
          isFetching: true,
        };
      }
      if (action.status && action.status === 'success') {
        const newEntries = [...state.entries];
        const foundIndex = newEntries.findIndex((x) => x.id == action.payload.id);
        // Payload is not typed as an Entries Object, dont know how to fix yet!
        // @ts-ignore
        newEntries[foundIndex] = action.payload;

        return {
          ...state,
          entries: newEntries,
          isFetching: false,
        };
      }
    default:
      return state;
  }
};

export default timeEntries;
