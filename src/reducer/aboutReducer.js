import {FETCH_ABOUT_BEGIN, FETCH_ABOUT_SUCCESS, FETCH_ABOUT_FAILURE} from '../action/aboutAction';

const initialState = {
    abouts: [],
    loading: false,
    error: null
};

export default function aboutReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ABOUT_BEGIN:
            return {
                ...state,
                abouts: [],
                loading: true,
                error: null,
            };
        case FETCH_ABOUT_SUCCESS:
            return {
                ...state,
                abouts: action.payload.abouts,
                loading: false,
                error: null,
            };
        case FETCH_ABOUT_FAILURE:
            return {
                ...state,
                abouts: [],
                loading: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
}
