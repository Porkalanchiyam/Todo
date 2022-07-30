import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import { Routes } from "./routes";
import PrivateRouter from "./privateRouter";

import { NotFound, Login, Home, ViewTask, CreateAccount } from "./../screens";
import TitlebarImageList from "../screens/imageGallery";

const RouterApp = (props) => {
  return (
    <Router>
      <Switch>
        {/* Login Route */}
        <Route exact path={Routes.login}>
          <Login />
        </Route>

        {/* Create Route */}
        <Route exact path={Routes.createAccount}>
          <CreateAccount />
        </Route>

        {/* Home Route */}
        <PrivateRouter exact path={Routes.home}>
          <Home />
        </PrivateRouter>

        {/* ViewTask Route */}
        <Route exact path={Routes.viewTask}>
          <ViewTask />
        </Route>
        {/* ImageList Route */}
        <Route exact path={Routes.imageList}>
          <TitlebarImageList />
        </Route>

        {/* For unknow/non-defined path */}
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default RouterApp;
