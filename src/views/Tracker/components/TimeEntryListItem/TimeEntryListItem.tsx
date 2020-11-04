import { Button, TableCell, TableRow, TextField } from "@material-ui/core";
import React from "react";

interface TimeEntryListItemProps {
  key: string;
  text: string;
  id: string;
  startTime: string;
  endTime: string | null;
  tagId: string | null;
}

const TimeEntryListItem: React.FC<TimeEntryListItemProps> = ({
  key,
  text,
  id,
  startTime,
  endTime,
  tagId,
}) => {
  return (
    <TableRow>
      <TableCell>
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <TextField id="text" name="text" value={text} />
        </div>
      </TableCell>
      <TableCell>
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Button>Tag</Button>
          {/* <AddTagButtonContainer /> */}
        </div>
      </TableCell>
      <TableCell>
        {startTime} - {endTime}
      </TableCell>
      <TableCell>
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Button>Delete</Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TimeEntryListItem;
