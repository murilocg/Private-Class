import React, { Component } from 'react';
import { Button, withStyles, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import { StarBorder, Star} from '@material-ui/icons';
import api from '../../api';
import swal from 'sweetalert';

class DialogAvaliation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lesson: this.props.lesson,
            valor:  -1,
            avaliation: undefined
        }
        this.save = this.save.bind(this);
    }

    componentDidMount(){
        this.loadAvaliation();
    }

    async loadAvaliation(){
        const user = await api.getCurrentUser();
        const avaliation = await api.getAvaliation(this.props.lesson.id, user.id);
        if(avaliation){
            this.setState({avaliation: avaliation.id, valor: avaliation.value});
        }
    }

    async save() {
        const user = await api.getCurrentUser();
        const saved = await api.saveAvaliation(this.state.avaliation, this.state.valor, this.props.lesson.id, user.id);
        if (saved) {
            swal('Done!', 'The avaliation was successful', 'success');
        } else {
            swal('Ops!', 'Sorry, something went wrong', 'error');
        }
        this.props.close();
        this.setState({valor: 0});
    }

    renderSelectedStars(css){
        let stars = [];
        for(let i = 0; i < this.state.valor; i++){
            stars.push(<Star className={css} key={i} onClick={()=> {this.setState({valor: (i + 1)})}}/>);
        }
        return stars;
    }

    
    renderUnselectedStars(css){
        let stars = [];
        let valor = this.state.valor === -1 ? 0 : this.state.valor;
        for(let i = valor; i < 5; i++){
            stars.push(<StarBorder className={css} key={i} onClick={()=> {this.setState({valor: (i + 1)})}}/>);
        }
        return stars;
    }

    render() {
        const { classes } = this.props;
        console.log(this.props.lesson);
        return (
            <Dialog open={true}>
                <DialogTitle style={{textAlign: 'center'}}>Avaliation</DialogTitle>
                <DialogContent className={classes.modalavaliation}>
                    {
                        this.renderSelectedStars(classes.selectedStar)
                    }
                    {
                        this.renderUnselectedStars(classes.unselectedStar)
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {this.props.close()}} color="primary">Cancel</Button>
                    <Button className={classes.confirmbtn} variant="contained" onClick={this.save} >OK</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const styles = theme => ({
    modalavaliation: {
        width: 200,
        textAlign: 'center'
    },
    selectedStar: {
        cursor: 'pointer',
        color: 'yellow'
    },
    unselectedStar: {
        cursor: 'pointer'
    },
    confirmbtn: {
        background: '#470d63',
        color: 'white',
        fontWeight: 'bold',
    }
});

export default withStyles(styles)(DialogAvaliation);