import {
  BarChart as BarChartIcon,
  Clock as ClockIcon,
  Settings as SettingsIcon,
} from "react-feather";

export default [
  {
    href: "/dashboard/tracker",
    icon: ClockIcon,
    title: "Timer",
  },
  {
    href: "/dashboard/reports",
    icon: BarChartIcon,
    title: "Reports",
  },
  {
    href: "/dashboard/home",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/dashboard/settings",
    icon: SettingsIcon,
    title: "Settings",
  },
];
