import React from "react";
import { TimeEntryListItem } from "..";

interface TimeEntryListItemContainerProps {
  key: string;
  text: string;
  id: string;
  startTime: string;
  endTime: string | null;
  tagId: string | null;
}

const TimeEntryListItemContainer: React.FC<TimeEntryListItemContainerProps> = ({
  key,
  text,
  id,
  startTime,
  endTime,
  tagId,
}) => {
  return (
    <TimeEntryListItem
      key={key}
      text={text}
      id={id}
      startTime={startTime}
      endTime={endTime}
      tagId={tagId}
    />
  );
};

export default TimeEntryListItemContainer;
