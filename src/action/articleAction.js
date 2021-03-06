import {articleList, articleDetail} from '../network/Api';
import {handleErrors, handleDefault} from "./baseAction";

export const FETCH_LIST_BEGIN = 'FETCH_LIST_BEGIN';
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';
export const FETCH_LIST_FAILURE = 'FETCH_LIST_FAILURE';

export const FETCH_DETAIL_BEGIN = 'FETCH_DETAIL_BEGIN';
export const FETCH_DETAIL_SUCCESS = 'FETCH_DETAIL_SUCCESS';
export const FETCH_DETAIL_FAILURE = 'FETCH_DETAIL_FAILURE';

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

const fetchDetailBegin = () => ({
    type: FETCH_DETAIL_BEGIN
});

const fetchDetailSuccess = detail => ({
    type: FETCH_DETAIL_SUCCESS,
    payload: {detail}
});

const fetchDetailFailure = error => ({
    type: FETCH_DETAIL_FAILURE,
    payload: {error}
});

export function list() {
    return dispatch => {
        dispatch(fetchListBegin());
        return fetch(articleList, {
            method: 'GET',
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                handleDefault(json, (data) => {
                    dispatch(fetchListSuccess(data['entrylist']));
                }, (error) => {
                    dispatch(fetchListFailure(error));
                });
            })
            .catch(error => dispatch(fetchListFailure(error)))
    };
}

export function detail(postId) {
    return dispatch => {
        dispatch(fetchDetailBegin());
        return fetch(articleDetail + postId, {
            method: 'GET',
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                handleDefault(json, (data) => {
                    dispatch(fetchDetailSuccess(data));
                }, (error) => {
                    dispatch(fetchDetailFailure(error));
                });
            })
            .catch(error => dispatch(fetchDetailFailure(error)))
    };
}
