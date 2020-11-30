import {
  Button,
  CardActions,
  CardHeader,
  colors,
  Divider,
  makeStyles,
  Popover,
  Switch,
} from "@material-ui/core";
import { get } from "lodash";
import React from "react";
import { connect } from "react-redux";
import { NavLink as RouterLink } from "react-router-dom";
import { logout } from "../../actions/logout";

interface AccountPopoverProps {
  anchorEl: any;
  className?: string;
  onClose: () => void;
  open: boolean;
  onLogout: () => void;
  userName: string;
  userEmail: string | null;
}

const useStyles = makeStyles(() => ({
  root: {
    width: 200,
    maxWidth: "100%",
  },
  actions: {
    backgroundColor: colors.grey[50],
    justifyContent: "left",
    padding: 0,
  },
}));

const AccountPopover: React.FC<AccountPopoverProps> = ({
  anchorEl,
  className,
  onClose,
  open,
  onLogout,
  userName,
  userEmail,
}) => {
  const classes = useStyles();
  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      className={className}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <div className={classes.root}>
        <CardHeader title={userName} subheader={userEmail} />
        <Divider />
        <Button fullWidth component={RouterLink} to="/dashboard/profile">
          Profile Settings
        </Button>
        <Button fullWidth disabled endIcon={<Switch disabled />}>
          Dark theme
        </Button>
        <Button fullWidth disabled>
          Download apps
        </Button>
        <Divider />
        <CardActions className={classes.actions}>
          <Button fullWidth onClick={() => onLogout()}>
            Logout
          </Button>
        </CardActions>
      </div>
    </Popover>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLogout: () => dispatch(logout()),
  };
};

const mapStateToProps = (state: any) => {
  return {
    userName: get(state, "auth.user.name", "User"),
    userEmail: get(state, "auth.user.email", null),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPopover);
