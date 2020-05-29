import {combineReducers} from "redux";
import articleReducer from "./articleReducer";
import aboutReducer from "./aboutReducer";
import githubReducer from "./githubReducer";
import commentReducer from './commentReucer';
import lifeReducer from "./lifeReducer";

export default combineReducers({
    articleReducer,
    aboutReducer,
    githubReducer,
    commentReducer,
    lifeReducer,
});
