import {
    githubToken,
    getGithubEvents as eventsUrl,
    accessTokenUrl,
    getGithubUserInfo,
} from "../network/Api";
import {handleErrors, handleDefault} from "./baseAction";

export const FETCH_EVENTS_BEGIN = 'FETCH_EVENTS_BEGIN';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';
const fetchEventsBegin = () => ({
    type: FETCH_EVENTS_BEGIN
});
const fetchEventsSuccess = events => ({
    type: FETCH_EVENTS_SUCCESS,
    payload: {events}
});
const fetchEventsFailure = error => ({
    type: FETCH_EVENTS_FAILURE,
    payload: {error}
});

export const FETCH_TOKEN_BEGIN = 'FETCH_TOKEN_BEGIN';
export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';
export const FETCH_TOKEN_FAILURE = 'FETCH_TOKEN_FAILURE';
const fetchTokenBegin = () => ({
    type: FETCH_TOKEN_BEGIN
});
const fetchTokenSuccess = token => ({
    type: FETCH_TOKEN_SUCCESS,
    payload: {token}
});
const fetchTokenFailure = error => ({
    type: FETCH_TOKEN_FAILURE,
    payload: {error}
});

export const FETCH_USER_BEGIN = 'FETCH_USER_BEGIN';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
const fetchUserBegin = () => ({
    type: FETCH_USER_BEGIN
});
const fetchUserSuccess = user => ({
    type: FETCH_USER_SUCCESS,
    payload: {user}
});
const fetchUserFailure = error => ({
    type: FETCH_USER_FAILURE,
    payload: {error}
});

export function getUserInfo() {
    return dispatch => {
        dispatch(fetchUserBegin());
        fetch(getGithubUserInfo, {
            method: 'GET',
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                handleDefault(json, (user) => {
                    sessionStorage.setItem("user", JSON.stringify(user));
                    console.log(`set user = ${JSON.stringify(user)}`);

                    dispatch(fetchUserSuccess(user));
                }, error => dispatch(fetchUserFailure(error)));
            })
            .catch(error => dispatch(fetchUserFailure(error)));
    }
}

export function getUserToken(code) {
    return dispatch => {
        dispatch(fetchTokenBegin());
        fetch(accessTokenUrl, {
            method: 'POST',
            body: JSON.stringify({code: code})
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                if (json.hasOwnProperty('access_token')) {
                    let token = json['access_token'];
                    localStorage.setItem("access_token", token);
                    dispatch(fetchTokenSuccess(token));
                } else {
                    dispatch(fetchTokenFailure(Error('系统异常')));
                }
            })
            .catch(error => dispatch(fetchTokenFailure(error)));
    }
}

export function getGithubEvents() {
    return dispatch => {
        dispatch(fetchEventsBegin());
        return fetch(eventsUrl, {
            method: 'GET',
            headers: {
                Authorization: 'token ' + githubToken,
            }
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchEventsSuccess(json));
            })
            .catch(error => dispatch(fetchEventsFailure(error)));
    }
}
