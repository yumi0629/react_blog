import {
    FETCH_LIST_SUCCESS,
    READ_USER,
    SHOW_REPLY_HINT,
    ADD_COMMENT_BEGIN,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAIL,
    CONTENT_ON_CHANGE
} from '../action/commentAction';
import {message} from "antd";

const initialState = {
    user: null,
    comments: [],
    enable: false,
    reply: null,
    content: null,
    loading: false,
    error: null,
};

export default function commentReducer(state = initialState, action) {
    switch (action.type) {
        case READ_USER:
            return {
                ...state,
                user: action.payload.user,
                enable: action.payload.user != null,
            };
        case SHOW_REPLY_HINT:
            return {
                ...state,
                reply: action.payload.reply,
            };
        case CONTENT_ON_CHANGE:
            return {
                ...state,
                content: action.payload.content,
            };
        case FETCH_LIST_SUCCESS:
            return {
                ...state,
                comments: action.payload.comments,
            };
        case ADD_COMMENT_SUCCESS:
            message.success({content: '提交成功', key: 'addComment'}, 0);
            return {
                ...state,
                content: null,
                reply: null,
            };
        case ADD_COMMENT_BEGIN:
            message.loading({content: '评论提交中', key: 'addComment'});
            return state;
        case ADD_COMMENT_FAIL:
            message.error({content: action.payload.error.message, key: 'addComment'});
            return state;
        default:
            return state;
    }
}
