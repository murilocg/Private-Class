import React, { Component } from 'react';
import { withStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from './style';
import PDFViewer from '../../components/PDFViewer';

const moveScroll = () => {
    window.scroll(window.scrollX, -450); 
}

const Lesson = ({ classes, lesson, file }) => {
    return (
        <main className={classes.main}>
            <div className={classes.lesson}>
                <div className={classes.videoContaner}>
                    <div className={classes.videoTitle}>{lesson.title}</div>
                    <iframe className={classes.video} src={lesson.video} />
                </div>
                <ExpansionPanel onChange={()=>{moveScroll()}}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography style={{fontSize: "20px"}}>{"Material - " + lesson.pdfName}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{backgroundColor: "gray"}}>
                        <PDFViewer file={{ data: file }} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        </main >
    );
}

export default withStyles(styles.styleslesson)(Lesson);