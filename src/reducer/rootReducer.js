import {combineReducers} from "redux";
import articleListReducer from "./articleReducer";
import aboutReducer from "./aboutReducer";

export default combineReducers({
    articleListReducer,
    aboutReducer,
});
