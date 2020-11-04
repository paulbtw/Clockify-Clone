import {
  Card,
  CardContent,
  Divider,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Page } from "../../components";
import ForgotPasswordForm from "./components";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(8, 5),
  },
  card: {
    width: theme.breakpoints.values.sm,
    maxWidth: "100%",
    overflow: "unset",
    display: "flex",
    position: "relative",
    "& > *": {
      flexGrow: 1,
      flexBasis: "50%",
      width: "50%",
    },
  },
  content: {
    padding: theme.spacing(4, 4, 3, 4),
  },
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    // color: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  icon: {
    // backgroundImage: gradients.orange,
    // color: theme.palette,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: "absolute",
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
    fontSize: 32,
  },
  resetPasswordForm: {
    marginTop: theme.spacing(3),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  person: {
    marginTop: theme.spacing(2),
    display: "flex",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const ForgotPassword: React.FC = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Forgot Password">
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h3">
            Reset Password
          </Typography>
          <ForgotPasswordForm className={classes.resetPasswordForm} />
          <Divider className={classes.divider} />
          <Link
            align="center"
            color="secondary"
            component={RouterLink}
            to="/login"
            underline="hover"
            variant="subtitle2"
          >
            Login instead?
          </Link>
        </CardContent>
      </Card>
    </Page>
  );
};

export default ForgotPassword;
