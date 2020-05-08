import {githubToken, getGithubEvents as eventsUrl} from "../network/Api";

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

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
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
                console.log(`json = `+json)
                return json;
            })
            .catch(error => dispatch(fetchEventsFailure(error)));
    }
}
