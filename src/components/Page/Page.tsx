import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import useRouter from '../../utils/useRouter';

interface PageProps {
  title: string | null;
  className?: any;
}

const { NODE_ENV } = process.env;
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

const Page: React.FC<PageProps> = ({ title, children, className }) => {
  const router = useRouter();

  useEffect(() => {
    if (NODE_ENV !== 'production') {
      return;
    }
    // @ts-ignore
    if (window.gtag) {
      // @ts-ignore
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: router.location.pathname,
        page_name: title,
      });
    }
  }, [title, router]);
  return (
    <div className={className}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
};

export default Page;
