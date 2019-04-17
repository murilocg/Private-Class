import React, { Component } from 'react';
import api from '../../api';
import styles from './styles';
import { Button, withStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import LessonsTable from './LessonsTable';
import FormLesson from './FormLesson';
import swal from 'sweetalert'
import ConfirmDialog from '../../components/ConfirmDialog';

class LessonManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lessons: [],
            modal: 0,
        }
    }

    async getLessons() {
        api.getLessonsWithAvaliation().then(lessons => this.setState({ lessons }));
    }

    componentDidMount() {
        this.getLessons();
    }

    openLesson() {
        this.setState({ modal: 1 });
    }

    openConfirmRemove(lesson) {
        this.setState({ modal: 2, lesson });
    }

    async remove() {
        this.setState({ modal: 0 });
        const removed = await api.removeLesson(this.state.lesson);
        if (removed) {
            swal('Deleted!', 'Lesson deleted with success', 'success');
        } else {
            swal('Ops!', 'Sorry, something went wrong', 'error');
        }
        this.getLessons();
    }

    async save(l) {
        const lesson = await api.createLesson(l);
        this.setState({ modal: 0 });
        if (lesson) {
            swal('Created!', 'Lesson created with success', 'success');
        } else {
            swal('Ops!', 'Sorry, something went wrong', 'error');
        }
        this.getLessons();
    }

    render() {
        const { classes } = this.props;
        console.log(this.state.modal);
        return (
            <div className={classes.managelessons}>
                <div className={classes.boxaddlesson}>
                    <div className={classes.title}>Manage Lessons</div>
                    <Button className={classes.addlesson} variant="contained" onClick={() => this.openLesson()}><Add />Novo</Button>
                </div>
                <LessonsTable lessons={this.state.lessons} onRemove={(lesson) => { this.openConfirmRemove(lesson) }} />
                {this.state.modal === 1 && <FormLesson open={true} save={(l) => this.save(l)} />}
                {this.state.modal === 2 && <ConfirmDialog
                    open={true}
                    title=""
                    text="Are you sure you want to remove this item?"
                    clickYes={() => { this.remove() }}
                    clickNo={() => { this.setState({ modal: 0 }) }} />}
            </div>
        );
    }
}

export default withStyles(styles)(LessonManager);