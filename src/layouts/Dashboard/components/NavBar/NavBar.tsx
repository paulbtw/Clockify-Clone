import {
  Avatar,
  Divider,
  Drawer,
  Hidden,
  List,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { Fragment, useContext, useEffect } from "react";
import clsx from "clsx";
import useRouter from "../../../../utils/useRouter";
import { Navigation } from "./Navigation";
import navigationConfig from "./navigationConfig";
import { Link as RouterLink } from "react-router-dom";
import { get } from "lodash";
import { connect } from "react-redux";

interface NavBarProps {
  onMobileClose: () => void;
  openMobile: boolean;
  className?: string;
  name?: string;
  profileImage?: string;
  email?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100%",
    overflowY: "hidden",
  },
  content: {
    padding: theme.spacing(2),
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  navigation: {
    marginTop: theme.spacing(2),
  },
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
}));

const NavBar: React.FC<NavBarProps> = ({
  openMobile,
  onMobileClose,
  className,
  name,
  profileImage,
  email,
}) => {
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    if (openMobile) {
      onMobileClose && onMobileClose();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.location.pathname]);

  const navbarContent = (
    <div className={classes.content}>
      <div className={classes.profile}>
        <Avatar
          alt="Person"
          className={classes.avatar}
          src={profileImage}
          component={RouterLink}
          to="/dashboard/profile"
        />
        <Typography color="textPrimary" variant="h4" className={classes.name}>
          {name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {email}
        </Typography>
      </div>
      <Divider className={classes.divider} />
      <nav className={classes.navigation}>
        <List>
          {navigationConfig.map((item) => (
            <Navigation
              href={item.href}
              title={item.title}
              icon={item.icon}
              key={item.title}
            />
          ))}
        </List>
      </nav>
    </div>
  );

  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          classes={{ paper: classes.mobileDrawer }}
          open={openMobile}
          variant="temporary"
        >
          <div className={clsx(classes.root, className)}>{navbarContent}</div>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {navbarContent}
        </Drawer>
      </Hidden>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    name: get(state, "auth.user.user.name", null),
    profileImage: get(state, "auth.user.user.profilePicture", null),
    email: get(state, "auth.user.user.email", null),
  };
};

export default connect(mapStateToProps)(NavBar);
