import { Grid, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { Page } from '../../components';
import { TimeEntryInputContainer, TimeEntryListContainer } from './components';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    padding: theme.spacing(3),
  },
  container: {
    marginTop: theme.spacing(3),
  },
}));

const Tracker: React.FC = () => {
  const classes = useStyles();

  return (
    <Page title="Tracker" className={classes.root}>
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12}>
          <TimeEntryInputContainer />
        </Grid>
        <Grid item xs={12}>
          <TimeEntryListContainer />
        </Grid>
      </Grid>
    </Page>
  );
};

export default Tracker;
