import React, { Component } from 'react';
import { Button, withStyles, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import Files from 'react-files';

class FormLesson extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lesson: {

            },
            open: true
        }
        this.handleClose = this.handleClose.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeVideo = this.onChangeVideo.bind(this);
        this.onChangeMaterial = this.onChangeMaterial.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.cancel = this.cancel.bind(this);
        this.save = this.save.bind(this);
    }

    handleClose() {
        this.setState({ lesson: {} })
    }

    onChangeTitle(e) {
        let lesson = { ...this.state.lesson, title: e.target.value };
        this.setState({ lesson })
    }


    onChangeVideo(e) {
        let lesson = { ...this.state.lesson, video: e.target.value };
        this.setState({ lesson })
    }


    onChangeMaterial(e) {
        let lesson = { ...this.state.lesson, material: e.target.value };
        this.setState({ lesson })
    }

    onChangeFile(files) {
        let lesson = { ...this.state.lesson, file: files[0] };
        this.setState({ lesson });
    }

    save() {
        this.setState({ open: false, lesson: {} });
        this.props.save(this.state.lesson);
    }

    cancel() {
        this.setState({ open: false });
    }

    componentWillReceiveProps(props) {
        this.setState({ open: props.open });
    }

    render() {
        const { classes } = this.props;
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}>
                <DialogTitle>New Lesson</DialogTitle>
                <DialogContent className={classes.modallesson}>
                    <TextField className={classes.input} label="Title" onChange={this.onChangeTitle} fullWidth />
                    <TextField className={classes.input} label="Video" onChange={this.onChangeVideo} fullWidth />
                    <TextField className={classes.input} label="Material" onChange={this.onChangeMaterial} fullWidth />
                    <Files
                        className={classes.inputfile}
                        onChange={this.onChangeFile}
                        accepts={['.pdf']}
                        maxFiles={1}
                        minFileSize={0}
                        clickable
                    >
                    Select a PDF
                    </Files>
                    {this.state.lesson &&  this.state.lesson.file && <label>{this.state.lesson.file.name}</label>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.cancel} color="primary">Cancel</Button>
                    <Button className={classes.confirmbtn} variant="contained" onClick={this.save} >Save</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const styles = theme => ({
    modallesson: {
        width: 300,
    },
    input: {
        paddingTop: 10,
    },
    inputfile: {
        color: '#777777',
        background: '#f2f2f2',
        width: '150px',
        marginTop: '10px',
        padding: '5px',
        borderRadius: '10px',
        border: '1px solid #CECECE',
        fontWeight: 'bold',
        cursor: 'pointer',
        textAlign: 'center'
    },
    confirmbtn: {
        background: '#470d63',
        color: 'white',
        fontWeight: 'bold',
    }
});

export default withStyles(styles)(FormLesson);