import {
	Divider,
	makeStyles,
	Paper,
	Tab,
	Tabs,
	Theme,
	Typography,
} from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import React, { useState } from 'react';
import { Page } from '../../components';

interface WorkspaceSettingsProps {}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		height: '100%',
		padding: theme.spacing(3),
	},
	paperContainer: {
		marginTop: theme.spacing(3),
	},
}));

const a11yProps = (index: any) => ({
	id: `simple-tab-${index}`,
	'aria-controls': `simple-tabpanel-${index}`,
});

const WorkspaceSettings: React.FC<WorkspaceSettingsProps> = ({}) => {
	const classes = useStyles();
	const [tabValue, setTabValue] = useState('settings');

	const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
		setTabValue(newValue);
	};
	return (
		<Page title='Workspace Settings' className={classes.root}>
			<Typography variant='h2'>Workspace Settings</Typography>
			<Paper className={classes.paperContainer}>
				<TabContext value={tabValue}>
					<Tabs value={tabValue} onChange={handleChange}>
						<Tab label='Settings' value='settings' {...a11yProps(0)} />
						<Tab label='Alerts' value='alerts' {...a11yProps(1)} />
						<Tab label='Accounts' value='accounts' {...a11yProps(2)} />
						<Tab
							label='Authentication'
							value='authentication'
							{...a11yProps(3)}
						/>
						<Tab
							label='Custom Fields'
							value='custom-fields'
							{...a11yProps(4)}
						/>
						<Tab label='Import' value='import' {...a11yProps(5)} />
					</Tabs>
					<Divider />
					<TabPanel value='settings'>
						<Typography>Settings</Typography>
					</TabPanel>
					<TabPanel value='alerts'>
						<Typography>Alerts</Typography>
					</TabPanel>
					<TabPanel value='accounts'>
						<Typography>Accounts</Typography>
					</TabPanel>
					<TabPanel value='authentication'>
						<Typography>Authentication</Typography>
					</TabPanel>
					<TabPanel value='custom-fields'>
						<Typography>Custom fields</Typography>
					</TabPanel>
					<TabPanel value='import'>
						<Typography>Import</Typography>
					</TabPanel>
				</TabContext>
			</Paper>
		</Page>
	);
};

export default WorkspaceSettings;
