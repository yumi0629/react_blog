import {
    FETCH_LIST_BEGIN,
    FETCH_LIST_SUCCESS,
    FETCH_LIST_FAILURE,
    FETCH_DETAIL_BEGIN,
    FETCH_DETAIL_SUCCESS,
    FETCH_DETAIL_FAILURE,
} from "../action/articleAction";

const initialState = {
    articles: [],
    loading: false,
    error: null,
    detail: {
        content: "",
    },
};

export default function articleReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_LIST_BEGIN:
            return {
                ...state,
                articles: [],
                loading: true,
                error: null,
            };
        case FETCH_LIST_SUCCESS:
            return {
                ...state,
                articles: action.payload.articles,
                loading: false,
                error: null,
            };
        case FETCH_LIST_FAILURE:
            return {
                ...state,
                articles: [],
                loading: false,
                error: action.payload.error,
            };
        case FETCH_DETAIL_BEGIN:
            return {
                ...state,
                detail: {
                    content: "",
                },
                loading: true,
                error: null,
            };
        case FETCH_DETAIL_SUCCESS:
            return {
                ...state,
                detail: action.payload.detail,
                loading: false,
                error: null,
            };
        case FETCH_DETAIL_FAILURE:
            return {
                ...state,
                detail: null,
                loading: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
}
