import { Button, TableCell, TableRow, TextField } from '@material-ui/core';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { deleteTimer } from '../../../../actions/timeEntries';
import { timeEntriesInterface } from '../../../../types/timeEntries';
import { toAmPm } from '../../../../utils/time';

interface TimeEntryListItemProps {
	entry: timeEntriesInterface;
	onDelete: (workspaceId: string, timeEntryId: string) => void;
	workspaceId: string;
}

const TimeEntryListItem: React.FC<TimeEntryListItemProps> = ({
	entry,
	onDelete,
	workspaceId,
}) => {
	const onFocusLose = (
		event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		// Logic to check for changes and dispatch
		console.log(event.currentTarget.value);
	};

	const handleDelete = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		event.preventDefault();
		onDelete(workspaceId, entry.id);
	};
	return (
		<TableRow key={entry.id}>
			<TableCell>
				<div
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
					}}
				>
					<TextField
						name='timeEntryName'
						value={entry.description}
						onBlur={onFocusLose}
					/>
				</div>
			</TableCell>
			<TableCell>
				<div
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
					}}
				/>
			</TableCell>
			<TableCell>{`${toAmPm(entry.start)} - ${toAmPm(entry.end)}`}</TableCell>
			<TableCell>
				<div
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
					}}
				>
					<Button onClick={handleDelete}>Delete</Button>
				</div>
			</TableCell>
		</TableRow>
	);
};

const mapDispatchToProps = (dispatch: any) => ({
	onDelete: (workspaceId: string, timeEntryId: string) => {
		dispatch(deleteTimer(workspaceId, timeEntryId));
	},
});

const mapStateToProps = (state: any) => ({
	workspaceId: get(state, 'auth.user.activeWorkspace', null),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeEntryListItem);
