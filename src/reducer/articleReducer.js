import {FETCH_LIST_BEGIN, FETCH_LIST_SUCCESS, FETCH_LIST_FAILURE} from "../action/articleAction";

const initialState = {
    articles: [],
    loading: false,
    error: null
};

export default function articleListReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_LIST_BEGIN:
            return {
                ...state,
                articles: [],
                loading: true,
                error: null,
            };
        case FETCH_LIST_SUCCESS:
            console.log(`action.payload.articles=` + action.payload.articles);
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
        default:
            return state;
    }
}
