import { Box, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { Page } from "../../components";
import { Delete } from "./components";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: "100%",
    padding: theme.spacing(3),
  },
}));

const Settings: React.FC = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Settings">
      <Box mt={3}></Box>
      <Box mt={3}>
        <Delete />
      </Box>
    </Page>
  );
};

export default Settings;
