import {lifeList, lifeDetail} from '../network/Api';
import {handleErrors, handleDefault} from "./baseAction";

export const FETCH_LIFE_LIST_BEGIN = 'FETCH_LIFE_LIST_BEGIN';
export const FETCH_LIFE_LIST_SUCCESS = 'FETCH_LIFE_LIST_SUCCESS';
export const FETCH_LIFE_LIST_FAILURE = 'FETCH_LIFE_LIST_FAILURE';

export const FETCH_LIFE_DETAIL_BEGIN = 'FETCH_LIFE_DETAIL_BEGIN';
export const FETCH_LIFE_DETAIL_SUCCESS = 'FETCH_LIFE_DETAIL_SUCCESS';
export const FETCH_LIFE_DETAIL_FAILURE = 'FETCH_LIFE_DETAIL_FAILURE';

const fetchListBegin = () => ({
    type: FETCH_LIFE_LIST_BEGIN
});

const fetchListSuccess = lives => ({
    type: FETCH_LIFE_LIST_SUCCESS,
    payload: {lives}
});

const fetchListFailure = error => ({
    type: FETCH_LIFE_LIST_FAILURE,
    payload: {error}
});

const fetchDetailBegin = () => ({
    type: FETCH_LIFE_DETAIL_BEGIN
});

const fetchDetailSuccess = detail => ({
    type: FETCH_LIFE_DETAIL_SUCCESS,
    payload: {detail}
});

const fetchDetailFailure = error => ({
    type: FETCH_LIFE_DETAIL_FAILURE,
    payload: {error}
});


export function getLifeList() {
    return dispatch => {
        dispatch(fetchListBegin());
        return fetch(lifeList, {
            method: 'GET',
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                handleDefault(json, (data) => {
                    dispatch(fetchListSuccess(data));
                }, (error) => {
                    dispatch(fetchListFailure(error));
                });
            })
            .catch(error => dispatch(fetchListFailure(error)))
    };
}

export function getLifeDetail(postId) {
    return dispatch => {
        dispatch(fetchDetailBegin());
        return fetch(lifeDetail + postId, {
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
