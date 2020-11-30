import {
  Avatar,
  colors,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import moment from 'moment';
import PaymentIcon from '@material-ui/icons/Payment';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import CodeIcon from '@material-ui/icons/Code';
import StoreIcon from '@material-ui/icons/Store';
import gradients from '../../../../utils/gradients';

interface NotificationListProps {
  notifications: {
    id: string;
    type: EType;
    title: string;
    createdAt: string;
  }[];
}

enum EType {
  order = 'order',
  user = 'user',
  project = 'project',
  feature = 'feature',
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  listItem: {
    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
  },
  avatarBlue: {
    backgroundImage: gradients.blue,
  },
  avatarGreen: {
    backgroundImage: gradients.green,
  },
  avatarOrange: {
    backgroundImage: gradients.orange,
  },
  avatarIndigo: {
    backgroundImage: gradients.indigo,
  },
  arrowForwardIcon: {
    color: colors.blueGrey[600],
  },
}));

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
}) => {
  const classes = useStyles();
  const avatars = {
    order: (
      <Avatar className={classes.avatarBlue}>
        <PaymentIcon />
      </Avatar>
    ),
    user: (
      <Avatar className={classes.avatarOrange}>
        <PeopleIcon />
      </Avatar>
    ),
    project: (
      <Avatar className={classes.avatarGreen}>
        <StoreIcon />
      </Avatar>
    ),
    feature: (
      <Avatar className={classes.avatarIndigo}>
        <CodeIcon />
      </Avatar>
    ),
  };
  return (
    <List className={classes.root} disablePadding>
      {notifications.map((notification, i) => (
        <ListItem
          className={classes.listItem}
          component={RouterLink}
          divider={i < notifications.length - 1}
          key={notification.id}
          to="#"
        >
          <ListItemAvatar>{avatars[notification.type]}</ListItemAvatar>
          <ListItemText
            primary={notification.title}
            primaryTypographyProps={{ variant: 'body1' }}
            secondary={moment(notification.createdAt).fromNow()}
          />
          <ArrowForwardIcon className={classes.arrowForwardIcon} />
        </ListItem>
      ))}
    </List>
  );
};

export default NotificationList;
