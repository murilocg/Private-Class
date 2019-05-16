import React, { Component } from 'react';
import { withStyles, TextField, Button } from '@material-ui/core';
import styles from './style';
import api from '../../api';
import history from '../../components/history';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: undefined,
            password: undefined,
            error: false, 
            msg: ''
        }
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.login = this.login.bind(this);
    }

    onChangeUser(e) {
        this.setState({ username: e.target.value });
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    login() {
        const { username, password } = this.state;
        let error = false;
        let msg = '';
        if (!username || username.length === 0) {
            error = true;
            msg = 'Email is required';
        } else if (!password || password.length === 0) {
            error = true;
            msg = 'Password is required';
        }
        if (error) {
            this.setState({ error, msg });
            return;
        }
        api.login(this.state.username, this.state.password).then((user) => {
            if (!user) {
                this.setState({ error: true, msg: 'User or password invalid' });    
            }else if(user.type === 'admin'){
                window.location.replace('/admin/lessons');
            }else{
                window.location.replace('/student/classroom');
            }
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.containerLogin}>
                <div>
                    <div className={classes.boxLogo}>
                        <img className={classes.logo} src="/images/logo.jpeg" height={100} />
                    </div>
                    <div className={classes.boxLogin}>
                        {
                            this.state.error && <div className={classes.errorMsg}>{this.state.msg}</div>
                        }
                        <div className={classes.boxInput}>
                            <div className={classes.email}>
                                <TextField label="Email" fullWidth={true} onChange={this.onChangeUser} />
                            </div>
                            <div className={classes.password}>
                                <TextField label="Password" type="password" fullWidth={true} onChange={this.onChangePassword} />
                            </div>
                        </div>
                        <div className={classes.boxButton}>
                            <Button className={classes.button} onClick={this.login}>Login</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Login);
