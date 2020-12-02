import { makeStyles, Theme, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

interface EmptyListProps {
	className: string;
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		textAlign: 'center',
		padding: theme.spacing(3),
	},
	image: {
		height: 240,
		backgroundImage: 'url("/images/undraw_empty_xct9.svg")',
		backgroundPositionX: 'right',
		backgroundPositionY: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
	},
}));

const EmptyList: React.FC<EmptyListProps> = ({ className }) => {
	const classes = useStyles();
	return (
		<div className={clsx(classes.root, className)}>
			<div className={classes.image} />
			<Typography variant='h4'>There's nothing here...</Typography>
		</div>
	);
};

export default EmptyList;
