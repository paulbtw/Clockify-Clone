import moment from 'moment';
import { timeEntriesInterface } from '../types/timeEntries';

const getDate = (date: string) => {
	const formattedDate = new Date(date);

	const today = new Date();
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	if (moment(date).isSame(today, 'day')) {
		return 'Today';
	} if (moment(date).isSame(yesterday, 'day')) {
		return 'Yesterday';
	}
	return moment(date).format('ddd, D MMM');
};

export const groupByDay = (timeEntries: timeEntriesInterface[]) => {
	const sortedEntries = timeEntries
		.filter((entry) => {
			if (entry.start && entry.end) {
				return entry;
			}
		})
		.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());

	const result = [] as { date: string; entries: timeEntriesInterface[] }[];
	sortedEntries.forEach((entry) => {
		const entryDate = getDate(entry.start);
		let found = false;
		for (let i = 0, len = result.length; i < len; i++) {
			if (result[i].date === entryDate) {
				result[i].entries.push(entry);
				found = true;
				return;
			}
		}
		if (!found) {
			result.push({
				date: entryDate,
				entries: [entry],
			});
		}
	});
	return result;
};

export const findActive = (timeEntries: timeEntriesInterface[]) => {
	const sortedEntries = timeEntries.filter((entry) => {
		if (entry.start && !entry.end) {
			return entry;
		}
	});

	return sortedEntries;
};
