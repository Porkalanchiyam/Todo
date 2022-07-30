import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { LocalStorageKeys, ValidateEmail } from "../../utils";
import { useHistory } from "react-router-dom";
import { Routes } from "../../router/routes";
import { InputComp } from "../../components";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: theme.palette.background.default,
    "& .MuiCardActions-root": {
      justifyContent: "center",
    },
  },
}));

export const Login = (props) => {
  // <--------------------- Hooks ------------>
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState({
    email: false,
    password: false,
  });

  // <--------------------- Hanler ------------>
  const onLogin = () => {
    const { email, password } = state;
    if (email && password) {
      //to check if the email is valid
      let emailvalid = ValidateEmail(state?.email);
      if (emailvalid) {
        localStorage.setItem(LocalStorageKeys.authToken, "authtoken");
        history.push(Routes.home);
      } else {
        setError({
          email: true,
          password: false,
        });
      }
    } else {
      //to find empty fields
      let emptySate = ["email", "password"].find((key) => !state[key]);
      setError({
        ...error,
        [emptySate]: true,
      });
    }
  };

  //onChange handler
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    setError({
      ...error,
      [e.target.name]: false,
    });
  };
  const CreateAccount = () => {
    history.push(Routes.createAccount);
  };

  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Login
            </Typography>
            <InputComp
              value={state?.email}
              error={error?.email}
              name="email"
              top_title="Email"
              onChange={onChange}
              helperText="Please enter your Valid email"
              id="email"
            />
            <InputComp
              value={state?.password}
              error={error?.password}
              name="password"
              top_title="PassWord"
              onChange={onChange}
              helperText="Please enter your password"
              type="password"
              id="password"
            />
          </CardContent>
          <CardActions>
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={() => onLogin()}
            >
              LogIn
            </Button>
            <Button onClick={() => CreateAccount()} autoFocus>
              Create Account
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};
