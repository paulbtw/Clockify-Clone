import { Button, makeStyles, TextField, Theme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import validate from 'validate.js';
import { useHistory } from 'react-router-dom';
import { requestApi } from '../../../../utils/api';

interface ResetPasswordFormProps {
	className: string;
	token: string;
}

const schema = {
	password: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			minimum: 6,
			maximum: 128,
		},
	},
	confirmPassword: {
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

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
	className,
	token,
}) => {
	const classes = useStyles();
	const history = useHistory();

	const [formState, setFormState] = useState({
		isValid: false,
		values: { token, password: '', confirmPassword: '' },
		touched: {},
		errors: {} as {
			password?: string[];
			confirmPassword?: string[];
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
		try {
			const { token } = formState.values;
			const { password } = formState.values;
			const { confirmPassword } = formState.values;
			const body = { token, password, confirmPassword };
			const response = await requestApi(`/auth/reset/${token}`, 'PUT', body);

			if (response.success) {
				toast.success(response.message);
				history.push('/login');
			}
		} catch (err) {
			console.log(err.message);
			toast.error('Password change failed');
		}
	};

	useEffect(() => {
		const testToken = async () => {
			try {
				const response = await requestApi(`/auth/reset/${token}`, 'GET');

				if (!response.success) {
					toast.error(response.message);
					console.log('history push');
					history.push('/reset');
				}
			} catch (err) {
				toast.error(err.message);
				history.push('/reset');
			}
		};

		testToken();
	}, [token, history]);

	return (
		<form className={clsx(classes.root, className)} onSubmit={handleSubmit}>
			<div className={classes.fields}>
				<TextField
					fullWidth
					// @ts-ignore
					label='Reset Token'
					name='token'
					onChange={handleChange}
					value={formState.values.token || ''}
					disabled
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
				<TextField
					error={hasError('confirmPassword')}
					fullWidth
					helperText={
						hasError('confirmPassword')
							? // @ts-ignore
							  formState.errors.confirmPassword[0]
							: null
					}
					label='Confirm password'
					name='confirmPassword'
					onChange={handleChange}
					type='password'
					value={formState.values.confirmPassword || ''}
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
				Change password
			</Button>
		</form>
	);
};

export default ResetPasswordForm;
