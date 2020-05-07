import {articleList} from '../network/Api';

export const FETCH_LIST_BEGIN = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_LIST_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_LIST_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchProductsBegin = () => ({
    type: FETCH_LIST_BEGIN
});

export const fetchProductsSuccess = articles => ({
    type: FETCH_LIST_SUCCESS,
    payload: {articles}
});

export const fetchProductsFailure = error => ({
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
        dispatch(fetchProductsBegin());
        return fetch(articleList, {
            method: 'GET',
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                console.log(`json=` + json['d']['entrylist']);
                dispatch(fetchProductsSuccess(json['d']['entrylist']));
                return json['d']['entrylist'];
            })
            .catch(error => dispatch(fetchProductsFailure(error)))
    };
}
