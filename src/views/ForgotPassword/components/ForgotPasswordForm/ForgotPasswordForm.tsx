import { Button, makeStyles, TextField, Theme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import validate from 'validate.js';
import { connect, useSelector } from 'react-redux';
import { requestApi } from '../../../../utils/api';
import { requestPasswordReset } from '../../../../actions/resetPassword';
import { useSnackbar } from 'notistack';

interface ForgotPasswordFormProps {
	className: string;
	onForgotPassword: (email: string) => void;
}

const schema = {
	email: {
		presence: { allowEmpty: false, message: 'is required' },
		email: true,
	},
};

const useStyles = makeStyles((theme: Theme) => ({
	root: {},
	fields: {
		margin: theme.spacing(-1),
		display: 'flex',
		flexWrap: 'wrap',
		'& > *': {
			flexGrow: 1,
			margin: theme.spacing(1),
		},
	},
	submitButton: {
		marginTop: theme.spacing(2),
		width: '100%',
	},
}));

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
	className,
	onForgotPassword,
}) => {
	const classes = useStyles();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [formState, setFormState] = useState({
		isValid: false,
		values: { email: '' },
		touched: {},
		errors: {} as {
			email?: string[];
		},
	});

	useEffect(() => {
		const errors = validate(formState.values, schema);

		setFormState((formState) => ({
			...formState,
			isValid: !errors,
			errors: errors || {},
		}));
	}, [formState.values]);

	const handleChange = (
		event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		event.persist();
		const savedEvent = event.target as HTMLTextAreaElement | HTMLInputElement;
		setFormState((formState) => ({
			...formState,
			values: {
				...formState.values,
				[savedEvent.name]:
					savedEvent.type === 'checkbox'
						? // @ts-ignore
						  savedEvent.checked
						: savedEvent.value,
			},
			touched: {
				...formState.touched,
				[savedEvent.name]: true,
			},
		}));
	};

	const hasError = (field: string) =>
		// @ts-ignore
		!!(formState.touched[field] && formState.errors[field]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onForgotPassword(formState.values.email);
	};

	const errorMesssage = useSelector(
		(state: any) => state.resetPassword.requestPasswordReset.errorMessage,
	);

	// Error messages
	useEffect(() => {
		enqueueSnackbar(errorMesssage, { variant: 'warning' });
	}, [errorMesssage]);

	const message = useSelector(
		(state: any) => state.resetPassword.requestPasswordReset.message,
	);

	useEffect(() => {
		enqueueSnackbar(message, { variant: 'success' });
	}, [message]);

	return (
		<form className={clsx(classes.root, className)} onSubmit={handleSubmit}>
			<div className={classes.fields}>
				<TextField
					error={hasError('email')}
					fullWidth
					helperText={
						// @ts-ignore
						hasError('email') ? formState.errors.email[0] : null
					}
					label='E-Mail'
					name='email'
					onChange={handleChange}
					value={formState.values.email || ''}
					variant='outlined'
				/>
			</div>
			<Button
				className={classes.submitButton}
				color='secondary'
				disabled={!formState.isValid}
				size='large'
				type='submit'
				variant='contained'
			>
				Request reset
			</Button>
		</form>
	);
};

const mapDispatchToProps = (dispatch: any) => ({
	onForgotPassword: (email: string) => {
		dispatch(requestPasswordReset(email));
	},
});

export default connect(null, mapDispatchToProps)(ForgotPasswordForm);
