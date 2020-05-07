import React from 'react';
import './App.css';
import '../src/styles/ant-theme.less';
import Home from "./component/Home";
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducer/rootReducer';
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
    return (
        <Provider store={store}>
            {/*<BrowserRouter>*/}
            {/*    <App path="/App" component={App}>*/}
            {/*        <Route path="/App/home" component={Home}/>/>*/}
            {/*    </App>*/}
            {/*</BrowserRouter>*/}
            <Home/>
        </Provider>
    );
}

export default App;
