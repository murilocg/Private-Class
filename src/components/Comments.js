import React, { Component } from 'react';
import api from '../api';
import InputComment from './InputComment';
import ListComments from './ListComments';
import {withStyles} from '@material-ui/core';

class Comments extends Component {

    constructor(props){
        super(props);
        this.state = {
            comments:[],
        }
        this.loadComments = this.loadComments.bind(this);
    }

    async loadComments(){
        console.log('comments', this.props.lesson);
        const comments = await api.getComments(this.props.lesson.id);
        this.setState({comments});
    }

    componentDidMount(){
        this.loadComments();
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.commentContainer}>
                <InputComment lesson={this.props.lesson} loadComments={this.loadComments}/>
                <ListComments comments={this.state.comments}/>
            </div>);
    }
}

const styles = theme => ({
    
  });

export default withStyles(styles)(Comments);