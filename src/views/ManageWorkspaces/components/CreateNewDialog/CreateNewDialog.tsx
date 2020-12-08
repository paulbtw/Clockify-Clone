import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createNewWorkspace } from '../../../../actions/workspace';

interface CreateNewDialogProps {
	open: boolean;
	handleClose: () => void;
	createNewWorkspace: (name: string) => Promise<void>;
}

const CreateNewDialog: React.FC<CreateNewDialogProps> = ({
	open,
	handleClose,
	createNewWorkspace,
}) => {
	const [name, setName] = useState('');

	const handleChange = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		setName(event.currentTarget.value);
	};

	const handleSubmit = async () => {
		await createNewWorkspace(name);
		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
			<DialogTitle>Create new workspace</DialogTitle>
			<DialogContent dividers>
				<TextField
					autoFocus
					variant='filled'
					fullWidth
					label='Name'
					onChange={handleChange}
					value={name}
				/>
			</DialogContent>
			<DialogActions>
				<Button color='secondary' onClick={handleClose}>
					Cancel
				</Button>
				<Button
					variant='contained'
					color='primary'
					onClick={handleSubmit}
					disabled={!name}
				>
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
};

const mapDispatchToProps = (dispatch: any) => ({
	createNewWorkspace: async (name: string) => {
		return await dispatch(createNewWorkspace(name));
	},
});

export default connect(null, mapDispatchToProps)(CreateNewDialog);
