import React, { Component } from 'react';
import api from '../api';
import { TextField, withStyles } from '@material-ui/core';

class InputComment extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: ''
        }
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    async save(){
        await api.createComment(
            this.state.text, 
            localStorage.getItem('id'), 
            localStorage.getItem('name'),  
            this.props.lesson.id);
        this.setState({text: ''});
        this.props.loadComments();    
    }

    async onKeyPress(e){
        if (!e) e = window.event;
        const keyCode = e.keyCode || e.which;
        if (keyCode == '13'){
          this.save();  
        }
    }

    render(){
        const {classes} = this.props;
        return (<div className={classes.inputcomment}>
            <TextField className={classes.input} fullWidth value={this.state.text} placeholder="type a question here" onChange={(e) => {this.setState({text: e.target.value})}} onKeyPress={this.onKeyPress} variant="filled"/>
        </div>)
    }
}

const styles = theme => ({
    inputcomment: {
        
    },
    input: {
        background: '#f1f1f1',
        borderRadius: '5px',
    }
  });

export default withStyles(styles)(InputComment);

