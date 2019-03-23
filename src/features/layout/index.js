import React, { Component } from 'react';
import { AppBar, IconButton, Typography, Toolbar, withStyles } from '@material-ui/core';
import { ExitToApp, Group, School } from '@material-ui/icons'
import styles from './style';

class MainLayout extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar className={classes.toolbar}>
                        <div className={classes.user}>
                            <Typography className={classes.avatar} variant="h6" color="inherit" noWrap>J</Typography>
                            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                Joãozinho
                            </Typography>
                        </div>
                        <div className={classes.sectionDesktop}>
                            <IconButton>
                                <School className={classes.icon} />
                            </IconButton>
                            <IconButton>
                                <Group className={classes.icon} />
                            </IconButton>
                            <IconButton>
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

export default withStyles(styles)(MainLayout);
