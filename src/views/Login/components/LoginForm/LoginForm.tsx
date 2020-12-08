import { Button, makeStyles, TextField, Theme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import validate from 'validate.js';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { login } from '../../../../actions/login';
import { useSnackbar } from 'notistack';

interface LoginFormProps {
	className: string;
	onLogin: (email: string, password: string) => Promise<string>;
}

const schema = {
	email: {
		presence: { allowEmpty: false, message: 'is required' },
		email: true,
	},
	password: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			minimum: 6,
			maximum: 128,
		},
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

const LoginForm: React.FC<LoginFormProps> = ({ className, onLogin }) => {
	const classes = useStyles();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [formState, setFormState] = useState({
		isValid: false,
		values: { email: '', password: '' },
		touched: {},
		errors: {} as {
			email?: string[];
			password?: string[];
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

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onLogin(formState.values.email, formState.values.password)
			.then(() => {
				enqueueSnackbar('Logged In', { variant: 'success' });
				window.gtag('event', 'login', { method: 'Local' });
			})
			.catch((err) => {
				enqueueSnackbar(err.message, { variant: 'error' });
			});
	};

	const hasError = (field: string) =>
		// @ts-ignore
		!!(formState.touched[field] && formState.errors[field]);

	return (
		<form className={clsx(classes.root, className)} onSubmit={handleSubmit}>
			<div className={classes.fields}>
				<TextField
					error={hasError('email')}
					fullWidth
					// @ts-ignore
					helperText={hasError('email') ? formState.errors.email[0] : null}
					label='Email address'
					name='email'
					onChange={handleChange}
					value={formState.values.email || ''}
					variant='outlined'
				/>
				<TextField
					error={hasError('password')}
					fullWidth
					helperText={
						// @ts-ignore
						hasError('password') ? formState.errors.password[0] : null
					}
					label='Password'
					name='password'
					onChange={handleChange}
					type='password'
					value={formState.values.password || ''}
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
				Sign in
			</Button>
		</form>
	);
};

const mapDispatchToProps = (dispatch: any) => ({
	onLogin: (email: string, password: string) =>
		dispatch(login(email, password)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
