import {FETCH_EVENTS_BEGIN, FETCH_EVENTS_SUCCESS, FETCH_EVENTS_FAILURE} from '../action/githubAction';

const initialState = {
    events: [],
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
        default:
            return state;
    }
}
