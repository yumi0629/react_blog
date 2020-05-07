import {articleList} from '../network/Api';

export const FETCH_LIST_BEGIN = 'FETCH_LIST_BEGIN';
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';
export const FETCH_LIST_FAILURE = 'FETCH_LIST_FAILURE';

 const fetchListBegin = () => ({
    type: FETCH_LIST_BEGIN
});

 const fetchListSuccess = articles => ({
    type: FETCH_LIST_SUCCESS,
    payload: {articles}
});

 const fetchListFailure = error => ({
    type: FETCH_LIST_FAILURE,
    payload: {error}
});

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export function list() {
    return dispatch => {
        dispatch(fetchListBegin());
        return fetch(articleList, {
            method: 'GET',
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchListSuccess(json['d']['entrylist']));
                return json['d']['entrylist'];
            })
            .catch(error => dispatch(fetchListFailure(error)))
    };
}
