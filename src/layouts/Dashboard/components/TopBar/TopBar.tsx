import {
  makeStyles,
  Theme,
  AppBar,
  Badge,
  IconButton,
  Toolbar,
  Hidden,
  Box,
} from "@material-ui/core";
import clsx from "clsx";
import { Link as RouterLink } from "react-router-dom";
import React, { useContext, useRef } from "react";
import { useState } from "react";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import InputIcon from "@material-ui/icons/Input";
import { NotificationsPopover } from "../../../../components";
import { connect } from "react-redux";
import { logout } from "../../../../actions/logout";

interface TopBarProps {
  onMobileNavOpen: () => void;
  className?: string;
  onLogout?: () => void;
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
  onLogout,
}) => {
  const classes = useStyles();

  const [notifications, setNotifications] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const notificationsRef = useRef(null);

  const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleNotificationsClose = () => {
    setOpenNotifications(false);
  };

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0}>
      <Toolbar>
        <RouterLink to="/">Home</RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton
            color="inherit"
            ref={notificationsRef}
            onClick={handleNotificationsOpen}
          >
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={onLogout}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
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
    </AppBar>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLogout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(TopBar);
