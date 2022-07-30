import React from "react";
import AppAuth from "./App.auth";
import AppTheme from "./App.theme";
import AppAlert from "./App.alert";
import AppErrorBoundary from "./App.errorBoundry";
import RouterApp from "./router";
import ApolloClient from "./App.gqlclient";
import AppDrawer from "./App.drawer";
import { CssBaseline } from "@mui/material";
import AppDialog from "./App.dialog";
import AppBackdrop from "./App.backdrop";
import TaskProvider from "./contexts/taskProvider";
// import AppFirebase from "./App.firebase"; //For Push Notification thing

const App = () => {
  return (
    <ApolloClient>
      <AppErrorBoundary>
        <AppAuth>
          <AppTheme>
            <CssBaseline />
            <AppAlert>
              <AppDialog>
                <AppDrawer>
                  <AppBackdrop>
                    <TaskProvider>
                      {/* <AppFirebase> */}
                      <RouterApp />
                      {/* </AppFirebase> */}
                    </TaskProvider>
                  </AppBackdrop>
                </AppDrawer>
              </AppDialog>
            </AppAlert>
          </AppTheme>
        </AppAuth>
      </AppErrorBoundary>
    </ApolloClient>
  );
};
export default App;
