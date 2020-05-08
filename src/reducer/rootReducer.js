import {combineReducers} from "redux";
import articleListReducer from "./articleReducer";
import aboutReducer from "./aboutReducer";
import githubReducer from "./githubReducer";


export default combineReducers({
    articleListReducer,
    aboutReducer,
    githubReducer,
});
