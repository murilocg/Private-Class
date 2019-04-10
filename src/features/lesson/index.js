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
            modal: false
        }
    }

    async getLessons() {
        api.getLessonsWithAvaliation().then(lessons => this.setState({ lessons }));
    }

    componentDidMount() {
        this.getLessons();
    }

    openLesson(lesson) {
        this.setState({ modal: true, lesson });
    }

    openConfirmRemove(lesson) {
        this.setState({ confirm: true, lesson });
    }

    async remove() {
        this.setState({confirm: false});
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
        this.setState({ modal: false });
        if (lesson) {
            swal('Created!', 'Lesson created with success', 'success');
        } else {
            swal('Ops!', 'Sorry, something went wrong', 'error');
        }
        this.getLessons();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.managelessons}>
                <div className={classes.boxaddlesson}>
                    <div className={classes.title}>Manage Lessons</div>
                    <Button className={classes.addlesson} variant="contained" onClick={() => this.openLesson(this.state.lesson)}><Add />Novo</Button>
                </div>
                <LessonsTable lessons={this.state.lessons} onRemove={(lesson) => { this.openConfirmRemove(lesson) }} />
                <FormLesson open={this.state.modal} save={(l) => this.save(l)} />
                <ConfirmDialog
                    open={this.state.confirm}
                    title="Confirmação"
                    text="Tem certeza que deseja remove?"
                    clickYes={() => { this.remove() }}
                    clickNo={() => { this.setState({ confirm: false }) }} />
            </div>
        );
    }
}

export default withStyles(styles)(LessonManager);