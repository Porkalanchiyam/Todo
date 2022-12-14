import React from "react";
import { DialogContext } from "./contexts";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import withStyles from '@mui/styles/withStyles';


const styles = (theme) => ({
  dialog: {
    '& .MuiDialogActions-root': {
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        '& .MuiButtonBase-root': {
          width: '80%',
          '&:not(:first-child)': {
            marginTop: '10px'
          }
        },
      },
    }
  },
  title: {
    textAlign: 'center'
  },
  dialogActions: {
    padding: '0px 24px 16px 24px'
  }
})


class AppDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: "",
      body: "",
      positiveBtn: "Ok",
      negativeBtn: "Cancel",
      negativeBtnDontShow: false,
      onOk: () => null,
      onCancel: this.close,
    };
  }

  close = () => {
    this.setState({
      open: false,
    });
  };

  set = (props) => {
    this.setState({ ...props });
  };

  render() {
    const { classes } = this.props
    return (
      <DialogContext.Provider
        value={{
          ...this.state,
          setDialog: this.set,
        }}
      >
        {this.props.children}
        <Dialog
          open={this.state.open}
          onClose={this.state.onCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          classes={
            {
              paper: classes.dialog
            }
          }
        >
          <DialogTitle id="alert-dialog-title" className={classes.title}>{this.state.title}</DialogTitle>
          {this.state.body &&
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {this.state.body}
              </DialogContentText>
            </DialogContent>
          }
          <DialogActions className={classes.dialogActions}>
            {!Boolean(this.state?.negativeBtnDontShow) &&
              <Button onClick={this.state.onCancel} color="primary" variant="outlined">
                {this.state.negativeBtn}
              </Button>}
            <Button onClick={this.state.onOk} color="primary" variant="contained">
              {this.state.positiveBtn}
            </Button>
          </DialogActions>
        </Dialog>
      </DialogContext.Provider>
    );
  }
}

export default withStyles(styles)(AppDialog);
