import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";

interface NewEntryProps {}

const useStyles = makeStyles(() => ({
  paper: {},
}));

const NewEntry: React.FC<NewEntryProps> = ({}) => {
  const classes = useStyles();
  const [timerRunning, setTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(new Date() as Date | null);
  const [timeString, setTimeString] = useState("00:00:00");

  let intervalId: any = useRef(null);

  const onStartTimer = () => {
    setTimerRunning(true);
    setStartTime(new Date());
    intervalId.current = setInterval(calcDifference, 1000);
  };

  const onStopTimer = () => {
    setTimerRunning(false);
    setStartTime(null);
    clearInterval(intervalId.current);
  };

  const calcDifference = () => {
    console.log(startTime);
    if (!startTime) {
      return "00:00:00";
    }

    const timeDifference = new Date().getTime() - startTime.getTime();

    console.log(timeDifference);
  };

  return (
    <Paper className={classes.paper}>
      <Button
        onClick={onStartTimer}
        disabled={timerRunning}
        variant="contained"
        color="primary"
      >
        Start
      </Button>
      <Button
        onClick={onStopTimer}
        disabled={!timerRunning}
        variant="contained"
        color="secondary"
      >
        Stop
      </Button>
      <Typography variant="body1">{timeString}</Typography>
    </Paper>
  );
};
