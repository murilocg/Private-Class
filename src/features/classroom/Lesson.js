import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import styles from './style';
import PDFViewer from '../../components/PDFViewer';

const Lesson = ({ classes, lesson, file }) => {
    return (
        <main className={classes.main}>
            <div className={classes.lesson}>
                <div className={classes.videoContaner}>
                    <div className={classes.videoTitle}>{lesson.title}</div>
                    <iframe className={classes.video} src={lesson.video} />
                </div>
                <PDFViewer file={{data: file}} />
            </div>
        </main >
    );
}

export default withStyles(styles.styleslesson)(Lesson);