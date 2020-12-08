import {
	Divider,
	List,
	ListSubheader,
	makeStyles,
	Paper,
	Theme,
} from '@material-ui/core';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { WorkspaceListItem } from '..';
import {
	changeDefaultWorkspace,
	deleteWorkspace,
} from '../../../../actions/workspace';
import { IWorkspace } from '../../../../constants/WorkspaceTypes';

interface WorkspaceListProps {
	workspaces: IWorkspace[];
	defaultWorkspaceId: string;
	userId: string;
	changeDefaultWorkspace: (
		workspaceId: string,
		userId: string,
	) => Promise<void>;
	deleteWorkspace: (workspaceId: string) => Promise<void>;
}

const useStyles = makeStyles((theme: Theme) => ({
	ListRoot: {},
}));

const WorkspaceList: React.FC<WorkspaceListProps> = ({
	workspaces,
	defaultWorkspaceId,
	userId,
	changeDefaultWorkspace,
	deleteWorkspace,
}) => {
	const classes = useStyles();
	return (
		<Paper elevation={1}>
			<List
				subheader={<ListSubheader>Workspaces</ListSubheader>}
				className={classes.ListRoot}
				disablePadding
			>
				{workspaces.map((workspace, idx) => (
					<React.Fragment key={workspace.id}>
						<Divider />
						<WorkspaceListItem
							workspace={workspace}
							key={workspace.id}
							active={workspace.id === defaultWorkspaceId}
							userId={userId}
							changeDefaultWorkspace={changeDefaultWorkspace}
							deleteWorkspace={deleteWorkspace}
						/>
					</React.Fragment>
				))}
			</List>
		</Paper>
	);
};

const mapStateToProps = (state: any) => ({
	workspaces: get(state, 'workspaces.workspaces', []),
	defaultWorkspaceId: get(state, 'defaultWorkspace.defaultWorkspace.id', null),
	userId: get(state, 'auth.user.id', null),
});

const mapDispatchToProps = (dispatch: any) => ({
	changeDefaultWorkspace: (workspaceId: string, userId: string) =>
		dispatch(changeDefaultWorkspace(workspaceId, userId)),
	deleteWorkspace: (workspaceId: string) =>
		dispatch(deleteWorkspace(workspaceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceList);
