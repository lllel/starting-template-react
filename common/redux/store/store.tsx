import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import combineReducer from '../reducers/_index';
import randomId from '../middlewares/randomId';

// const middlewares = applyMiddleware(thunk, randomId);

const middlewares = applyMiddleware(thunk, randomId);
const store = createStore(combineReducer, {}, middlewares);

// only dev
(window as any).store = store;

export default store;
