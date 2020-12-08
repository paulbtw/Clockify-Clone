import {
	Button,
	colors,
	IconButton,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	makeStyles,
	Theme,
	Tooltip,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CheckIcon from '@material-ui/icons/Check';
import React from 'react';
import { IWorkspace } from '../../../../constants/WorkspaceTypes';

interface WorkspaceListItemProps {
	workspace: IWorkspace;
	active: boolean;
	userId: string;
	changeDefaultWorkspace: (
		workspaceId: string,
		userId: string,
	) => Promise<void>;
	deleteWorkspace: (workspaceId: string) => Promise<void>;
}

const useStyles = makeStyles((theme: Theme) => ({
	activeButton: {
		color: colors.green[600],
	},
}));

const WorkspaceListItem: React.FC<WorkspaceListItemProps> = ({
	workspace,
	active,
	userId,
	changeDefaultWorkspace,
	deleteWorkspace,
}) => {
	const classes = useStyles();

	const isOwner = (workspace: IWorkspace, userId: string) => {
		const currentMembership = workspace.members.find(
			(x) => x.usersId === userId,
		);
		if (
			currentMembership &&
			currentMembership.permissions === 'WORKSPACE_OWN'
		) {
			return true;
		}
		return false;
	};

	const handleClickActive = () => {
		changeDefaultWorkspace(workspace.id, userId)
			.then(() => {
				window.location.reload();
			})
			.catch(console.log);
	};

	const handleDeleteClick = () => {
		deleteWorkspace(workspace.id)
			.then(() => {
				window.location.reload();
			})
			.catch(console.log);
	};
	return (
		<ListItem>
			<ListItemText>{workspace.name}</ListItemText>
			<ListItemSecondaryAction>
				{active ? (
					<Button
						disabled
						startIcon={<CheckIcon />}
						classes={{
							label: classes.activeButton,
						}}
					>
						Active
					</Button>
				) : (
					<Button onClick={handleClickActive}>Activate</Button>
				)}
				<Button variant='contained' color='primary'>
					Settings
				</Button>
				{isOwner(workspace, userId) ? (
					<Tooltip
						arrow
						placement='left'
						title={
							active
								? "Can't delete active workspace. Switch to a different one first"
								: workspace.members.length > 1
								? "Owners can't delete workspace until they either transfer ownership to someone else or are the only member left in the workspace"
								: 'Delete workspace'
						}
					>
						<span>
							<IconButton onClick={handleDeleteClick} disabled={active}>
								<ClearIcon />
							</IconButton>
						</span>
					</Tooltip>
				) : (
					<Tooltip arrow placement='left' title='Leave workspace'>
						<IconButton>
							<ExitToAppIcon />
						</IconButton>
					</Tooltip>
				)}
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default WorkspaceListItem;
