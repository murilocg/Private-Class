import React, { Component } from 'react';
import styles from './styles';
import { Button, withStyles, Input, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';

class FormLesson extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lesson: {

            }
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

    onChangeFile(e) {
        let lesson = { ...this.state.lesson, file: e.target.files[0] };
        this.setState({ lesson });
    }

    save() {
        this.setState({ open: false });
        this.props.save(this.state.lesson);
    }

    cancel() {
        this.setState({ open: false });
    }

    componentWillReceiveProps(props) {
        this.setState({ open: props.open, lesson: props.lesson });
    }

    render() {
        const { classes, open } = this.props;
        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Lesson</DialogTitle>
                <DialogContent>
                    <TextField label="Title" onChange={this.onChangeTitle} fullWidth />
                    <TextField label="Video" onChange={this.onChangeVideo} fullWidth />
                    <TextField label="Material" onChange={this.onChangeMaterial} fullWidth />
                    <input type="file" onChange={this.onChangeFile} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.cancel} color="primary">Cancel</Button>
                    <Button onClick={this.save} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(FormLesson);