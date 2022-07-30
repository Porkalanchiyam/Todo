/**
 * @author Porkalanchiyam
 * @email kalanchiyam1@gmail.com
 * @create 30/07/2022
 * @modify 30/07/2022
 * @desc Exporting all the components from /src/components
 */

import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

//MuiAlert component which is shown inside the Snackbar component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Alerts = (props) => {
  const [open, setOpen] = React.useState(props.open);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.onclose();
    setOpen(false);
  };

  return (
    <Snackbar
      id="main_alert_snackbar"
      anchorOrigin={{
        vertical: props.vertical,
        horizontal: props.horizontal,
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert id="main_alert" severity={props.severity} onClose={handleClose}>
        {props.msg}
      </Alert>
    </Snackbar>
  );
};
