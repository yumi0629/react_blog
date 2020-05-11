import {combineReducers} from "redux";
import articleReducer from "./articleReducer";
import aboutReducer from "./aboutReducer";
import githubReducer from "./githubReducer";
import commentReducer from './commentReucer'

export default combineReducers({
    articleReducer,
    aboutReducer,
    githubReducer,
    commentReducer,
});
