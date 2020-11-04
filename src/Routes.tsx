import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import { DashboardLayout, DefaultLayout } from "./layouts";
import {
  DashboardView,
  ForgotPasswordView,
  LandingView,
  LoginView,
  RegisterView,
  ResetPasswordView,
  SettingsView,
  TrackerView,
  VerifyView,
} from "./views";

interface RoutesProps {
  userLoggedIn?: Boolean | undefined;
}

const Routes: React.FC<RoutesProps> = ({ userLoggedIn }) => {
  const isAuthenticated = userLoggedIn;

  return (
    <Switch>
      <Route path="/dashboard/:path?" exact>
        <DashboardLayout>
          <Switch>
            <Route
              path="/dashboard/home"
              exact
              render={() =>
                isAuthenticated ? <DashboardView /> : <Redirect to="/login" />
              }
            />
            <Route
              path="/dashboard/settings"
              exact
              render={() =>
                isAuthenticated ? <SettingsView /> : <Redirect to="/login" />
              }
            />
            <Route
              path="/dashboard/tracker"
              exact
              render={() =>
                isAuthenticated ? <TrackerView /> : <Redirect to="/login" />
              }
            />

            {/* Catch */}
            <Redirect to="/dashboard/home" />
          </Switch>
        </DashboardLayout>
      </Route>

      <Route>
        <DefaultLayout>
          <Switch>
            <Route path="/" exact component={LandingView} />
            <Route
              path="/login"
              exact
              render={() =>
                !isAuthenticated ? (
                  <LoginView />
                ) : (
                  <Redirect to="/dashboard/home" />
                )
              }
            />
            <Route
              path="/register"
              exact
              render={() =>
                !isAuthenticated ? (
                  <RegisterView />
                ) : (
                  <Redirect to="/dashboard/home" />
                )
              }
            />
            <Route
              path="/reset"
              exact
              render={() =>
                !isAuthenticated ? (
                  <ForgotPasswordView />
                ) : (
                  <Redirect to="/dashboard/home" />
                )
              }
            />
            <Route
              path="/reset/:token"
              exact
              render={(props) =>
                !isAuthenticated ? (
                  <ResetPasswordView token={props.match.params.token} />
                ) : (
                  <Redirect to="/dashboard/home" />
                )
              }
            />
            <Route
              path="/verify/:token"
              exact
              render={(props) =>
                !isAuthenticated ? (
                  <VerifyView token={props.match.params.token} />
                ) : (
                  <Redirect to="/dashboard/home" />
                )
              }
            />

            <Redirect to="/" />
          </Switch>
        </DefaultLayout>
      </Route>
    </Switch>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userLoggedIn: state.auth.userLoggedIn,
  };
};

export default connect(mapStateToProps)(Routes);
