import React from "react";
import { Grid, Typography, Link } from "@mui/material";

import withStyles from '@mui/styles/withStyles';

const styles = (theme) => ({
  root: {
    height: "100vh",
    width: "100%",
  },
});

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    console.log('info:', info)
    console.log('error:', error)
    
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service

    //TODO:
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Grid
          container
          classes={this.props.classes.root}
          id="error_catcher_root"
          className={this.props.classes.root}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item id="error_catcher_item1">
            <Typography id="error_catcher_typo1" variant="h1">
              500
            </Typography>

            <Typography id="error_catcher_typo2" variant="h2">
            Oops! Something went wrong.
            </Typography>

            <Link id="error_catcher_link" href="/" underline="hover">
              Try again
            </Link>
          </Grid>
        </Grid>
      );
    }
    return this.props.children;
  }
}

export default withStyles(styles)(AppErrorBoundary);
