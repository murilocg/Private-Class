import React, { Component } from 'react';
import API from '../../api';
import { Drawer, ListItem, ListItemText, List, withStyles, Typography } from '@material-ui/core';
import styles from './style';

class LessonList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lessons: []
        }
    }

    componentDidMount() {
        API.getLessons(lessons => {
            this.props.selectLesson(lessons[0]);
            this.setState({ lessons })
        });
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
                <List className={classes.list}>
                    {this.state.lessons.map((c, i) => {
                        return (
                            <ListItem className={classes.item} classes={{ selected: classes.itemSelected }} button key={i} onClick={() => { this.props.selectLesson(c) }}>
                                <div className={classes.itemText}>{c.title}</div>
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
        );
    }
}

export default withStyles(styles.styleslessonlist)(LessonList);