import React, { Component } from 'react';
import { Button, withStyles, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem } from '@material-ui/core';
import Files from 'react-files';

class FormUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user ? this.props.user : {},
            open: true
        }
        this.handleClose = this.handleClose.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.cancel = this.cancel.bind(this);
        this.save = this.save.bind(this);
    }

    handleClose() {
        this.setState({ user: {} })
    }

    onChangeEmail(e) {
        let user = { ...this.state.user, email: e.target.value };
        this.setState({ user })
    }


    onChangeName(e) {
        let user = { ...this.state.user, name: e.target.value };
        this.setState({ user })
    }


    onChangeType(e) {
        let user = { ...this.state.user, type: e.target.value };
        this.setState({ user })
    }

    onChangePassword(e) {
        let user = { ...this.state.user, password: e.target.value };
        this.setState({ user });
    }

    save() {
        this.setState({ open: false, user: {} });
        this.props.save(this.state.user);
    }

    cancel() {
        this.setState({ open: false, user: {} });
        this.props.cancel();
    }

    componentWillReceiveProps(props) {
        this.setState({ open: props.open });
    }

    render() {
        const { classes } = this.props;
        const {email, name, type, password} = this.state.user;
        return (
            <Dialog
                open={true}
                onClose={this.handleClose}>
                <DialogTitle>New User</DialogTitle>
                <DialogContent className={classes.modaluser}>
                    <TextField className={classes.input} label="Email" onChange={this.onChangeEmail} value={email ? email : ""}  fullWidth />
                    <TextField className={classes.input} label="Name" onChange={this.onChangeName} value={name ? name : ""} fullWidth />
                    <TextField className={classes.input} label="Password" type='password' value={password ? password : ""} onChange={this.onChangePassword} fullWidth />
                    <Select value={type ? type : ''} onChange={this.onChangeType}>
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        <MenuItem value={'student'}>Student</MenuItem>
                        <MenuItem value={'admin'}>Admin</MenuItem>
                    </Select>
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
    modaluser: {
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

export default withStyles(styles)(FormUser);