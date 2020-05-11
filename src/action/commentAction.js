import {commentList} from '../network/Api';

export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';
const fetchListSuccess = comments => ({
    type: FETCH_LIST_SUCCESS,
    payload: {comments}
});

export const READ_USER = 'READ_USER';
const readUserComplete = user => ({
    type: READ_USER,
    payload: {user}
});

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export function readUser() {
    return dispatch => {
        let user = sessionStorage.getItem("user");
        if (user == null) {
            dispatch(readUserComplete(user));
        } else {
            dispatch(readUserComplete(JSON.parse(user)));
        }
    }
}

export const SHOW_REPLY_HINT = 'SHOW_REPLY_HINT';
export const showReplyHint = reply => ({
    type: SHOW_REPLY_HINT,
    payload: {reply}
});

export const hideReplyHint = () => ({
    type: SHOW_REPLY_HINT,
    payload: {reply: null}
});

export function list(type, postId) {
    return dispatch => {
        return fetch(`${commentList}?type=${type}&id=${postId}`, {
            method: 'GET',
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchListSuccess(json['d'] == null ? [] : json['d']));
                return json['d'];
            })
            .catch()
            .then(dispatch(readUser()));
    };
}
