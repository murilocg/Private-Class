import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

class ListComments extends Component {
    render(){
        const {classes} = this.props;
        return (<div style={{padding: '20px'}}>
           {
                this.props.comments.map(c => {
                    return (
                        <div key={c.id} className={classes.comment}>
                            <div className={classes.commentUser}>
                                {c.username.substring(0,1).toUpperCase()}
                            </div>
                            <div className={classes.commentText}>
                            {c.text}
                            </div>
                        </div>
                    );
                })
            }
        </div>)
    }
}

const styles = theme => ({
    comment: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px 0px',
        borderBottom: '1px solid #f1f1f1'
    },
    commentUser: {
        background: '#429f35',
        padding: '10px 15px',
        color: 'white',
        borderRadius: '20px',
        fontWeight: 'bold'
    },
    commentText: {
        marginLeft: '15px'
    }
  });

export default withStyles(styles)(ListComments);