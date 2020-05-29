import {
    FETCH_LIFE_LIST_BEGIN,
    FETCH_LIFE_LIST_SUCCESS,
    FETCH_LIFE_LIST_FAILURE,
    FETCH_LIFE_DETAIL_BEGIN,
    FETCH_LIFE_DETAIL_SUCCESS,
    FETCH_LIFE_DETAIL_FAILURE,
} from "../action/lifeAction";

const initialState = {
    lives: [],
    loading: false,
    error: null,
    detail: {
        content: "",
    },
};

export default function lifeReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_LIFE_LIST_BEGIN:
            return {
                ...state,
                lives: [],
                loading: true,
                error: null,
            };
        case FETCH_LIFE_LIST_SUCCESS:
            return {
                ...state,
                lives: action.payload.lives,
                loading: false,
                error: null,
            };
        case FETCH_LIFE_LIST_FAILURE:
            return {
                ...state,
                lives: [],
                loading: false,
                error: action.payload.error,
            };
        case FETCH_LIFE_DETAIL_BEGIN:
            return {
                ...state,
                detail: {
                    content: "",
                },
                loading: true,
                error: null,
            };
        case FETCH_LIFE_DETAIL_SUCCESS:
            return {
                ...state,
                detail: action.payload.detail,
                loading: false,
                error: null,
            };
        case FETCH_LIFE_DETAIL_FAILURE:
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
