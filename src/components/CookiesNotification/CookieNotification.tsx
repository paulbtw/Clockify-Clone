import { Button, Link, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface CookieNotificationProps {}

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 420,
		position: 'fixed',
		bottom: 0,
		right: 0,
		margin: theme.spacing(3),
		outline: 'none',
		zIndex: 2000,
	},
	media: {
		padding: theme.spacing(1, 2),
		height: 180,
		textAlign: 'center',
		'& > img': {
			height: '100%',
			width: 'auto',
		},
	},
	content: {
		padding: theme.spacing(1, 2),
	},
	actions: {
		display: 'flex',
		justifyContent: 'flex-end',
		padding: theme.spacing(1, 2, 2, 1),
	},
}));

const CookieNotification: React.FC<CookieNotificationProps> = ({}) => {
	const classes = useStyles();

	const [open, setOpen] = useState(false);

	useEffect(() => {
		const consent = Cookies.get('consent');

		if (!consent) {
			setOpen(true);
		}
	}, []);

	const handleClose = () => {
		Cookies.set('consent', 'true');
		setOpen(false);
	};

	if (!open) {
		return null;
	}
	return (
		<Paper className={classes.root} elevation={3}>
			<div className={classes.media}>
				<img alt='Cookies' src='/images/undraw_cookie_love_ulvn.svg' />
			</div>
			<div className={classes.content}>
				<Typography variant='body1'>
					We use Cookies to ensure that we give you the best experience on our
					website. Read our{' '}
					<Link component='a' href='#' target='_blank'>
						Privacy Policy
					</Link>
					.
				</Typography>
			</div>
			<div className={classes.actions}>
				<Button color='primary' onClick={handleClose} variant='contained'>
					I Agree
				</Button>
			</div>
		</Paper>
	);
};

export default CookieNotification;
