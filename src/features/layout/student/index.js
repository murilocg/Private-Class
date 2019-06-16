import React, { Component } from 'react';
import { AppBar, IconButton, Typography, Toolbar, withStyles } from '@material-ui/core';
import { ExitToApp, Group, School } from '@material-ui/icons'
import styles from '../style';
import api from '../../../api';
import {Link} from 'react-router-dom';

class LayoutStudent extends Component {

    logout() {
        api.logout();
    }

    getFirstLetter(){
        const user = api.getCurrentUser();
        return user.name.substr(0,1).toUpperCase();
    }

    getUserName(){
        const user = api.getCurrentUser();
        return user.name;
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar} position="fixed">
                    <Toolbar className={classes.toolbar}>
                        <div className={classes.user}>
                            <Typography className={classes.avatar} variant="h6" color="inherit" noWrap>{this.getFirstLetter()}</Typography>
                            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                {this.getUserName()}
                            </Typography>
                        </div>
                        <div className={classes.sectionDesktop}>
                            <IconButton>
                                <Link to="/student/classroom">
                                    <School className={classes.icon} />
                                </Link>
                            </IconButton>
                            <IconButton>
                                <Link to="/student/tutors">
                                    <Group className={classes.icon} />
                                </Link>
                            </IconButton>
                            <IconButton onClick={() => { this.logout() }}>
                                <ExitToApp className={classes.icon} />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {this.props.main}
            </div>
        );
    }
}

export default withStyles(styles)(LayoutStudent);
