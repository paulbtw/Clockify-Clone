import React, { useState, useContext } from 'react';
import {
	Card,
	CardHeader,
	Divider,
	CardContent,
	Button,
	Dialog,
	DialogTitle,
	DialogContentText,
	DialogContent,
	DialogActions,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { requestApi } from '../../../../utils/api';
import { useSnackbar } from 'notistack';

const Delete: React.FC = () => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClickClose = () => {
		setOpen(false);
	};

	const history = useHistory();
	const onDeleteClick = async () => {
		try {
			const response = await requestApi('/auth/delete', 'DELETE');

			if (response.success) {
				enqueueSnackbar(response.message, { variant: 'success' });
				localStorage.removeItem('token');
				history.push('/');
			}
		} catch (err) {
			console.log(err.message);
			enqueueSnackbar('Failed to delete', { variant: 'error' });
		}
	};

	return (
		<Card>
			<CardHeader title='Account' />
			<Divider />
			<CardContent>
				<Button variant='contained' color='secondary' onClick={handleClickOpen}>
					Delete Account
				</Button>
				<Dialog open={open} onClose={handleClickClose}>
					<DialogTitle id='dialog-title'>Delete Account</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Your account will be permanently deleted. <br />
							Are you sure you want to delete this account?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={onDeleteClick}
							color='secondary'
							variant='contained'
						>
							Delete
						</Button>
						<Button onClick={handleClickClose} variant='contained'>
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			</CardContent>
		</Card>
	);
};

export default Delete;
