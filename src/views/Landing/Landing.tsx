import { Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React from 'react';
import { Page } from '../../components';

const Landing: React.FC = () => {
	return (
		<Page title='Trackery - 100% Free Time Tracking Software'>
			<Typography variant='h1'>Landing page</Typography>
		</Page>
	);
};

export default Landing;
