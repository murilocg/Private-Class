import api from '../../api';
import React from 'react';
import { Redirect } from 'react-router-dom';
export const withLogin = (component) => {
    const loggedIn = api.isLoggedIn();
    if (!loggedIn) return <Redirect to="/" />
    return component;
}