import { get } from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  INotificationInvite,
  INotificationMessage,
} from "./constants/NotificationTypes";
import { IWorkspace } from "./constants/WorkspaceTypes";

import { DashboardLayout, DefaultLayout } from "./layouts";
import PrivateRoute from "./PrivateRoute";
import {
  BootView,
  DashboardView,
  ForgotPasswordView,
  LandingView,
  LoginView,
  ManageWorkspacesView,
  RegisterView,
  ReportsView,
  ResetPasswordView,
  SettingsView,
  TrackerView,
  VerifyView,
} from "./views";
import CheckAuth from "./views/CheckAuth";
import routes from "./routes.config";

interface RoutesProps {
  userLoggedIn: Boolean | null;
  defaultWorkspace: IWorkspace | null;
  workspaces: IWorkspace[] | null;
  notificationsArray: (INotificationInvite | INotificationMessage)[] | null;
}

const Routes: React.FC<RoutesProps> = ({
  userLoggedIn,
  defaultWorkspace,
  workspaces,
  notificationsArray,
}) => {
  return (
    <>
      {typeof userLoggedIn !== "boolean" ? (
        <CheckAuth />
      ) : (
        <Switch>
          {userLoggedIn && (
            <Route path="/dashboard/:path?">
              <DashboardLayout>
                {defaultWorkspace === null ||
                workspaces === null ||
                notificationsArray === null ? (
                  <BootView />
                ) : (
                  <>
                    <Switch>
                      {routes.map((route) => (
                        <PrivateRoute
                          key={route.path}
                          path={route.path}
                          exact={route.exact}
                          Component={route.component}
                          roles={route.roles ? route.roles : undefined}
                        />
                      ))}

                      <Redirect to="/dashboard/tracker" />
                    </Switch>
                  </>
                )}
              </DashboardLayout>
            </Route>
          )}
          <Route>
            <DefaultLayout>
              <>
                <Switch>
                  <Route path="/" exact component={LandingView} />
                  <Route
                    path="/login"
                    exact
                    render={() =>
                      !userLoggedIn ? (
                        <LoginView />
                      ) : (
                        <Redirect to="/dashboard/tracker" />
                      )
                    }
                  />
                  <Route
                    path="/register"
                    exact
                    render={() =>
                      !userLoggedIn ? (
                        <RegisterView />
                      ) : (
                        <Redirect to="/dashboard/tracker" />
                      )
                    }
                  />
                  <Route
                    path="/reset"
                    exact
                    render={() =>
                      !userLoggedIn ? (
                        <ForgotPasswordView />
                      ) : (
                        <Redirect to="/dashboard/tracker" />
                      )
                    }
                  />
                  <Route
                    path="/reset/:token"
                    exact
                    render={(props) =>
                      !userLoggedIn ? (
                        <ResetPasswordView token={props.match.params.token} />
                      ) : (
                        <Redirect to="/dashboard/tracker" />
                      )
                    }
                  />
                  <Route
                    path="/verify/:token"
                    exact
                    render={(props) =>
                      !userLoggedIn ? (
                        <VerifyView token={props.match.params.token} />
                      ) : (
                        <Redirect to="/dashboard/tracker" />
                      )
                    }
                  />
                  <Route path="*" render={() => <Redirect to="/login" />} />
                </Switch>
              </>
            </DefaultLayout>
          </Route>
        </Switch>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userLoggedIn: get(state, "auth.userLoggedIn", null),
    defaultWorkspace: get(
      state,
      "boot.defaultWorkspace.defaultWorkspace",
      null
    ),
    workspaces: get(state, "boot.workspaces.workspaces", null),
    notificationsArray: get(
      state,
      "boot.notifications.notificationsArray",
      null
    ),
  };
};

export default connect(mapStateToProps)(Routes);
