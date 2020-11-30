import { LinearProgress, Typography } from "@material-ui/core";
import { get } from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { isLoggedIn } from "../../actions/isLoggedIn";
import { Page } from "../../components";
import { requestApi } from "../../utils/api";

interface CheckAuthProps {
  userLoggedIn: boolean | null;
  isLoggedIn: () => void;
}

const CheckAuth: React.FC<CheckAuthProps> = ({ userLoggedIn, isLoggedIn }) => {
  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <Page title="Authenticating">
      <Typography variant="h1">Checking Authentication Status</Typography>
      <LinearProgress variant="indeterminate" />
    </Page>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userLoggedIn: get(state, "auth.userLoggedIn", null),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    isLoggedIn: () => dispatch(isLoggedIn()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckAuth);
