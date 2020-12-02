import React from 'react';
import { TimeEntryListItem } from '..';
import { timeEntriesInterface } from '../../../../types/timeEntries';

interface TimeEntryListItemContainerProps {
	entry: timeEntriesInterface;
}

const TimeEntryListItemContainer: React.FC<TimeEntryListItemContainerProps> = ({
	entry,
}) => <TimeEntryListItem key={entry.id} entry={entry} />;

export default TimeEntryListItemContainer;
