import {aboutMe} from '../network/Api';
import {handleErrors, handleDefault} from "./baseAction";

export const FETCH_ABOUT_BEGIN = 'FETCH_ABOUT_BEGIN';
export const FETCH_ABOUT_SUCCESS = 'FETCH_ABOUT_SUCCESS';
export const FETCH_ABOUT_FAILURE = 'FETCH_ABOUT_FAILURE';

const fetchAboutBegin = () => ({
    type: FETCH_ABOUT_BEGIN
});

const fetchAboutSuccess = abouts => ({
    type: FETCH_ABOUT_SUCCESS,
    payload: {abouts}
});

const fetchAboutFailure = error => ({
    type: FETCH_ABOUT_FAILURE,
    payload: {error}
});

export function getAbout() {
    return dispatch => {
        dispatch(fetchAboutBegin());
        return fetch(aboutMe + `?type=react`, {
            method: 'GET'
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                handleDefault(json, (data) => {
                    dispatch(fetchAboutSuccess(data));
                }, (error) => {
                    dispatch(fetchAboutFailure(error))
                })
            })
            .catch(error => dispatch(fetchAboutFailure(error)));
    }
}
