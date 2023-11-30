import { combineReducers, configureStore, createImmutableStateInvariantMiddleware } from '@reduxjs/toolkit';
import booksReducer from './booksReducer';
import thunkMiddleware  from 'redux-thunk';
let reducers = combineReducers({
    booksData: booksReducer,
});

const store =
    configureStore({
        reducer: reducers,
        middleware: [thunkMiddleware],
    });

export default store;
