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
import { fetcher, ValidateEmail } from "../../utils";
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

export const CreateAccount = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = React.useState({
    name: false,
    email: false,
    password: false,
  });

  const onSubmit = async () => {
    const { email, password, name } = state;
    if (name && email && password) {
      //to check if the email is valid
      let emailvalid = ValidateEmail(state?.email);
      if (emailvalid) {
        const payload = {
          firstName: name,
          email: email,
          password: password,
        };
        debugger;
        let apiCall = await fetcher("signUp", "POST", payload);
        if (apiCall.status !== "FAILED") {
          history.push(Routes.login);
        }
      } else {
        setError({
          name: false,
          email: true,
          password: false,
        });
      }
    } else {
      //to find empty fields
      let emptySate = ["name", "email", "password"].find((key) => !state[key]);
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
              Create New Account
            </Typography>
            <InputComp
              value={state?.name}
              error={error?.name}
              name="name"
              top_title="Name"
              onChange={onChange}
              helperText="Please enter your Name"
              id="name"
            />
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
              top_title="Password"
              onChange={onChange}
              helperText="Please enter your password"
              type="password"
              id="password"
            />
          </CardContent>
          <CardActions>
            <Button variant={"contained"} color={"primary"} onClick={onSubmit}>
              Create
            </Button>
            <Button
              variant={"outlined"}
              onClick={() => history.push(Routes.login)}
            >
              Back
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};
