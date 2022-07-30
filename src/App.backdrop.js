import React from "react";
import { BackdropContext } from "./contexts";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";

import withStyles from '@mui/styles/withStyles';

const styles = (theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});

class AppBackDrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            message: '',
            setBackDrop: () => null
        };
    }

    close = () => {
        this.setState({
            open: false,
            message: ""
        });
    };

    set = (props) => {
        this.setState({ ...props });
    };

    render() {

        const { classes } = this.props;

        const {
            open,
            message
        } = this.state;

        return (
            <BackdropContext.Provider
                value={{
                    ...this.state,
                    setBackDrop: this.set,
                }}
            >
                {this.props.children}
                <Backdrop className={classes.backdrop} open={open} onClick={this.close}>
                    <Grid container direction="column" alignItems="center" justifyContent="center">
                        <Grid item>
                            <CircularProgress color="inherit" />
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" color="inherit" >{message}</Typography>
                        </Grid>
                    </Grid>
                </Backdrop>
            </BackdropContext.Provider>
        );
    }
}

export default withStyles(styles)(AppBackDrop);
