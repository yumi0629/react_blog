import {commentList, commentAdd} from '../network/Api';
import {handleErrors, handleDefault} from "./baseAction";

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

export const ADD_COMMENT_BEGIN = 'ADD_COMMENT_BEGIN';
export const ADD_COMMENT_FAIL = 'ADD_COMMENT_FAIL';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
const addCommentBegin = () => ({
    type: ADD_COMMENT_BEGIN
});
const addCommentSuccess = () => ({
    type: ADD_COMMENT_SUCCESS,
});
const addCommentFailure = error => ({
    type: ADD_COMMENT_FAIL,
    payload: {error}
});

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

export const CONTENT_ON_CHANGE = 'CONTENT_ON_CHANGE';
export const contentOnChange = (content) => ({
    type: CONTENT_ON_CHANGE,
    payload: {content: content}
});

export function list(type, postId) {
    return dispatch => {
        return fetch(`${commentList}?type=${type}&id=${postId}`, {
            method: 'GET',
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                handleDefault(json, (data) => {
                    dispatch(fetchListSuccess(data == null ? [] : data));
                });
            })
            .catch()
            .then(dispatch(readUser()));
    };
}

export function addComment(type, comment) {
    console.log(`comment =
     ${comment.comment} 
    , ${comment.article_id}
    , ${comment.user_id}
    , ${comment.user_name}
    , ${comment.user_avatar}
    , ${comment.reply_id}
    , ${comment.reply_user_id}
    , ${comment.reply_user_name}`);
    return dispatch => {
        dispatch(addCommentBegin());
        let formData = new FormData();
        formData.append("type", type);
        formData.append("comment", JSON.stringify(comment));
        fetch(
            commentAdd, {
                method: 'POST',
                body: formData,
            }
        )
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                handleDefault(json, () => {
                    dispatch(addCommentSuccess());
                    dispatch(list(type, type === 0 ? comment.article_id : comment.post_id))
                }, (error) => {
                    addCommentFailure(error);
                });
            })
            .catch((error) => dispatch(addCommentFailure(error)));
    }
}
