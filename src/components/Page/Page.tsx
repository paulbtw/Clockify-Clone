import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import useRouter from '../../utils/useRouter';

interface PageProps {
	title: string | null;
	className?: any;
}

const { NODE_ENV } = process.env;
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID as string;

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: theme.breakpoints.values.xl,
		maxWidth: '100%',
		padding: theme.spacing(3),
	},
}));

const Page: React.FC<PageProps> = ({ title, children, className }) => {
	const classes = useStyles();
	const router = useRouter();

	useEffect(() => {
		if (NODE_ENV !== 'production') {
			return;
		}
		if (window.gtag) {
			window.gtag('config', GA_MEASUREMENT_ID, {
				page_path: router.location.pathname,
				page_name: title,
			});
		}
	}, [title, router]);
	return (
		<div className={clsx(className, classes.root)}>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			{children}
		</div>
	);
};

export default Page;
