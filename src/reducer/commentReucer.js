import {FETCH_LIST_SUCCESS, READ_USER, SHOW_REPLY_HINT} from '../action/commentAction';

const initialState = {
    user: null,
    comments: [],
    enable: false,
    reply: null,
    loading: false,
    error: null
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
        case FETCH_LIST_SUCCESS:
            return {
                ...state,
                comments: action.payload.comments,
            };
        default:
            return state;
    }
}
