import { LinearProgress, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Page } from "../../components";

const CheckAuth: React.FC = () => {

  return (
    <Page title="Authenticating">
      <Typography variant="h1">Checking Authentication Status</Typography>
      <LinearProgress variant="indeterminate" />
    </Page>
  );
};

export default CheckAuth;
