import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import LayoutStudent from './features/layout/student';
import LayoutAdmin from './features/layout/admin';
import api from './api';
import Login from './features/login';
import Classroom from './features/classroom';

class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            loggedIn: false
        }
    }

    componentDidMount() {
        api.getCurrentUser().then((user) => {
            this.setState({ user });
        });
    }

    render() {
        const { user } = this.state;
        return (
            <Switch>
                <Route exact path="/" render={() => <Login />} />
                <Route path="/admin/lessons" render={() => isAdmin(<div >Lessons</div>, user)} />
                <Route path="/admin/users" render={() => isAdmin(<div />, user)} />
                <Route path="/student/classroom" render={() => isStudent(<Classroom />, user)} />
                <Route path="/student/tutors" render={() => isStudent(<div />, user)} />
            </Switch>
        );
    }
}

const isAdmin = (component, user) => {
    if (user && user.type !== 'admin') return <Redirect to="/" />
    return withLogin(<LayoutAdmin main={component} />);
}

const isStudent = (component, user) => {
    if (user && user.type !== 'student') return <Redirect to="/" />
    return withLogin(<LayoutStudent main={component} />);
}

const withLogin = (component) => {
    if (api.isLoggedIn()) return component;
    return <Redirect to="/" />;
}

export default withRouter(Router);