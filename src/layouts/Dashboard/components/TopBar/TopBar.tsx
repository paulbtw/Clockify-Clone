import {
	makeStyles,
	Theme,
	AppBar,
	Badge,
	IconButton,
	Toolbar,
	Hidden,
	Box,
	Button,
} from '@material-ui/core';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { get } from 'lodash';
import {
	AccountPopover,
	NotificationsPopover,
	WorkspacePopover,
} from '../../../../components';
import { IWorkspace } from '../../../../constants/WorkspaceTypes';
import {
	INotificationInvite,
	INotificationMessage,
} from '../../../../constants/NotificationTypes';

interface TopBarProps {
	onMobileNavOpen: () => void;
	className?: string;
	defaultWorkspace: IWorkspace;
	workspaces: IWorkspace[];
	notifications: (INotificationInvite | INotificationMessage)[];
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {},
	avatar: {
		width: 40,
		height: 40,
	},
}));

const TopBar: React.FC<TopBarProps> = ({
	onMobileNavOpen,
	className,
	defaultWorkspace,
	workspaces,
	notifications,
}) => {
	const classes = useStyles();

	const [openNotifications, setOpenNotifications] = useState(false);
	const notificationsRef = useRef(null);

	const handleNotificationsOpen = () => {
		setOpenNotifications(true);
	};

	const handleNotificationsClose = () => {
		setOpenNotifications(false);
	};

	const [openAccount, setOpenAccount] = useState(false);
	const accountRef = useRef(null);

	const handleAccountOpen = () => {
		setOpenAccount(true);
	};

	const handleAccountClose = () => {
		setOpenAccount(false);
	};

	const [openWorkspace, setOpenWorkspace] = useState(false);
	const workspaceRef = useRef(null);

	const handleWorkspaceOpen = () => {
		setOpenWorkspace(true);
	};

	const handleWorkspaceClose = () => {
		setOpenWorkspace(false);
	};

	return (
		<AppBar className={clsx(classes.root, className)} elevation={0}>
			<Toolbar>
				<Box flexGrow={1} />
				<Hidden mdDown>
					{defaultWorkspace && workspaces.length > 0 ? (
						<Button
							color='inherit'
							onClick={handleWorkspaceOpen}
							ref={workspaceRef}
						>
							{defaultWorkspace.name}
						</Button>
					) : null}

					<IconButton
						color='inherit'
						ref={notificationsRef}
						onClick={handleNotificationsOpen}
					>
						<Badge
							badgeContent={notifications.length}
							color='primary'
							variant='dot'
						>
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<IconButton
						color='inherit'
						ref={accountRef}
						onClick={handleAccountOpen}
					>
						<AccountCircleIcon />
					</IconButton>
				</Hidden>
				<Hidden lgUp>
					<IconButton color='inherit' onClick={onMobileNavOpen}>
						<MenuIcon />
					</IconButton>
				</Hidden>
			</Toolbar>
			<NotificationsPopover
				anchorEl={notificationsRef.current}
				notifications={notifications}
				onClose={handleNotificationsClose}
				open={openNotifications}
			/>
			<AccountPopover
				anchorEl={accountRef.current}
				onClose={handleAccountClose}
				open={openAccount}
			/>
			<WorkspacePopover
				anchorEl={workspaceRef.current}
				onClose={handleWorkspaceClose}
				open={openWorkspace}
				defaultWorkspace={defaultWorkspace}
				workspaces={workspaces}
			/>
		</AppBar>
	);
};

const mapStateToProps = (state: any) => ({
	defaultWorkspace: get(state, 'defaultWorkspace.defaultWorkspace', null),
	workspaces: get(state, 'workspaces.workspaces', []),
	notifications: get(state, 'notifications.notifications', []),
});

export default connect(mapStateToProps, null)(TopBar);
