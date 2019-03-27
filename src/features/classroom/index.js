import React, { Component } from 'react';
import LessonList from './LessonList';
import Lesson from './Lesson';
import { withStyles } from '@material-ui/core';
import styles from './style';
import api from '../../api';

class Classroom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lesson: undefined,
            file: undefined
        }
    }

    async selectLesson(lesson) {
        const file = await api.getPDF(lesson.pdfName);
        this.setState({ lesson, file });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.classroom}>
                <LessonList selectLesson={(lesson) => { this.selectLesson(lesson) }} />
                {
                    this.state.lesson && <Lesson lesson={this.state.lesson} file={this.state.file} />
                }
            </div>
        );
    }
}

export default withStyles(styles.stylesclassroom)(Classroom);
