import React, { Component } from 'react';
import api from '../../api';
import styles from './styles';
import { Button, withStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import UserTable from './UserTable';
import FormUser from './FormUser';
import swal from 'sweetalert'
import ConfirmDialog from '../../components/ConfirmDialog';

class UserManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            modal: 0,
            user: undefined
        }
    }

    async getUsers() {
        api.getUsers().then(users => this.setState({ users }));
    }

    componentDidMount() {
        this.getUsers();
    }

    openUser() {
        this.setState({ modal: 1 });
    }

    openConfirmRemove(user) {
        this.setState({ modal: 2, user });
    }

    async remove() {
        this.setState({ modal: 0 });
        const removed = await api.removeUser(this.state.user);
        if (removed) {
            swal('Deleted!', 'User deleted with success', 'success');
        } else {
            swal('Ops!', 'Sorry, something went wrong', 'error');
        }
        this.getUsers();
    }

    async save(u) {
        if(u.id){
            this.updateUser(u);
        }else{
            this.createUser(u);
        }
    }

    async createUser(u){
        const user = await api.createUser(u);
        this.setState({ modal: 0 });
        if (user) {
            swal('Created!', 'User created with success', 'success');
        } else {
            swal('Ops!', 'Sorry, something went wrong', 'error');
        }
        this.getUsers();
    }

    async updateUser(u){
        const user = await api.updateUser(u);
        this.setState({ modal: 0 });
        if (user) {
            swal('Updated!', 'User updated with success', 'success');
        } else {
            swal('Ops!', 'Sorry, something went wrong', 'error');
        }
        this.getUsers();
    }

    openEdit(user){
        this.setState({modal: 1, user});
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.manageusers}>
                <div className={classes.boxadduser}>
                    <div className={classes.title}>Manage Users</div>
                    <Button className={classes.adduser} variant="contained" onClick={() => this.openUser()}><Add />New</Button>
                </div>
                <UserTable users={this.state.users} onRemove={(user) => { this.openConfirmRemove(user) }}  onEdit={(user) => this.openEdit(user)}/>
                {this.state.modal === 1 && <FormUser user={this.state.user} save={(u) => this.save(u)} cancel={()=>this.setState({modal:0, user: undefined})}/>}
                {this.state.modal === 2 && <ConfirmDialog
                    open={true}
                    title=""
                    text="Are you sure you want to remove this user?"
                    clickYes={() => { this.remove() }}
                    clickNo={() => { this.setState({ modal: 0 }) }} />}
            </div>
        );
    }
}

export default withStyles(styles)(UserManager);