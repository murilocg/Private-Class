import React, { Component } from 'react';
import { Button, withStyles} from '@material-ui/core';
import DialogAvaliation from './DialogAvaliation';
class Avaliation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Button className={classes.confirmbtn} variant="outlined" style={{position: 'absolute', right: 0, marginRight: '20px'}} onClick={() => {this.setState({open: true})}}>Avaliar</Button>
                {
                    this.state.open && <DialogAvaliation lesson={this.props.lesson} open={this.state.open} close={()=>{this.setState({open: false})}}/> 
                }
            </div>
        );
    }
}

const styles = theme => ({
    confirmbtn: {
        border: '1px solid #470d63'
    }
});

export default withStyles(styles)(Avaliation);