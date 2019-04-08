import React, { Component } from 'react';
import LessonList from './LessonList';
import Lesson from './Lesson';
import { withStyles, CircularProgress } from '@material-ui/core';
import styles from './style';
import api from '../../api';

class Classroom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lesson: undefined,
            file: undefined,
            loading: false
        }
    }

    async selectLesson(lesson) {
        this.setState({ loading: true });
        api.getPDF(lesson.pdfName).then(file => {
            this.setState({ lesson, file, loading: false });
        });
    }

    renderLesson() {
        if (this.state.loading) return <Progress />;
        if (this.state.lesson) return <Lesson lesson={this.state.lesson} file={this.state.file} />;
        return <div />
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.classroom}>
                <LessonList selectLesson={(lesson) => { this.selectLesson(lesson) }} />
                {this.renderLesson()}
            </div>
        );
    }
}

class Progress extends Component {

    renderLesson() {
        return <CircularProgress />
    }

    render() {
        return (
            <div style={{
                paddingLeft: "320px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}>
                <CircularProgress style={{height: "50px", width: "50px"}}/>
            </div>
        );
    }
}

export default withStyles(styles.stylesclassroom)(Classroom);
