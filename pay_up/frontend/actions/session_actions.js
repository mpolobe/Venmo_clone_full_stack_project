import React from 'react';
import * as SessionAPIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';

export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

export const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
});

export const receiveErrors = errors => {
    // debugger
    return({
        type: RECEIVE_ERRORS,
        errors
    })
};

export const login = user => dispatch => (
    SessionAPIUtil.login(user).then(
        user => dispatch(receiveCurrentUser(user)),
        errors => dispatch(receiveErrors(errors.responseJSON)))
)

export const logout = () => dispatch => (
    SessionAPIUtil.logout().then(
        () => dispatch(logoutCurrentUser()),
        errors => dispatch(receiveErrors(errors.responseJSON)))
)

export const signup = user => dispatch => (
    SessionAPIUtil.signup(user).then(
        user => dispatch(receiveCurrentUser(user)),
        errors => dispatch(receiveErrors(errors.responseJSON)))
)

export const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS
})