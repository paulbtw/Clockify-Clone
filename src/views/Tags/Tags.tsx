import { Typography } from '@material-ui/core';
import React from 'react';
import { Page } from '../../components';

interface TagsProps {}

const Tags: React.FC<TagsProps> = ({}) => (
	<Page title='Tags'>
		<Typography>Tags</Typography>
	</Page>
);

export default Tags;
