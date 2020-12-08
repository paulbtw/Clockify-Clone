import { Button, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Page } from '../../components';
import { CreateNewDialog, WorkspaceList } from './components';

interface ManageWorkspacesProps {}

const useStyles = makeStyles((theme: Theme) => ({
	headerWrapper: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: theme.spacing(5),
	},
}));

const ManageWorkspaces: React.FC<ManageWorkspacesProps> = ({}) => {
	const classes = useStyles();

	const [createNewOpen, setCreateNewOpen] = useState(false);

	const handleOpen = () => {
		setCreateNewOpen(true);
	};

	const handleClose = () => {
		setCreateNewOpen(false);
	};
	return (
		<Page title='Manage your Workspaces'>
			<div className={classes.headerWrapper}>
				<Typography variant='h3' display='inline'>
					Workspaces
				</Typography>

				<Button onClick={handleOpen} variant='outlined' color='primary'>
					Create new workspace
				</Button>
				<CreateNewDialog open={createNewOpen} handleClose={handleClose} />
			</div>
			<WorkspaceList />
		</Page>
	);
};

export default ManageWorkspaces;
