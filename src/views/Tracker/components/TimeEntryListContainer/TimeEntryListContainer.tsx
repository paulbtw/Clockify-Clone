import { Table, TableBody, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect } from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { fetchList } from '../../../../actions/timeEntries';
import { TimeEntryListItemContainer } from '..';
import { groupByDay } from '../../../../utils/timeEntries';
import { timeEntriesInterface } from '../../../../types/timeEntries';

interface TimeEntryListItemsByDayProps {
	date: string;
	entries: timeEntriesInterface[];
}

export const TimeEntryListItemsByDay: React.FC<TimeEntryListItemsByDayProps> = ({
	date,
	entries,
}) => (
	<Table>
		<TableHead>
			<TableRow>{date}</TableRow>
		</TableHead>
		<TableBody>
			{entries.map((timeEntry) => (
				<TimeEntryListItemContainer key={timeEntry.id} entry={timeEntry} />
			))}
		</TableBody>
	</Table>
);

interface TimeEntryListContainerProps {
	onFetchList: (workspaceId: string) => void;
	workspaceId: string;
	timeEntries: timeEntriesInterface[];
}

const TimeEntryListContainer: React.FC<TimeEntryListContainerProps> = ({
	onFetchList,
	workspaceId,
	timeEntries,
}) => {
	useEffect(() => {
		onFetchList(workspaceId);
	}, [onFetchList, workspaceId]);

	const entriesByDay = groupByDay(timeEntries);
	return (
		<div>
			{entriesByDay.map((e) => (
				<TimeEntryListItemsByDay
					key={e.date}
					date={e.date}
					entries={e.entries}
				/>
			))}
		</div>
	);
};

const mapStateToProps = (state: any) => ({
	workspaceId: get(state, 'auth.user.activeWorkspace', null),
	timeEntries: get(state, 'timeEntries.entries', []),
	userId: get(state, 'auth.user.id', null),
});

const mapDispatchToProps = (dispatch: any) => ({
	onFetchList: (workspaceId: string) => {
		dispatch(fetchList(workspaceId));
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(TimeEntryListContainer);
