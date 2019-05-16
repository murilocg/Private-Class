import React, { Component } from 'react';
import { withStyles, Typography, Tabs, Tab } from '@material-ui/core';
import styles from './style';
import PDFViewer from '../../components/PDFViewer';
import Comments from '../../components/Comments';

class Lesson extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: 0
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
      };
    

    render(){
        const {classes, lesson, file} = this.props;
        return (
            <main className={classes.main}>
                <div className={classes.lesson}>
                    <div className={classes.videoContaner}>
                        <div className={classes.videoTitle}>{lesson.title}</div>
                        <iframe className={classes.video} src={lesson.video} />
                    </div>
                    <Tabs
                        onChange={this.handleChange}
                        value={this.state.value}
                        indicatorColor="primary"
                        textColor="primary">
                        <Tab label="Material" />
                        <Tab label="Comments" />
                    </Tabs>
                    {
                        this.state.value === 0 && (<div style={{padding: '20px', display: 'flex', flexDirection: 'column'}}>
                            <Typography style={{fontSize: "20px"}}>{"Material - " + lesson.pdfName}</Typography>
                            <PDFViewer file={{ data: file }} />
                        </div>)
                    }
                    {
                        this.state.value === 1 && (
                            <Comments lesson={lesson}/>
                        )
                    }
                </div>
            </main >
        );
    }
}

export default withStyles(styles.styleslesson)(Lesson);