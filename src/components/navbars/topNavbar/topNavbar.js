import React from "react";
import { useHistory } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { LocalStorageKeys } from "../../../utils";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";
import { SideNavBar } from "..";
import { Routes } from "../../../router/routes";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    zIndex: theme.zIndex.drawer + 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    display: "block",
  },
  titleContainer: {
    marginLeft: theme.spacing(2),
  },
  menuIcon: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export const TopNavBar = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = React.useState({
    openSideNavBar: false,
  });

  const handleLogout = () => {
    localStorage.removeItem(LocalStorageKeys.authToken);
    history.push(Routes.home);
  };

  const toogleSideNavBar = () => {
    setState({
      ...state,
      openSideNavBar: !state.openSideNavBar,
    });
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classes.menuIcon}
            onClick={toogleSideNavBar}
            size="large"
          >
            <MenuIcon htmlColor="white" />
          </IconButton>

          <div className={classes.titleContainer}>
            <Typography className={classes.title} variant="h6" noWrap>
              To Do App
            </Typography>
            <Typography variant="caption">
              {`v${localStorage.getItem(LocalStorageKeys.version)}`}
            </Typography>
          </div>

          <div className={classes.grow} />

          <IconButton
            aria-label="logout button"
            aria-controls={"logout_button"}
            aria-haspopup="true"
            onClick={handleLogout}
            color="inherit"
            size="large"
          >
            <LogoutIcon />
          </IconButton>

          <Drawer
            open={state.openSideNavBar}
            variant={"temporary"}
            anchor="left"
            onClose={toogleSideNavBar}
          >
            <div style={{ width: 240 }}>
              <SideNavBar isMobile={true} />
            </div>
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  );
};
