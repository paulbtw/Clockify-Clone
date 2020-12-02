import {
	Button,
	CardHeader,
	colors,
	Divider,
	makeStyles,
	Paper,
	Popover,
	Typography,
} from '@material-ui/core';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { IWorkspace } from '../../constants/WorkspaceTypes';
import { WorkspaceItem } from './components';
import { changeDefaultWorkspace } from '../../actions/workspace';

interface WorkspacePopoverProps {
	anchorEl: any;
	className?: string;
	onClose: () => void;
	open: boolean;
	defaultWorkspace: IWorkspace;
	workspaces: IWorkspace[];
	userId: string;
	changeDefaultWorkspace: (
		workspaceId: string,
		userId: string,
	) => Promise<void>;
}

const useStyles = makeStyles(() => ({
	root: {
		width: 200,
		maxWidth: '100%',
	},
	actions: {
		backgroundColor: colors.grey[50],
		justifyContent: 'left',
		padding: 0,
	},
}));

const WorkspacePopover: React.FC<WorkspacePopoverProps> = ({
	anchorEl,
	className,
	onClose,
	open,
	defaultWorkspace,
	workspaces,
	userId,
	changeDefaultWorkspace,
}) => {
	const classes = useStyles();

	const onClick = (workspaceId: string) => {
		if (workspaceId === defaultWorkspace.id) {
			return;
		}
		changeDefaultWorkspace(workspaceId, userId)
			.then(() => {
				window.location.reload(false);
			})
			.catch(console.log);
	};
	return (
		<Popover
			anchorEl={anchorEl}
			open={open}
			onClose={onClose}
			className={className}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
		>
			<div className={classes.root}>
				<CardHeader
					title='Workspaces'
					action={
						<Typography component={RouterLink} to='/dashboard/workspaces'>
							Manage
						</Typography>
					}
				/>
				<Divider />
				{workspaces.map((workspace) => {
					const active = workspace.id === defaultWorkspace.id;

					return (
						<WorkspaceItem
							workspace={workspace}
							onClick={onClick}
							active={active}
							key={workspace.id}
						/>
					);
				})}
			</div>
		</Popover>
	);
};

const mapStateToProps = (state: any) => ({
	userId: get(state, 'auth.user.id', null),
});

const mapDispatchToProps = (dispatch: any) => ({
	changeDefaultWorkspace: (workspaceId: string, userId: string) =>
		dispatch(changeDefaultWorkspace(workspaceId, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkspacePopover);
