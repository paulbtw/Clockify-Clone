import { Button, TextField } from "@material-ui/core";
import React from "react";

interface TimeEntryInputProps {}

const TimeEntryInput: React.FC<TimeEntryInputProps> = ({}) => {
  return (
    <div>
      <TextField placeholder="What are you doing?" id="text" name="text" />
      <Button>Tag</Button>
      <span style={{ marginLeft: 20, minWidth: 56, display: "inline-block" }}>
        0:00:00
      </span>
    </div>
  );
};

export default TimeEntryInput;
