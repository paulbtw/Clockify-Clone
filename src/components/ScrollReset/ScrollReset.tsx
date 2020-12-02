import React, { useEffect } from 'react';
import useRouter from '../../utils/useRouter';

const ScrollReset: React.FC = () => {
	const router = useRouter();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [router.location.pathname]);
	return null;
};

export default ScrollReset;
