import React from 'react';
import './App.css';
import '../src/styles/ant-theme.less';
import Home from "./component/Home";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducer/rootReducer';
import thunk from "redux-thunk";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {initialRoute, githubLoginSuccess} from "./route/routeName";
import GithubLoginSuccess from "./component/GithubLoginSuccess";
import {message} from "antd";

const store = createStore(rootReducer, applyMiddleware(thunk));

message.config({
    top: "50%",
});

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path={githubLoginSuccess} component={GithubLoginSuccess}/>
                    <Route path={initialRoute} component={Home}/>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
