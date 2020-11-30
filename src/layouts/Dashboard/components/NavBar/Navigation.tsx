import { Button, ListItem, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { NavLink as RouterLink } from "react-router-dom";

interface NavigationProps {
  href: string;
  title: string;
  icon: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  title: {
    marginRight: "auto",
  },
  active: {
    color: theme.palette.primary.main,
    "& $title": {
      fontWeight: theme.typography.fontWeightMedium,
    },
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
}));

export const Navigation: React.FC<NavigationProps> = ({
  href,
  title,
  icon: Icon,
}) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.item} disableGutters key={title}>
      <Button
        activeClassName={classes.active}
        className={classes.button}
        component={RouterLink}
        exact={true}
        to={href}
      >
        {Icon && <Icon className={classes.icon} size="20" />}
        <span className={classes.title}>{title}</span>
      </Button>
    </ListItem>
  );
};
