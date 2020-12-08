import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { requestApi } from '../../utils/api';

interface VerifyProps {
	token: string;
}

const Verify: React.FC<VerifyProps> = ({ token }) => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const history = useHistory();

	useEffect(() => {
		const verifyRequest = async () => {
			try {
				const response = await requestApi(`/auth/verify/${token || ''}`, 'GET');

				if (response.success) {
					enqueueSnackbar(response.message, { variant: 'success' });
					history.push('/login');
				}
			} catch (err) {
				enqueueSnackbar(err.message, { variant: 'error' });
				history.push('/');
			}
		};

		verifyRequest();
	});
	return <h1>Verification</h1>;
};

export default Verify;
