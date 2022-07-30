import React from "react";
import {
  AlertContext,
  DialogContext,
  BackdropContext,
  DrawerContext,
  TaskContext,
} from "../contexts";

const withAllContexts = (Component) => (props) => {
  const alert = React.useContext(AlertContext);
  const dialog = React.useContext(DialogContext);
  const backDrop = React.useContext(BackdropContext);
  const drawer = React.useContext(DrawerContext);
  const task = React.useContext(TaskContext);

  return (
    <Component
      {...props}
      alert={alert}
      dialog={dialog}
      backDrop={backDrop}
      drawer={drawer}
      task={task}
    >
      {props.children}
    </Component>
  );
};

export default withAllContexts;
