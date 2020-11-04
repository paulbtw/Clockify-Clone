import {
  Button,
  CardActions,
  CardHeader,
  colors,
  Divider,
  makeStyles,
  Popover,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { NotificationList, EmptyList } from "./components";

interface NotificationsPopoverProps {
  anchorEl: any;
  className?: string;
  notifications: any[];
  onClose: () => void;
  open: boolean;
}

const useStyles = makeStyles(() => ({
  root: {
    width: 350,
    maxWidth: "100%",
  },
  actions: {
    backgroundColor: colors.grey[50],
    justifyContent: "center",
  },
  emptyList: {},
}));

const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  anchorEl,
  className,
  notifications,
  onClose,
  open,
}) => {
  const classes = useStyles();
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={open}
      onClose={onClose}
      className={className}
    >
      <div className={classes.root}>
        <CardHeader title="Notification" />
        <Divider />
        {notifications.length > 0 ? (
          <NotificationList notifications={notifications} />
        ) : (
          <EmptyList className={classes.emptyList} />
        )}
        <Divider />
        <CardActions className={classes.actions}>
          <Button component={RouterLink} size="small" to="#">
            See All
          </Button>
        </CardActions>
      </div>
    </Popover>
  );
};

export default NotificationsPopover;
