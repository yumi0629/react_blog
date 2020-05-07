import {aboutMe} from '../network/Api';

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

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export function getAbout() {
    return dispatch => {
        dispatch(fetchAboutBegin());
        return fetch(aboutMe+`?type=react`, {
            method: 'GET'
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchAboutSuccess(json['d']));
                return json['d'];
            })
            .catch(error => dispatch(fetchAboutFailure(error)));
    }
}
