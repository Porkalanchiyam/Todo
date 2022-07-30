import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { matchPath, useHistory } from 'react-router-dom';

const drawerWidth = 56;

const useStyles = makeStyles((theme) => ({
    root: {
        width: props => props?.isMobile ? 240 : drawerWidth,
        position: 'absolute',
    },
    drawer: {
        height: props => props?.isMobile ? `100vh` : `calc(100vh - 64px)`,
        width: props => props?.isMobile ? 240 : drawerWidth,
    },
    drawerContainer: {
        overflow: 'hidden',
    },
}));

export const SideNavBar = (props) => {

    const classes = useStyles(props);

    const history = useHistory();

    const isSelected = (data) => {
        if (data.link) {
            return matchPath(history.location.pathname, {
                path: data.link
            })
        }
    }

    const onListClick = (data) => {
        if (data.link) {
            history.push(data.link)
        }
    }

    return (
        <div className={classes.root}>
            <Paper
                className={classes.drawer}
                square
            >
                <div className={classes.drawerContainer}>
                    <List>
                        {[].map((navBar, index) => (
                            <ListItem onClick={(e) => onListClick(navBar)}
                                button
                                key={index}
                                selected={isSelected(navBar)}>

                                <ListItemIcon>{navBar.icon}</ListItemIcon>

                                <ListItemText primary={navBar.name} />

                            </ListItem>
                        ))}
                    </List>
                </div>
            </Paper>
        </div>
    );
}
