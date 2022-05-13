import React from "react";
import {
  BrowserRouter,
  Route,
  Router,
  Switch,
  Redirect,
} from "react-router-dom";

import { isAuthenticated } from "./services/auth";
import { history } from "./helpers/history";

import User from "./pages/User";
import Board from "./pages/Board";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserForm from "./pages/UserForm";

import Project from "./pages/Project";
import ProjectList from "./pages/ProjectList";
import ProjectForm from "./pages/ProjectForm";
import ProjectParticipants from "./pages/ProjectParticipants";

import Report from "./pages/Report";
import ReportList from "./pages/ReportList";
import ReportForm from "./pages/ReportForm";

import IndexPage from "./pages/IndexPage";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

const OnlyPublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Router history={history}>
      <Switch>
        <OnlyPublicRoute exact path="/" component={IndexPage} />
        <OnlyPublicRoute path="/login" component={Login} />
        <OnlyPublicRoute path="/cadastro" component={Register} />
        <PrivateRoute exact path="/user/:nickname" component={User} />
        <PrivateRoute exact path="/user/:id/edit" component={UserForm} />
        <PrivateRoute path="/project/new" component={ProjectForm} />
        <PrivateRoute path="/project/:id/edit" component={ProjectForm} />
        <PrivateRoute exact path="/project/:id" component={Project} />
        <PrivateRoute path="/projects" component={ProjectList} />
        <PrivateRoute path="/reports" component={ReportList} />
        <PrivateRoute path="/project/:id/report/new" component={ReportForm} />
        <PrivateRoute
          exact
          path="/project/:id/report/:reportid/edit"
          component={ReportForm}
        />
        <PrivateRoute path="/project/:id/report/:reportid" component={Report} />
        <PrivateRoute path="/project/:id/board" component={Board} />
        <PrivateRoute
          path="/project/:id/participants"
          component={ProjectParticipants}
        />

        <Route path="*" component={() => <h1>Pagina não encontrada</h1>} />
      </Switch>
    </Router>
  </BrowserRouter>
);

export default Routes;
