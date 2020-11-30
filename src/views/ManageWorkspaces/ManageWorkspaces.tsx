import { Typography } from '@material-ui/core';
import React from 'react';
import { Page } from '../../components';

interface ManageWorkspacesProps {}

const ManageWorkspaces: React.FC<ManageWorkspacesProps> = ({}) => (
  <Page title="Manage your Workspaces">
    <Typography>Manage your workspaces</Typography>
  </Page>
);

export default ManageWorkspaces;
