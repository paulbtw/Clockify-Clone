import BarChartIcon from '@material-ui/icons/BarChart';
import ScheduleIcon from '@material-ui/icons/Schedule';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import SettingsIcon from '@material-ui/icons/Settings';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import GroupIcon from '@material-ui/icons/Group';
import MoodIcon from '@material-ui/icons/Mood';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';

export default [
	{
		href: '/dashboard/tracker',
		icon: ScheduleIcon,
		title: 'Timer',
	},
	{
		href: '/dashboard/reports',
		icon: BarChartIcon,
		title: 'Reports',
	},
	{
		href: '/dashboard',
		icon: BorderAllIcon,
		title: 'Dashboard',
	},
	{
		href: '/dashboard/projects',
		icon: LibraryBooksIcon,
		title: 'Projects',
	},
	{
		href: '/dashboard/teams',
		icon: GroupIcon,
		title: 'Teams',
	},
	{
		href: '/dashboard/clients',
		icon: MoodIcon,
		title: 'Clients',
	},
	{
		href: '/dashboard/tags',
		icon: TurnedInNotIcon,
		title: 'Tags',
	},
	{
		href: '/dashboard/settings',
		icon: SettingsIcon,
		title: 'Settings',
	},
];
