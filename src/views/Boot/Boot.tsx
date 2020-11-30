import { LinearProgress, Typography } from "@material-ui/core";
import { get } from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  defaultWorkspace,
  getAllWorkspaces,
  getUnreadNotifications,
} from "../../actions/boot";
import { Page } from "../../components";

interface BootProps {
  defaultWorkspaceId: string;
  userId: string;
  getDefaultWorkspace: (workspaceId: string) => Promise<void>;
  getAllWorkspaces: () => Promise<void>;
  getUnreadNotifications: (userId: string) => Promise<void>;
}

const Boot: React.FC<BootProps> = ({
  defaultWorkspaceId,
  userId,
  getDefaultWorkspace,
  getAllWorkspaces,
  getUnreadNotifications,
}) => {
  useEffect(() => {
    getDefaultWorkspace(defaultWorkspaceId)
      .then(() => {
        getUnreadNotifications(userId);
      })
      .then(() => {
        getAllWorkspaces();
      });
  }, []);

  return (
    <Page title="Booting">
      <Typography variant="h1">Requesting data</Typography>
      <LinearProgress variant="indeterminate" />
    </Page>
  );
};

const mapStateToProps = (state: any) => {
  return {
    defaultWorkspaceId: get(state, "auth.user.defaultWorkspace", null),
    userId: get(state, "auth.user.id", null),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDefaultWorkspace: (workspaceId: string) =>
      dispatch(defaultWorkspace(workspaceId)),
    getAllWorkspaces: () => dispatch(getAllWorkspaces()),
    getUnreadNotifications: (userId: string) =>
      dispatch(getUnreadNotifications(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Boot);
