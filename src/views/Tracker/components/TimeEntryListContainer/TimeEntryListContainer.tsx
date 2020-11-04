import { Table, TableBody, TableHead, TableRow } from "@material-ui/core";
import React, { useEffect } from "react";
import { AnyKindOfDictionary, get } from "lodash";
import { fetchList } from "../../../../actions/timeEntries";
import { connect } from "react-redux";
import { TimeEntryListItemContainer } from "..";

interface TimeEntryListItemsByDayProps {
  date: string;
  entries: {
    id: string;
    description: string;
    billable: boolean;
    start: string;
    end: string | null;
    duration: number | null;
    isLocked: boolean;
    userId: string;
    workspaceId: string;
    projectId: string | null;
    tagId: string | null;
  }[];
}

export const TimeEntryListItemsByDay: React.FC<TimeEntryListItemsByDayProps> = ({
  date,
  entries,
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableRow>{date}</TableRow>
        </TableRow>
      </TableHead>
      <TableBody>
        {entries.map((timeEntry) => {
          return (
            <TimeEntryListItemContainer
              key={timeEntry.id}
              text={timeEntry.description}
              id={timeEntry.id}
              startTime={timeEntry.start}
              endTime={timeEntry.end}
              tagId={timeEntry.tagId}
            />
          );
        })}
      </TableBody>
    </Table>
  );
};

interface TimeEntryListContainerProps {
  onFetchList: (workspaceId: string) => void;
  workspaceId: string;
  timeEntries: {
    id: string;
    description: string;
    billable: boolean;
    start: string;
    end: string | null;
    duration: number | null;
    isLocked: boolean;
    userId: string;
    workspaceId: string;
    projectId: string | null;
    tagId: string | null;
  }[];
}

const TimeEntryListContainer: React.FC<TimeEntryListContainerProps> = ({
  onFetchList,
  workspaceId,
  timeEntries,
}) => {
  useEffect(() => {
    onFetchList(workspaceId);
  }, [workspaceId]);

  return (
    <div>
      <TimeEntryListItemsByDay
        key="03/11/2020"
        date="03/11/2020"
        entries={timeEntries}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    workspaceId: get(state, "auth.user.user.activeWorkspace", null),
    timeEntries: get(state, "timeEntries.entries", []),
    userId: get(state, "auth.user.user.id", null),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchList: (workspaceId: string) => {
      dispatch(fetchList(workspaceId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeEntryListContainer);
