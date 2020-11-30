import { Button, TextField } from '@material-ui/core';
import { get } from 'lodash';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { startTimer, stopTimer } from '../../../../actions/timeEntries';
import { timeEntriesInterface } from '../../../../types/timeEntries';
import { findActive } from '../../../../utils/timeEntries';

interface TimeEntryInputProps {
  onStart: (workspaceId: string, text: string, date: string | null) => void;
  onStop: (
    workspaceId: string,
    timeEntryId: string,
    text: string,
    start: string
  ) => void;
  workspaceId: string;
  timeEntries: timeEntriesInterface[];
}

const TimeEntryInput: React.FC<TimeEntryInputProps> = ({
  onStart,
  onStop,
  workspaceId,
  timeEntries,
}) => {
  const [formState, setFormState] = useState({
    values: { text: '', date: null },
    touched: {},
  });
  const [activeEntry, setActiveEntry] = useState({} as timeEntriesInterface);
  const [duration, setDuration] = useState(0);

  const handleChange = (
    event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    event.persist();
    const savedEvent = event.target as HTMLTextAreaElement | HTMLInputElement;
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [savedEvent.name]:
          savedEvent.type === 'checkbox'
            ? // @ts-ignore problem with type detection
            savedEvent.checked
            : savedEvent.value,
      },
      touched: {
        ...formState.touched,
        [savedEvent.name]: true,
      },
    }));
  };

  const onStartClick = () => {
    onStart(workspaceId, formState.values.text, formState.values.date);
  };

  const onStopClick = () => {
    if (activeEntry && activeEntry.id) {
      onStop(
        workspaceId,
        activeEntry?.id,
        formState.values.text,
        activeEntry?.start,
      );
    }
  };

  useEffect(() => {
    const runningTimer = findActive(timeEntries);
    if (runningTimer.length > 0) {
      setActiveEntry(runningTimer[0]);
      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          text: runningTimer[0].description,
        },
      }));
    } else {
      // @ts-ignore
      setActiveEntry({});
    }
  }, [timeEntries]);

  return (
    <div>
      <TextField
        placeholder="What are you doing?"
        id="text"
        name="text"
        onChange={handleChange}
        value={formState.values.text}
      />
      <Button>Tag</Button>
      <span style={{ marginLeft: 20, minWidth: 56, display: 'inline-block' }}>
        {duration}
      </span>
      {Object.keys(activeEntry).length === 0 ? (
        <Button onClick={onStartClick}>Start</Button>
      ) : (
        <Button onClick={onStopClick}>Stop</Button>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  workspaceId: get(state, 'auth.user.activeWorkspace', null),
  timeEntries: get(state, 'timeEntries.entries', []),
});

const mapDispatchToProps = (dispatch: any) => ({
  onStart: (workspaceId: string, text: string, date: string | null) => {
    dispatch(startTimer(workspaceId, text, date));
  },
  onStop: (
    workspaceId: string,
    timeEntryId: string,
    text: string,
    start: string,
  ) => {
    dispatch(stopTimer(workspaceId, timeEntryId, text, start));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeEntryInput);
