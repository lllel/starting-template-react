import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import store from '../common/redux/store/store';
import history from '../common/redux/history/history';
import App from "./app/pages/App/App";

ReactDom.render(
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>, document.querySelector('#application'));
