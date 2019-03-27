import React, { Component } from 'react';
import API from '../../api';
import { Drawer, ListItem, ListItemText, List, withStyles } from '@material-ui/core';
import styles from './style';

class LessonList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lessons: []
        }
    }

    componentDidMount() {
        API.getLessons(lessons => this.setState({lessons}));
    }

    render() {
        const { classes } = this.props;
        return (
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}>
                <div className={classes.toolbar} />
                <List style={{marginTop: "60px"}}>
                    {this.state.lessons.map((c, i) => {
                        return (
                            <ListItem button key={i} onClick={() => { this.props.selectLesson(c) }}>
                                <ListItemText primary={c.title} />
                            </ListItem>
                        );
                        })}
                </List>
            </Drawer>
        );
    }
}

export default withStyles(styles.styleslessonlist)(LessonList);