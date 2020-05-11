import {
    FETCH_EVENTS_BEGIN,
    FETCH_EVENTS_SUCCESS,
    FETCH_EVENTS_FAILURE,
    FETCH_TOKEN_BEGIN,
    FETCH_TOKEN_SUCCESS,
    FETCH_TOKEN_FAILURE,
    FETCH_USER_BEGIN,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
} from '../action/githubAction';

const initialState = {
    events: [],
    user: null,
    loading: false,
    error: null
};

export default function githubReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_EVENTS_BEGIN:
            return {
                ...state,
                events: [],
                loading: true,
                error: null,
            };
        case FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                events: action.payload.events,
                loading: false,
                error: null,
            };
        case FETCH_EVENTS_FAILURE:
            return {
                ...state,
                events: [],
                loading: false,
                error: action.payload.error,
            };
        case FETCH_TOKEN_BEGIN:
            return {
                ...state,
                token: null,
                loading: true,
                error: null,
            };
        case FETCH_TOKEN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                loading: false,
                error: null,
            };
        case FETCH_TOKEN_FAILURE:
            return {
                ...state,
                token: null,
                loading: false,
                error: action.payload.error,
            };
        case FETCH_USER_BEGIN:
            return {
                ...state,
                user: null,
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
            };
        case FETCH_USER_FAILURE:
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
}
