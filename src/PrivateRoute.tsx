import { get } from 'lodash'
import React, { ComponentType } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

interface PrivateRouteProps {
  Component: ComponentType<any>;
  roles?: any[];
  userLoggedIn: boolean | null;
  user: { [key: string]: any } | null;
  path: string;
  exact: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  Component,
  roles,
  userLoggedIn,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (!userLoggedIn || !user) {
        return <Redirect to="/login" />
      }
      const currentMembership = user.memberships.find(
        (x: any) => x.workspaceId === user.activeWorkspace
      )

      if (roles && roles.indexOf(currentMembership.permissions) === -1) {
        return <Redirect to="/dashboard/tracker" />
      }

      return <Component {...props} />
    }}
  />
)

const mapStateToProps = (state: any) => ({
  user: get(state, 'auth.user', null),
  userLoggedIn: get(state, 'auth.userLoggedIn', null)
})

export default connect(mapStateToProps)(PrivateRoute)
