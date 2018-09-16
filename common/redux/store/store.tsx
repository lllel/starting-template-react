import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
// import {routerMiddleware} from 'react-router-redux';
// import history from '../history/history';
import combineReducer from '../reducers/_index';
import randomId from '../middlewares/randomId';

// const middlewares = applyMiddleware(thunk, randomId);

// const middlewares = applyMiddleware(thunk, routerMiddleware(history), randomId);
const middlewares = applyMiddleware(thunk, randomId);
const store = createStore(combineReducer, {}, middlewares);

// only dev
(window as any).store = store;

export default store;
