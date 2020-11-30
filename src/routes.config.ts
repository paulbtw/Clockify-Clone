import { MembershipPermissions } from './types/userRoles';
import {
  ClientsView,
  DashboardView,
  ManageWorkspacesView,
  ProjectsView,
  ReportsView,
  SettingsView,
  TagsView,
  TeamsView,
  TrackerView,
  WorkspaceSettingsView,
} from './views';

export default [
  {
    path: '/dashboard/tracker',
    exact: true,
    component: TrackerView,
  },
  {
    path: '/dashboard/reports',
    exact: true,
    component: ReportsView,
  },
  {
    path: '/dashboard',
    exact: true,
    component: DashboardView,
  },
  {
    path: '/dashboard/projects',
    exact: true,
    component: ProjectsView,
  },
  {
    path: '/dashboard/teams',
    exact: true,
    component: TeamsView,
  },
  {
    path: '/dashboard/profile',
    exact: true,
    component: SettingsView,
  },
  {
    path: '/dashboard/workspaces',
    exact: true,
    component: ManageWorkspacesView,
  },
  {
    path: '/dashboard/tags',
    exact: true,
    component: TagsView,
  },
  {
    path: '/dashboard/clients',
    exact: true,
    component: ClientsView,
    roles: [
      MembershipPermissions.WORKSPACE_ADMIN,
      MembershipPermissions.WORKSPACE_OWN,
    ],
  },
  {
    path: '/dashboard/settings',
    exact: true,
    component: WorkspaceSettingsView,
    roles: [
      MembershipPermissions.WORKSPACE_ADMIN,
      MembershipPermissions.WORKSPACE_OWN,
    ],
  },
];
